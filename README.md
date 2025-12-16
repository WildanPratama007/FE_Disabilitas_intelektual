# Platform Deteksi Disabilitas Intelektual - YARSI AI

🧬 **Prototipe Kecerdasan Buatan berbasis Uji Metilasi dengan Nanopore NextGen Sequencing untuk Diagnosis Penyakit Langka Anak dengan Disabilitas Intelektual**

Platform web berbasis AI untuk deteksi dini disabilitas intelektual menggunakan analisis data genomik (.bed files) dengan teknologi machine learning dan epigenetik.

## 🚀 Fitur Utama

- **🧬 Upload BED Files**: Drag & drop file .bed (Nanopore NextGen Sequencing data)
- **🤖 AI Prediction**: Binary classification (Intellectual Disability / Non-Intellectual Disability)
- **🔐 Authentication System**: Login/Register dengan validasi form real-time
- **👁️ Show/Hide Password**: Toggle visibility password dengan icon mata
- **📊 History Management**: Riwayat prediksi dengan detail hasil analisis
- **🏗️ Architecture Documentation**: Dokumentasi arsitektur cloud dan ML pipeline
- **⌨️ Keyboard Shortcuts**: ESC untuk close modal, Enter prevention untuk multiple popup
- **📱 Responsive Design**: Tampilan optimal di desktop, tablet, dan mobile
- **🎠 Team Carousel**: Informasi tim peneliti multidisiplin
- **📞 Contact Section**: Informasi kontak Universitas YARSI dan mitra

## 🛠️ Teknologi

- **Frontend**: Flask (Python), HTML5, CSS3, JavaScript
- **Backend API**: FastAPI (Python) - Clean Architecture
- **Authentication**: JWT Token-based authentication
- **Database**: SQLite dengan repository pattern
- **ML Pipeline**: Genomic variant analysis dengan epigenetic approach
- **UI Framework**: Bootstrap 5
- **Icons**: Font Awesome 6
- **Styling**: Custom CSS dengan medical theme

## 📋 Persyaratan

- Python 3.8+
- Flask 2.0+
- Requests library
- Backend API (FastAPI) running on port 8000
- Modern web browser dengan JavaScript enabled

## ⚡ Instalasi

1. **Clone repository**
```bash
git clone <repository-url>
cd "FE_Disabilitas_intelektual - Dev"
```

2. **Buat virtual environment**
```bash
python -m venv DIEnve
DIEnve\Scripts\activate  # Windows
# atau
source DIEnve/bin/activate  # Linux/Mac
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Setup Backend API**
   - Pastikan backend API (disabilitas-intelektual-api) berjalan di `http://localhost:8000`
   - API menggunakan endpoint `/api/v1/` prefix

5. **Jalankan aplikasi**
```bash
python app.py
```

6. **Akses aplikasi**
   - Frontend: `http://localhost:8004`
   - Landing page untuk user belum login
   - Dashboard untuk user yang sudah login

## 📁 Struktur Proyek

```
FE_Disabilitas_intelektual - Dev/
├── app.py                    # Aplikasi Flask utama
├── templates/
│   ├── landing.html         # Landing page (public)
│   ├── login.html           # Halaman login dengan show/hide password
│   ├── register.html        # Halaman registrasi dengan show/hide password
│   ├── index.html           # Dashboard (authenticated)
│   ├── about.html           # Informasi medis disabilitas intelektual
│   ├── architecture.html    # Arsitektur cloud & ML pipeline (white bg)
│   └── history.html         # Riwayat prediksi (white bg)
├── static/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── navbar-custom.css  # Custom navbar styling
│   │   │   ├── custom.css         # Custom styles
│   │   │   └── templatem.css      # Main template styles
│   │   ├── js/
│   │   │   ├── app.js            # Main application logic dengan ESC support
│   │   │   └── custom.js         # Custom JavaScript
│   │   └── images/              # Medical images & logos
│   ├── uploads/                 # Temporary upload folder
│   └── vendor/                  # Bootstrap & jQuery
├── model/                       # Placeholder for ML models
├── requirements.txt             # Python dependencies
└── README.md
```

## 🔧 Penggunaan

### 🏠 Landing Page (Public Access)
- Informasi platform AI untuk deteksi disabilitas intelektual
- Tim peneliti dan informasi kontak
- Link untuk login/register

### 🔐 Authentication
1. **Register**: Daftar dengan nama, email, password (min 8 karakter)
2. **Login**: Masuk dengan email dan password
3. **Show/Hide Password**: Toggle visibility dengan icon mata (👁️)
4. **Form Validation**: Real-time validation dengan visual feedback

