# import os
# import requests
# from flask import Flask, request, render_template, jsonify, session, redirect, url_for, flash
# from werkzeug.utils import secure_filename

# # Inisialisasi aplikasi Flask
# app = Flask(__name__)
# app.secret_key = 'your-secret-key-here'

# # API Configuration
# API_BASE_URL = 'http://localhost:8000'

# # --- Konfigurasi ---
# STATIC_FOLDER = 'static'
# UPLOAD_FOLDER = os.path.join(STATIC_FOLDER, 'uploads')
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# # Hanya izinkan BED
# ALLOWED_EXTENSIONS = {'bed'}

# def allowed_file(filename):
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# # --- Rute Aplikasi Web ---
# @app.route('/')
# def index():
#     return render_template('landing.html')

# @app.route('/dashboard')
# def dashboard():
#     if 'access_token' not in session:
#         return redirect(url_for('login'))
#     return render_template('index.html')



# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
        
#         try:
#             login_data = {
#                 'email': username,
#                 'password': password
#             }
#             print(f"Sending login data: {login_data}")
#             response = requests.post(f'{API_BASE_URL}/auth/login', json=login_data)
            
#             if response.status_code == 200:
#                 data = response.json()
#                 print(f"Login response: {data}")
#                 # Handle different response structures
#                 if 'access_token' in data:
#                     session['access_token'] = data['access_token']
#                 elif 'data' in data and 'access_token' in data['data']:
#                     session['access_token'] = data['data']['access_token']
#                 else:
#                     print(f"No access_token found in response: {data}")
#                     flash('Login response tidak valid!', 'error')
#                     return render_template('login.html')
                
#                 # Handle user ID
#                 if 'user' in data:
#                     session['user_id'] = data['user']['id']
#                 elif 'data' in data and 'user' in data['data']:
#                     session['user_id'] = data['data']['user']['id']
                
#                 flash('Login berhasil!', 'success')
#                 return redirect(url_for('dashboard'))
#             else:
#                 print(f"Login failed: {response.status_code}, {response.text}")
#                 flash('Username atau password salah!', 'error')
#         except requests.exceptions.RequestException:
#             flash('Tidak dapat terhubung ke server!', 'error')
    
#     return render_template('login.html')

# @app.route('/register', methods=['GET', 'POST'])
# def register():
#     if request.method == 'POST':
#         fullname = request.form['fullname']
#         email = request.form['email']
#         password = request.form['password']
#         confirm_password = request.form['confirm_password']
        
#         if password != confirm_password:
#             flash('Password tidak cocok!', 'error')
#             return render_template('register.html')
        
#         try:
#             response = requests.post(f'{API_BASE_URL}/auth/register', json={
#                 'username': fullname,
#                 'email': email,
#                 'password': password
#             })
            
#             if response.status_code == 201:
#                 flash('Registrasi berhasil! Silakan login.', 'success')
#                 return redirect(url_for('login'))
#             else:
#                 data = response.json()
#                 error_message = data.get('message', data.get('detail', 'Registrasi gagal!'))
#                 flash(error_message, 'error')
#         except requests.exceptions.RequestException:
#             flash('Tidak dapat terhubung ke server!', 'error')
    
#     return render_template('register.html')

# @app.route('/logout')
# def logout():
#     session.clear()
#     flash('Logout berhasil!', 'success')
#     return redirect(url_for('login'))


# @app.route('/upload', methods=['POST'])
# def upload_file():
#     if 'access_token' not in session:
#         return jsonify({'success': False, 'message': 'Please login first'})
    
#     if 'file' not in request.files:
#         return jsonify({'success': False, 'message': 'No file selected'})
    
#     file = request.files['file']
    
#     if file.filename == '':
#         return jsonify({'success': False, 'message': 'No file selected'})
    
#     if file and allowed_file(file.filename):
#         try:
#             files = {'file': (file.filename, file.stream, file.content_type)}
#             headers = {'Authorization': f'Bearer {session["access_token"]}'}
            
#             print(f"Uploading file: {file.filename}")
#             print(f"Headers: {headers}")
            
#             response = requests.post(f'{API_BASE_URL}/upload/', files=files, headers=headers)
            
#             print(f"Upload response: {response.status_code}, {response.text}")
            
#             if response.status_code in [200, 201]:
#                 return jsonify(response.json())
#             else:
#                 return jsonify({'success': False, 'message': f'Upload failed: {response.text}'})
#         except requests.exceptions.RequestException as e:
#             print(f"Upload error: {e}")
#             return jsonify({'success': False, 'message': f'Cannot connect to server: {e}'})
    
#     return jsonify({'success': False, 'message': 'Invalid file type, only BED allowed'})

# @app.route('/upload/predict')
# def predict_proxy():
#     if 'access_token' not in session:
#         return jsonify({'success': False, 'message': 'Please login first'})
    
#     filename = request.args.get('file_name')
#     if not filename:
#         return jsonify({'success': False, 'message': 'No filename provided'})
    
