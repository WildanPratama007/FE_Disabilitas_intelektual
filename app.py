import os
import requests
from flask import Flask, request, render_template, jsonify, session, redirect, url_for, flash
from werkzeug.utils import secure_filename

# Inisialisasi aplikasi Flask
app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

# API Configuration
API_BASE_URL = 'http://localhost:8000/api/v1'

# --- Konfigurasi ---
STATIC_FOLDER = 'static'
UPLOAD_FOLDER = os.path.join(STATIC_FOLDER, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Hanya izinkan BED
ALLOWED_EXTENSIONS = {'bed'}

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
    if 'access_token' not in session:
        return jsonify({'success': False, 'message': 'Please login first'})
    
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'No file selected'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'success': False, 'message': 'No file selected'})
    
    if file and allowed_file(file.filename):
        try:
            files = {'file': (file.filename, file.stream, file.content_type)}
            headers = {'Authorization': f'Bearer {session["access_token"]}'}
            
            print(f"Uploading file: {file.filename}")
            print(f"Headers: {headers}")
            
            response = requests.post(f'{API_BASE_URL}/files/', files=files, headers=headers)
            
            print(f"Upload response: {response.status_code}, {response.text}")
            
            if response.status_code in [200, 201]:
                data = response.json()
                if data.get('status') == 'success':
                    return jsonify({
                        'success': True,
                        'message': data.get('message', 'Upload successful'),
                        'data': data.get('data')
                    })
                else:
                    return jsonify({'success': False, 'message': data.get('message', 'Upload failed')})
            else:
                return jsonify({'success': False, 'message': f'Upload failed: {response.text}'})
        except requests.exceptions.RequestException as e:
            print(f"Upload error: {e}")
            return jsonify({'success': False, 'message': f'Cannot connect to server: {e}'})
    
    return jsonify({'success': False, 'message': 'Invalid file type, only BED allowed'})

@app.route('/upload/predict')
def predict_proxy():
    if 'access_token' not in session:
        return jsonify({'success': False, 'message': 'Please login first'})
    
    filename = request.args.get('file_name')
    if not filename:
        return jsonify({'success': False, 'message': 'No filename provided'})
    
    try:
        headers = {'Authorization': f'Bearer {session["access_token"]}'}
        response = requests.get(f'{API_BASE_URL}/files/predict?file_name={filename}', headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            # Format response untuk frontend
            if data.get('status') == 'success':
                result_data = data.get('data', {})
                prediction_text = f"Risk Score: {result_data.get('risk_score', 'N/A')}<br>Confidence: {result_data.get('confidence', 'N/A'):.1f}%<br>Condition: {result_data.get('predicted_condition', 'N/A')}"
                return jsonify({
                    'success': True,
                    'prediction': prediction_text
                })
            else:
                return jsonify({'success': False, 'message': data.get('message', 'Prediction failed')})
        else:
            return jsonify({'success': False, 'message': 'Prediction failed'})
    except requests.exceptions.RequestException:
        return jsonify({'success': False, 'message': 'Cannot connect to server'})

@app.route('/history')
def history():
    if 'access_token' not in session:
        return redirect(url_for('login'))
    return render_template('history.html')

@app.route('/api/history')
def get_history():
    if 'access_token' not in session:
        return jsonify({'success': False, 'message': 'Please login first'})
    
    try:
        headers = {'Authorization': f'Bearer {session["access_token"]}'}
        response = requests.get(f'{API_BASE_URL}/files/predictions/history', headers=headers)
        
        print(f"History response: {response.status_code}, {response.text}")
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'success': False, 'message': 'Failed to load history'})
    except requests.exceptions.RequestException:
        return jsonify({'success': False, 'message': 'Cannot connect to server'})

@app.route('/api/history/<int:history_id>')
def get_history_detail(history_id):
    if 'access_token' not in session:
        return jsonify({'success': False, 'message': 'Please login first'})
    
    try:
        headers = {'Authorization': f'Bearer {session["access_token"]}'}
        response = requests.get(f'{API_BASE_URL}/predictions/{history_id}', headers=headers)
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'success': False, 'message': 'Failed to load history detail'})
    except requests.exceptions.RequestException:
        return jsonify({'success': False, 'message': 'Cannot connect to server'})

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

if __name__ == '__main__':
    if not os.path.exists(STATIC_FOLDER):
        os.makedirs(STATIC_FOLDER)
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
        
    app.run(debug=True, port=8001)