### 🧬 Upload & Analisis (Authenticated Users)
1. **Upload File BED**
   - Drag & drop atau klik untuk pilih file .bed
   - File format: Nanopore NextGen Sequencing data
   - Single file upload only

2. **Prediksi AI**
   - Klik tombol "🩺 Analisis Medis" setelah upload berhasil
   - Loading screen dengan medical-themed animation
   - Hasil binary classification: Intellectual Disability / Non-Intellectual Disability

3. **Hasil Prediksi**
   - Modal popup dengan risk score, confidence, dan condition
   - Medical disclaimer untuk evaluasi lanjutan
   - Keyboard shortcut: **ESC** untuk close modal
   - Prevention multiple popup dengan Enter

### 📊 History & Navigation
- **History**: Riwayat prediksi dengan detail hasil (white background)
- **Architecture**: Dokumentasi arsitektur sistem (white background)
- **About**: Informasi medis lengkap tentang disabilitas intelektual

## 🎯 AI & ML Pipeline

- **Type**: Binary Classification (Intellectual Disability vs Non-Intellectual Disability)
- **Input**: BED files (Nanopore NextGen Sequencing data)
- **Technology**: Epigenetic analysis dengan methylation pattern detection
- **Output**: Risk score, confidence level, predicted condition
- **Threshold**: 0.5 untuk binary classification
- **Backend**: FastAPI dengan Clean Architecture pattern

## 📱 Responsive Design

- **Desktop**: Layout optimal dengan sidebar dan main content
- **Tablet**: Responsive grid dengan proper spacing
- **Mobile**: Stack layout dengan margin adjustments
- **Team Carousel**: Auto-responsive (3 members desktop, 2 mobile)
- **Navigation**: Bootstrap navbar dengan mobile hamburger menu
- **White Background**: History dan Architecture pages menggunakan white background

## 🏗️ Development

### API Integration
- Frontend berkomunikasi dengan FastAPI backend
- Endpoint base: `http://localhost:8000/api/v1/`
- Authentication: JWT Bearer token
- Error handling untuk API responses

### Menambah Fitur Baru
1. **Backend**: Edit `app.py` untuk Flask routes dan API calls
2. **Frontend**: Update templates HTML sesuai kebutuhan
3. **Styling**: Modifikasi CSS files di `static/assets/css/`
4. **JavaScript**: Tambah logic di `static/assets/js/app.js`

### Key Features Implementation
- **File Upload**: Drag & drop dengan validation (.bed files only)
- **Modal System**: Popup dengan ESC key support dan multiple prevention
- **Form Validation**: Real-time validation dengan visual feedback
- **Session Management**: Token-based dengan auto-refresh
- **Loading States**: Medical-themed loading animations
- **Show/Hide Password**: Toggle dengan icon mata pada login/register

## 🔒 Keamanan

- **File Validation**: Hanya file .bed yang diizinkan
- **Authentication**: JWT token-based dengan expiry
- **Input Sanitization**: Validasi form dan file input
- **Session Security**: Auto logout saat token expired
- **API Security**: Bearer token untuk semua API calls
- **Error Handling**: Proper error messages tanpa expose sensitive info
- **CORS**: Configured untuk API communication

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

© 2025 YARSI AI. All rights reserved.

## 🔄 Changelog

### v2.0.0 (Current)
- ✅ **BED File Support**: Upload .bed files untuk genomic analysis
- ✅ **Authentication System**: Login/Register dengan JWT token
- ✅ **Binary Classification**: Intellectual Disability vs Non-Intellectual Disability
- ✅ **Show/Hide Password**: Toggle password visibility dengan icon mata (👁️)
- ✅ **History Management**: Riwayat prediksi dengan detail results
- ✅ **Architecture Documentation**: Cloud & ML pipeline documentation
- ✅ **White Background**: History dan Architecture pages dengan white background
- ✅ **Medical Content**: Comprehensive medical information about intellectual disability
- ✅ **Keyboard Shortcuts**: ESC untuk close modal, Enter prevention untuk multiple popup
- ✅ **Form Validation**: Real-time validation dengan visual feedback
- ✅ **Responsive Design**: Mobile-first approach dengan Bootstrap 5
- ✅ **Loading Animations**: Medical-themed loading screens
- ✅ **API Integration**: FastAPI backend dengan Clean Architecture
- ✅ **Enhanced UX**: Improved color palette dan medical theme

### v1.0.0 (Legacy)
- ✅ Upload CSV functionality
- ✅ ML prediction integration
- ✅ Responsive team carousel
- ✅ Contact section
- ✅ Clean code structure
