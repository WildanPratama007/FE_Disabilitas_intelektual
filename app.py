# import os
# import cv2
# import numpy as np
# from flask import Flask, request, render_template, redirect, url_for, jsonify
# from werkzeug.utils import secure_filename
# from tensorflow.keras.models import load_model

# # Inisialisasi aplikasi Flask
# app = Flask(__name__)

# # Load the trained model
# MODEL_PATH = 'model/DenseNet121_SisiBawah.h5'  # Path ke model klasifikasi Normal vs Abnormal
# try:
#     if os.path.exists(MODEL_PATH):
#         model = load_model(MODEL_PATH, compile=False)
#         print(f"Model berhasil dimuat dari: {MODEL_PATH}")
#     else:
#         model = None
#         print(f"File model tidak ditemukan di: {MODEL_PATH}")
# except Exception as e:
#     model = None
#     print(f"Error loading model: {str(e)}")

# # --- Konfigurasi ---
# # Tentukan path untuk folder upload.
# # Sangat disarankan untuk meletakkan folder uploads di dalam folder 'static'
# # agar file dapat diakses oleh browser dengan mudah.
# STATIC_FOLDER = 'static'
# UPLOAD_FOLDER = os.path.join(STATIC_FOLDER, 'uploads')
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# # Ekstensi file yang diizinkan
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# # Fungsi untuk memeriksa ekstensi file
# def allowed_file(filename):
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# def predict_image(image_path, filename):
#     """Fungsi untuk melakukan prediksi klasifikasi Normal vs Abnormal"""
#     try:
#         if model is None:
#             return f"Model tidak tersedia. Gambar '{filename}' berhasil diunggah."
        
#         # Load and preprocess the image for prediction
#         image = cv2.imread(image_path)
#         image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB
#         image = cv2.resize(image, (224, 224))  # Resize to 224x224
#         image = image / 255.0  # Normalize pixel values to [0,1]
        
#         # Expand dimensions to match model input shape (batch_size, height, width, channels)
#         input_image = np.expand_dims(image, axis=0)
        
#         # Make prediction - output is probability
#         prediction = model.predict(input_image, verbose=0)
#         probability = float(prediction[0][0])  # Get probability score
        
#         # Binary classification: 0 = Normal, 1 = Abnormal
#         if probability > 0.5:
#             result = "Abnormal (Terdeteksi Disabilitas Intelektual)"
#             confidence = probability * 100
#         else:
#             result = "Normal"
#             confidence = (1 - probability) * 100
            
#         return f"Hasil Prediksi: {result}<br>Confidence: {confidence:.1f}%<br>Probability Score: {probability:.3f}"
        
#     except Exception as e:
#         return f"Error dalam prediksi: {str(e)}"

# # --- Rute Aplikasi Web ---
# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     from flask import jsonify
    
#     if 'file' not in request.files:
#         return jsonify({'success': False, 'message': 'No file selected'})
    
#     file = request.files['file']
    
#     if file.filename == '':
#         return jsonify({'success': False, 'message': 'No file selected'})
    
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         file.save(file_path)
        
#         return jsonify({'success': True, 'filename': filename, 'message': 'File uploaded successfully'})
    
#     return jsonify({'success': False, 'message': 'Invalid file type'})

# @app.route('/predict', methods=['POST'])
# def predict():
#     from flask import jsonify
    
#     data = request.get_json()
#     filename = data.get('filename')
    
#     if not filename:
#         return jsonify({'success': False, 'message': 'No filename provided'})
    
#     file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
#     if not os.path.exists(file_path):
#         return jsonify({'success': False, 'message': 'File not found'})
    
#     # Prediksi menggunakan model
#     prediction_result = predict_image(file_path, filename)
#     image_path = os.path.join('uploads', filename).replace('\\', '/')
    
#     return jsonify({
#         'success': True, 
#         'prediction': prediction_result, 
#         'image_path': image_path
#     })

# if __name__ == '__main__':
#     # Pastikan folder static dan uploads ada
#     if not os.path.exists(STATIC_FOLDER):
#         os.makedirs(STATIC_FOLDER)
#     if not os.path.exists(UPLOAD_FOLDER):
#         os.makedirs(UPLOAD_FOLDER)
    
