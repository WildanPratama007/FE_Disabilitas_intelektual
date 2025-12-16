# Platform Deteksi Disabilitas Intelektual - Standalone AI System

🧬 **Prototipe Kecerdasan Buatan berbasis Uji Metilasi dengan Nanopore NextGen Sequencing untuk Diagnosis Penyakit Langka Anak dengan Disabilitas Intelektual**

Platform web standalone untuk deteksi dini disabilitas intelektual menggunakan analisis data genomik CSV dengan teknologi machine learning Decision Tree terintegrasi.

## 🚀 Fitur Utama

- **📊 Upload CSV Files**: Drag & drop file CSV (genomic data)
- **🤖 Local AI Prediction**: Decision Tree model terintegrasi (Combined FMR1 + DMR)
- **📈 Realistic Confidence**: Confidence score 75-95% berdasarkan kelengkapan data
- **💾 Local History**: Riwayat prediksi tersimpan dalam JSON lokal
- **📦 Sample Download**: Unduh kumpulan test data dalam format ZIP
- **🔄 Standalone Operation**: Tidak memerlukan API server eksternal
- **📱 Responsive Design**: Tampilan optimal di desktop, tablet, dan mobile
- **🎠 Team Carousel**: Informasi tim peneliti multidisiplin
- **📞 Contact Section**: Informasi kontak Universitas YARSI dan mitra

## 🛠️ Teknologi

- **Frontend**: Flask (Python), HTML5, CSS3, JavaScript ES6
- **Backend**: Integrated Flask dengan local model
- **AI/ML**: Decision Tree (Scikit-learn), Pandas, Joblib
- **Model**: Combined FMR1 + DMR Decision Tree
- **Storage**: JSON file system (local)
- **UI Framework**: Bootstrap 5
- **Icons**: Font Awesome 6
- **Styling**: Custom CSS dengan medical theme

## 📋 Persyaratan

- Python 3.8+
- Flask 2.0+
- Pandas
- Scikit-learn
- Joblib
- Model deployment artifacts di `../model/`

## ⚡ Instalasi

1. **Setup Project Structure**
```bash
FE_Disabilitas_Intelektual/
├── web/                    # Frontend Application
├── model/                  # ML Model Deployment
└── be/                     # Backend (placeholder)
```

2. **Install Dependencies**
```bash
cd web
pip install -r requirements.txt
```

3. **Verify Model Path**
   - Pastikan folder `../model/deployment_artifacts/` berisi:
     - `model_decision_tree_combined.joblib`
     - `label_encoder.joblib`
     - `feature_names.json`

4. **Jalankan Aplikasi**
```bash
python app.py
```

5. **Akses Aplikasi**
   - Frontend: `http://localhost:8004`
   - Landing page untuk semua user
   - Dashboard untuk upload dan prediksi

## 📁 Struktur Proyek

```
FE_Disabilitas_Intelektual/
├── web/                          # Frontend Application
│   ├── app.py                   # Flask app dengan model integration
│   ├── templates/
│   │   ├── landing.html         # Landing page
│   │   ├── index.html           # Main dashboard
│   │   ├── history.html         # Prediction history
│   │   ├── about.html           # Medical information
│   │   ├── architecture.html    # System architecture
│   │   ├── login.html           # Login page (optional)
│   │   └── register.html        # Register page (optional)
│   ├── static/
│   │   ├── assets/
│   │   │   ├── css/            # Custom styling
│   │   │   ├── js/             # JavaScript logic
│   │   │   └── images/         # Medical images & logos
│   │   ├── uploads/            # File upload storage
│   │   ├── history.json        # Local prediction history
│   │   └── vendor/             # Bootstrap & jQuery
│   └── requirements.txt        # Python dependencies
├── model/                       # ML Model Deployment
│   ├── inference.py            # Model inference engine
│   ├── deployment_artifacts/   # Model files
│   │   ├── model_decision_tree_combined.joblib
│   │   ├── label_encoder.joblib
│   │   └── feature_names.json
│   ├── test_data_csv/          # Test data samples
│   └── kumpulan_test_data_csv.zip
└── be/                         # Backend API (placeholder)
```

## 🔧 Penggunaan

### 🏠 Landing Page
- Informasi platform AI untuk deteksi disabilitas intelektual
- Tim peneliti dan informasi kontak
- Akses langsung ke dashboard

### 📊 Upload & Analisis
1. **Upload File CSV**
   - Drag & drop atau klik untuk pilih file CSV
   - Format: Standard CSV dengan header genomik
   - Automatic feature alignment dengan model

2. **Prediksi AI Lokal**
   - Klik tombol "🩺 Analisis Medis" setelah upload berhasil
   - Loading screen dengan medical-themed animation
   - Hasil: "case" atau "ctrl" dengan confidence score

3. **Hasil Prediksi**
   - Modal popup dengan prediction, confidence, dan sample ID
   - Confidence: 75-95% (realistic range)
   - Medical disclaimer untuk evaluasi lanjutan
   - Keyboard shortcut: **ESC** untuk close modal

### 📈 History & Navigation
- **History**: Riwayat prediksi tersimpan lokal dalam JSON
- **Architecture**: Dokumentasi arsitektur sistem
- **About**: Informasi medis lengkap tentang disabilitas intelektual
- **Download Sample**: Unduh test data ZIP untuk percobaan

## 🎯 AI & ML Pipeline

### Model Specifications
- **Type**: Binary Classification (case vs ctrl)
- **Algorithm**: Decision Tree (Combined FMR1 + DMR)
- **Input**: CSV files dengan genomic features
- **Output**: Prediction + confidence score
- **Confidence**: 75-95% berdasarkan feature completeness
- **Feature Handling**: Automatic alignment + zero imputation