#     try:
#         headers = {'Authorization': f'Bearer {session["access_token"]}'}
#         response = requests.get(f'{API_BASE_URL}/upload/predict?file_name={filename}', headers=headers)
        
#         if response.status_code == 200:
#             data = response.json()
#             # Format response untuk frontend
#             if data.get('status') == 'success':
#                 result_data = data.get('data', {})
#                 prediction_text = f"Risk Score: {result_data.get('risk_score', 'N/A')}<br>Confidence: {result_data.get('confidence', 'N/A'):.1f}%<br>Condition: {result_data.get('predicted_condition', 'N/A')}"
#                 return jsonify({
#                     'success': True,
#                     'prediction': prediction_text
#                 })
#             else:
#                 return jsonify({'success': False, 'message': data.get('message', 'Prediction failed')})
#         else:
#             return jsonify({'success': False, 'message': 'Prediction failed'})
#     except requests.exceptions.RequestException:
#         return jsonify({'success': False, 'message': 'Cannot connect to server'})

# @app.route('/history')
# def history():
#     if 'access_token' not in session:
#         return redirect(url_for('login'))
#     return render_template('history.html')

# @app.route('/api/history')
# def get_history():
#     if 'access_token' not in session:
#         return jsonify({'success': False, 'message': 'Please login first'})
    
#     try:
#         headers = {'Authorization': f'Bearer {session["access_token"]}'}
#         response = requests.get(f'{API_BASE_URL}/predictions/history', headers=headers)
        
#         print(f"History response: {response.status_code}, {response.text}")
        
#         if response.status_code == 200:
#             return jsonify(response.json())
#         else:
#             return jsonify({'success': False, 'message': 'Failed to load history'})
#     except requests.exceptions.RequestException:
#         return jsonify({'success': False, 'message': 'Cannot connect to server'})

# @app.route('/api/history/<int:history_id>')
# def get_history_detail(history_id):
#     if 'access_token' not in session:
#         return jsonify({'success': False, 'message': 'Please login first'})
    
#     try:
#         headers = {'Authorization': f'Bearer {session["access_token"]}'}
#         response = requests.get(f'{API_BASE_URL}/predictions/{history_id}', headers=headers)
        
#         if response.status_code == 200:
#             return jsonify(response.json())
#         else:
#             return jsonify({'success': False, 'message': 'Failed to load history detail'})
#     except requests.exceptions.RequestException:
#         return jsonify({'success': False, 'message': 'Cannot connect to server'})




# @app.route('/architecture')
# def architecture():
#     if 'access_token' not in session:
#         return redirect(url_for('login'))
#     return render_template('architecture.html')

# @app.route('/about')
# def about():
#     return render_template('about.html')

# if __name__ == '__main__':
#     if not os.path.exists(STATIC_FOLDER):
#         os.makedirs(STATIC_FOLDER)
#     if not os.path.exists(UPLOAD_FOLDER):
#         os.makedirs(UPLOAD_FOLDER)
        
#     app.run(debug=True, port=8004)


import os
import sys
import json
import requests
from datetime import datetime
from flask import Flask, request, render_template, jsonify, session, redirect, url_for, flash, send_file
from werkzeug.utils import secure_filename

# Add model deployment path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'model'))
from inference import ModelPredictor

# Inisialisasi aplikasi Flask
app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

# API Configuration
API_BASE_URL = 'http://localhost:8000/api/v1'

# Initialize local model predictor
try:
    model_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'deployment_artifacts')
    model_predictor = ModelPredictor(model_path)
    print("✅ Local model loaded successfully")
except Exception as e:
    print(f"❌ Failed to load local model: {e}")
    model_predictor = None

# --- Konfigurasi ---
STATIC_FOLDER = 'static'
UPLOAD_FOLDER = os.path.join(STATIC_FOLDER, 'uploads')
HISTORY_FILE = os.path.join(STATIC_FOLDER, 'history.json')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Hanya izinkan CSV
ALLOWED_EXTENSIONS = {'csv'}

# History functions
def load_history():
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'r') as f:
            return json.load(f)
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
                        'sample_id': result.get('sample_id')
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
    try:
        history = load_history()
        return jsonify({
            'status': 'success',
            'data': history
        })
    except Exception as e:
        return jsonify({'success': False, 'message': f'Failed to load history: {str(e)}'})

@app.route('/api/history/<int:history_id>')
def get_history_detail(history_id):
    try:
        history = load_history()
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
    sample_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'kumpulan_test_data_csv.zip')
    if os.path.exists(sample_path):
        return send_file(sample_path, as_attachment=True, download_name='kumpulan_test_data_csv.zip')
    else:
        flash('Sample file not found!', 'error')
        return redirect(url_for('dashboard'))

if __name__ == '__main__':
    if not os.path.exists(STATIC_FOLDER):
        os.makedirs(STATIC_FOLDER)
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    
    print(f"Model predictor status: {'✅ Ready' if model_predictor else '❌ Not available'}")
    app.run(debug=True, port=8004)

