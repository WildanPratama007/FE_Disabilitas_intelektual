"""
DI Frontend Application - Deploy Ready Version
==============================================
Flask web application untuk klasifikasi Disabilitas Intelektual.

Struktur Deploy:
- DI-Deploy-Ready/
  - backend/      (API FastAPI)
  - frontend/     (Flask Web App) <- YOU ARE HERE
  - model/        (KNN Model V2)
"""

import os
import sys
import json
import requests
from datetime import datetime
from flask import Flask, request, render_template, jsonify, session, redirect, url_for, flash, send_file
from werkzeug.utils import secure_filename

# Get base directory (parent of frontend folder)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, 'model')

# Add model path to sys.path
sys.path.append(MODEL_DIR)
from inference import ModelPredictor

# Inisialisasi aplikasi Flask
app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'change-this-in-production')

# API Configuration - can be overridden by environment variable
API_BASE_URL = os.environ.get('API_BASE_URL', 'http://localhost:8000/api/v1')

# Initialize local model predictor - V2
ARTIFACTS_DIR = os.path.join(MODEL_DIR, 'deployment_artifacts')
try:
    model_predictor = ModelPredictor(ARTIFACTS_DIR)
    print("✅ Local model V2 (KNN) loaded successfully")
except Exception as e:
    print(f"❌ Failed to load local model: {e}")
    model_predictor = None

# --- Konfigurasi ---
STATIC_FOLDER = 'static'
UPLOAD_FOLDER = os.path.join(STATIC_FOLDER, 'uploads')
HISTORY_FILE = os.path.join(STATIC_FOLDER, 'history.json')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 2 * 1024 * 1024 * 1024  # 2GB max upload

# Hanya izinkan CSV
ALLOWED_EXTENSIONS = {'csv'}

# History functions
def load_history(user_email=None):
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'r') as f:
            all_history = json.load(f)
        if user_email:
            return [entry for entry in all_history if entry.get('user_email') == user_email]
        return all_history
    return []

def save_history(history_data):
    history = load_history()
    history.append(history_data)
    with open(HISTORY_FILE, 'w') as f:
        json.dump(history, f, indent=2)
    return len(history)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- Rute Aplikasi Web ---
@app.route('/')
def index():
    return render_template('landing.html')

@app.route('/dashboard')
def dashboard():
    if 'access_token' not in session:
        return redirect(url_for('login'))
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        try:
            login_data = {
                'email': username,
                'password': password
            }
            print(f"Sending login data: {login_data}")
            response = requests.post(f'{API_BASE_URL}/auth/login', json=login_data)
            
            if response.status_code == 200:
                data = response.json()
                print(f"Login response: {data}")
                # Handle API response structure: {"status": "success", "data": {"access_token": "..."}}
                if data.get('status') == 'success' and 'data' in data:
                    token_data = data['data']
                    session['access_token'] = token_data['access_token']
                    session['refresh_token'] = token_data.get('refresh_token')
                    session['user_email'] = username  # Store user email for history filtering
                else:
                    print(f"No access_token found in response: {data}")
                    flash('Login response tidak valid!', 'error')
                    return render_template('login.html')
                
                flash('Login berhasil!', 'success')
                return redirect(url_for('dashboard'))
            else:
                print(f"Login failed: {response.status_code}, {response.text}")
                flash('Username atau password salah!', 'error')
        except requests.exceptions.RequestException:
            flash('Tidak dapat terhubung ke server!', 'error')
    
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        fullname = request.form['fullname']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        
        if password != confirm_password:
            flash('Password tidak cocok!', 'error')
            return render_template('register.html')
        
        try:
            response = requests.post(f'{API_BASE_URL}/auth/register', json={
                'username': fullname,
                'email': email,
                'password': password
            })
            
            if response.status_code == 201:
                flash('Registrasi berhasil! Silakan login.', 'success')
                return redirect(url_for('login'))
            else:
                data = response.json()
                error_message = data.get('message', 'Registrasi gagal!')
                flash(error_message, 'error')
        except requests.exceptions.RequestException:
            flash('Tidak dapat terhubung ke server!', 'error')
    
    return render_template('register.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('Logout berhasil!', 'success')
    return redirect(url_for('login'))


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'No file selected'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'success': False, 'message': 'No file selected'})
    
    if file and allowed_file(file.filename):
        try:
            # Save file locally for model prediction
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            
            print(f"File saved locally: {file_path}")
            
            return jsonify({
                'success': True,
                'status': 'success',
                'message': 'File uploaded successfully',
                'data': {
                    'filename': filename,
                    'original_name': file.filename
                }
            })
        except Exception as e:
            print(f"Upload error: {e}")
            return jsonify({'success': False, 'message': f'Upload failed: {str(e)}'})
    
    return jsonify({'success': False, 'message': 'Invalid file type, only CSV allowed'})