#     # Pastikan folder model ada
#     model_dir = 'model'
#     if not os.path.exists(model_dir):
#         os.makedirs(model_dir)
#         print(f"Folder '{model_dir}' dibuat. Silakan letakkan file 'DenseNet121_SisiBawah.h5' di folder ini.")
        
#     # Jalankan aplikasi
#     app.run(debug=True)

import os
import pandas as pd
import joblib
from flask import Flask, request, render_template, jsonify
from werkzeug.utils import secure_filename

# Inisialisasi aplikasi Flask
app = Flask(__name__)

# --- Load Model Joblib ---
BASE_DIR = os.path.dirname(os.path.realpath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model', 'model_dummy.joblib')

print(f"BASE_DIR: {BASE_DIR}")
print(f"MODEL_PATH: {MODEL_PATH}")
print(f"File exists: {os.path.exists(MODEL_PATH)}")

try:
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print(f"Model berhasil dimuat dari: {MODEL_PATH}")
        print(f"Model type: {type(model)}")
    else:
        model = None
        print(f"File model tidak ditemukan di: {MODEL_PATH}")
except Exception as e:
    model = None
    print(f"Error loading model: {str(e)}")

# --- Konfigurasi ---
STATIC_FOLDER = 'static'
UPLOAD_FOLDER = os.path.join(STATIC_FOLDER, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Hanya izinkan CSV
ALLOWED_EXTENSIONS = {'csv'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- Fungsi Prediksi ---
def predict_csv(csv_path, filename):
    """Fungsi untuk prediksi file CSV"""
    try:
        print(f"predict_csv called with model: {model}")
        if model is None:
            return f"Model tidak tersedia. File '{filename}' berhasil diunggah."

        # Baca CSV
        df = pd.read_csv(csv_path)

        # Pastikan ada minimal 10 fitur
        if df.shape[1] < 10:
            return f"Error: File '{filename}' harus memiliki minimal 10 fitur, tetapi hanya {df.shape[1]}."

        # Ambil hanya 10 fitur pertama (agar konsisten dengan model)
        df_input = df.iloc[:, :10]

        # Prediksi
        prediction_code = model.predict(df_input)
        prediction_proba = model.predict_proba(df_input)

        result_label = "Yes" if prediction_code[0] == 1 else "No"
        prob_no = float(prediction_proba[0][0])
        prob_yes = float(prediction_proba[0][1])

        return f"Hasil Prediksi: {result_label}<br>Probabilitas No: {prob_no:.4f}<br>Probabilitas Yes: {prob_yes:.4f}"

    except Exception as e:
        return f"Error dalam prediksi: {str(e)}"

# --- Rute Aplikasi Web ---
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'No file selected'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'success': False, 'message': 'No file selected'})
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Validasi jumlah fitur minimal 10
        try:
            df = pd.read_csv(file_path)
            if df.shape[1] < 10:
                os.remove(file_path)  # hapus file jika tidak valid
                return jsonify({'success': False, 'message': f"CSV harus memiliki minimal 10 fitur, hanya {df.shape[1]} ditemukan"})
        except Exception as e:
            return jsonify({'success': False, 'message': f"Gagal membaca CSV: {str(e)}"})

        return jsonify({'success': True, 'filename': filename, 'message': 'File uploaded successfully'})
    
    return jsonify({'success': False, 'message': 'Invalid file type, hanya CSV diperbolehkan'})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    filename = data.get('filename')
    
    if not filename:
        return jsonify({'success': False, 'message': 'No filename provided'})
    
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    
    if not os.path.exists(file_path):
        return jsonify({'success': False, 'message': 'File not found'})
    
    # Prediksi menggunakan model joblib
    prediction_result = predict_csv(file_path, filename)
    file_url = os.path.join('uploads', filename).replace('\\', '/')
    
    return jsonify({
        'success': True, 
        'prediction': prediction_result, 
        'file_path': file_url
    })

if __name__ == '__main__':
    if not os.path.exists(STATIC_FOLDER):
        os.makedirs(STATIC_FOLDER)
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    
    model_dir = 'model'
    if not os.path.exists(model_dir):
        os.makedirs(model_dir)
        print(f"Folder '{model_dir}' dibuat. Silakan letakkan file 'binary_classifier_model.joblib' di folder ini.")
        
    app.run(debug=True)