### Local Integration
- **Model Path**: `../model/deployment_artifacts/`
- **Inference**: `inference.py` dari model folder
- **No API Required**: Standalone operation
- **Real-time Processing**: Instant prediction results

## 📱 Responsive Design

- **Desktop**: Optimal layout dengan proper spacing
- **Tablet**: Responsive grid dengan adjusted margins
- **Mobile**: Stack layout dengan mobile-first approach
- **Team Carousel**: Auto-responsive (3 members desktop, 2 mobile)
- **Navigation**: Bootstrap navbar dengan hamburger menu

## 🔧 Development

### Local Model Integration
```python
# Model initialization
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'model'))
from inference import ModelPredictor

model_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'deployment_artifacts')
model_predictor = ModelPredictor(model_path)
```

### Key Features Implementation
- **File Upload**: Local storage dengan validation
- **Model Prediction**: Direct inference call
- **History Storage**: JSON file system
- **Error Handling**: Comprehensive error management
- **Loading States**: Medical-themed animations

### API Endpoints
- `POST /upload` - Upload CSV dan simpan lokal
- `GET /upload/predict` - Prediksi menggunakan model lokal
- `GET /api/history` - Ambil riwayat dari JSON
- `GET /download/sample` - Download test data ZIP

## 🧪 Testing

### Sample Data Testing
1. **Download Test Data**
   - Klik "📥 Unduh Test Data (ZIP)" di dashboard
   - Extract file ZIP yang berisi multiple CSV samples

2. **Upload & Test**
   - Upload salah satu file CSV (bc10.csv, bc11.csv, dll)
   - Klik "🩺 Analisis Medis" untuk testing
   - Verifikasi hasil prediksi dan confidence

### Expected Results
- **Prediction**: "case" atau "ctrl"
- **Confidence**: 75.0% - 95.0%
- **Sample ID**: Nama file yang diupload
- **Status**: "success"

## 🏥 Format Data Medis

### Input CSV Requirements
- **Format**: Standard CSV dengan comma separator
- **Header**: Sesuai dengan feature names model
- **Content**: Nilai numerik (float/int)
- **Missing Features**: Otomatis diisi 0 (zero imputation)
- **Encoding**: UTF-8

### Output Format
```json
{
  "sample_id": "bc10.csv",
  "prediction": "case",
  "confidence": 87.5,
  "status": "success"
}
```

## 🔒 Keamanan & Privacy

- **Local Processing**: Semua data diproses lokal
- **No External API**: Tidak ada data yang dikirim ke server eksternal
- **File Validation**: Hanya CSV files yang diizinkan
- **Temporary Storage**: Upload files tersimpan sementara
- **Medical Compliance**: Sesuai untuk lingkungan penelitian medis

## 🚀 Deployment

### Standalone Deployment
1. **Copy Project**: Seluruh folder "FE_Disabilitas_Intelektual"
2. **Install Dependencies**: `pip install -r requirements.txt`
3. **Run Application**: `python web/app.py`
4. **Access**: Browser ke `http://localhost:8004`

### Production Considerations
- **WSGI Server**: Gunakan Gunicorn atau uWSGI
- **Reverse Proxy**: Setup Nginx untuk production
- **SSL/TLS**: Configure HTTPS untuk keamanan
- **Logging**: Implement proper application logging
- **Monitoring**: Setup health checks dan monitoring

## 📞 Kontak

**Universitas YARSI**
- 📍 Menara YARSI, Jl. Let. Jend. Suprapto Kav. 13, Jakarta Pusat
- 📞 +62(21)4206675
- 📧 info@yarsi.ac.id

## 👥 Tim Peneliti

**🏥 Tim multidisiplin yang terdiri dari Dosen Sains Biomedis, Dosen Informatika, dan ahli Biologi Molekuler:**

- **Sultana** - Ketua Pengusul (Universitas YARSI)
- **Ahmad Rusdan Handoyo Utomo** - Anggota (Universitas YARSI)
- **Chandra Prasetyo Utomo** - Anggota (Universitas YARSI)
- **Kinasih Prayuni** - Anggota (Universitas YARSI)
- **Susanti PhD** - Anggota (Pathgen)

## 📄 Lisensi

© 2025 YARSI AI Medical Platform. All rights reserved.
Dikembangkan untuk keperluan penelitian medis Hibah Tahun 1.

## ⚠️ Medical Disclaimer

Hasil analisis ini merupakan skrining awal menggunakan AI. Diperlukan evaluasi lanjutan oleh tenaga medis profesional untuk diagnosis definitif.

## 🔄 Changelog

### v3.0.0 (Current - Standalone)
- ✅ **Local Model Integration**: Decision Tree terintegrasi tanpa API
- ✅ **CSV File Support**: Upload CSV files untuk genomic analysis
- ✅ **Realistic Confidence**: 75-95% confidence berdasarkan data quality
- ✅ **Local History**: JSON-based history storage
- ✅ **Sample Download**: ZIP file dengan multiple test data
- ✅ **Standalone Operation**: No external dependencies
- ✅ **Enhanced Performance**: Direct model inference
- ✅ **Improved UX**: Streamlined workflow tanpa authentication
- ✅ **Medical Compliance**: Sesuai standar penelitian medis
- ✅ **Zero Configuration**: Ready to run out of the box

### v2.0.0 (Legacy - API-based)
- ✅ BED File Support dengan API integration
- ✅ Authentication System dengan JWT token
- ✅ External API communication

### v1.0.0 (Initial)
- ✅ Basic CSV functionality
- ✅ Simple ML prediction
- ✅ Responsive design