@app.route('/upload/predict')
def predict_proxy():
    filename = request.args.get('file_name')
    if not filename:
        return jsonify({'success': False, 'message': 'No filename provided'})
    
    # Use local model
    if model_predictor:
        try:
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            if os.path.exists(file_path):
                result = model_predictor.predict_from_csv(file_path)
                if result.get('status') == 'success':
                    # Save to history
                    history_entry = {
                        'id': len(load_history()) + 1,
                        'filename': filename,
                        'prediction': result.get('prediction'),
                        'confidence': result.get('confidence'),
                        'timestamp': datetime.now().isoformat(),
                        'sample_id': result.get('sample_id'),
                        'user_email': session.get('user_email', 'unknown')
                    }
                    save_history(history_entry)
                    
                    prediction_text = f"Prediction: {result.get('prediction', 'N/A')}<br>Confidence: {result.get('confidence', 'N/A')}%<br>Sample: {result.get('sample_id', 'N/A')}"
                    return jsonify({
                        'success': True,
                        'prediction': prediction_text
                    })
                else:
                    return jsonify({'success': False, 'message': result.get('message', 'Local prediction failed')})
            else:
                return jsonify({'success': False, 'message': f'File not found: {filename}'})
        except Exception as e:
            print(f"Local prediction error: {e}")
            return jsonify({'success': False, 'message': f'Prediction error: {str(e)}'})
    else:
        return jsonify({'success': False, 'message': 'Model not available'})

@app.route('/history')
def history():
    return render_template('history.html')

@app.route('/api/history')
def get_history():
    if 'user_email' not in session:
        return jsonify({'success': False, 'message': 'Please login first'})
    
    try:
        user_email = session['user_email']
        history = load_history(user_email)
        return jsonify({
            'status': 'success',
            'data': history
        })
    except Exception as e:
        return jsonify({'success': False, 'message': f'Failed to load history: {str(e)}'})

@app.route('/api/history/<int:history_id>')
def get_history_detail(history_id):
    if 'user_email' not in session:
        return jsonify({'success': False, 'message': 'Please login first'})
    
    try:
        user_email = session['user_email']
        history = load_history(user_email)
        for entry in history:
            if entry['id'] == history_id:
                return jsonify({
                    'status': 'success',
                    'data': entry
                })
        return jsonify({'success': False, 'message': 'History not found'})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Failed to load history detail: {str(e)}'})

@app.route('/api/check-token')
def check_token():
    if 'access_token' not in session:
        return jsonify({'valid': False}), 401
    
    try:
        headers = {'Authorization': f'Bearer {session["access_token"]}'}
        response = requests.get(f'{API_BASE_URL}/auth/me', headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'success':
                return jsonify({'valid': True})
            else:
                return jsonify({'valid': False}), 401
        else:
            return jsonify({'valid': False}), 401
    except requests.exceptions.RequestException:
        return jsonify({'valid': False}), 401


@app.route('/architecture')
def architecture():
    if 'access_token' not in session:
        return redirect(url_for('login'))
    return render_template('architecture.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/download/sample')
def download_sample():
    # Use relative path to model test data
    sample_dir = os.path.join(MODEL_DIR, 'test_data_csv')
    
    if os.path.exists(sample_dir):
        # Create zip file if not exists
        import shutil
        zip_path = os.path.join(STATIC_FOLDER, 'test_data_csv_v2.zip')
        if not os.path.exists(zip_path):
            shutil.make_archive(zip_path.replace('.zip', ''), 'zip', sample_dir)
        return send_file(zip_path, as_attachment=True, download_name='test_data_csv_v2.zip')
    else:
        flash('Sample file not found!', 'error')
        return redirect(url_for('dashboard'))

if __name__ == '__main__':
    if not os.path.exists(STATIC_FOLDER):
        os.makedirs(STATIC_FOLDER)
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    
    print(f"="*50)
    print(f"DI Frontend - Deploy Ready")
    print(f"="*50)
    print(f"Base Directory: {BASE_DIR}")
    print(f"Model Directory: {MODEL_DIR}")
    print(f"API URL: {API_BASE_URL}")
    print(f"Model Status: {'✅ Ready' if model_predictor else '❌ Not available'}")
    print(f"="*50)
    
    app.run(debug=True, port=8004)
