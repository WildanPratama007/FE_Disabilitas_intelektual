# Platform Deteksi Disabilitas Intelektual

Platform web berbasis AI untuk deteksi dini disabilitas intelektual menggunakan analisis data CSV dengan model machine learning.

## 🚀 Fitur Utama

- **Upload CSV**: Drag & drop file CSV untuk analisis
- **Prediksi AI**: Analisis menggunakan model machine learning
- **Responsive Design**: Tampilan optimal di desktop dan mobile
- **Team Carousel**: Informasi tim pengembang
- **Contact Section**: Informasi kontak Universitas YARSI

## 🛠️ Teknologi

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **ML**: scikit-learn, joblib
- **UI Framework**: Bootstrap 4
- **Icons**: Font Awesome

## 📋 Persyaratan

- Python 3.7+
- scikit-learn
- Flask
- pandas
- joblib

## ⚡ Instalasi

1. **Clone repository**
```bash
git clone <repository-url>
cd "Proyek ML DI"
```

2. **Buat virtual environment**
```bash
python -m venv DIEnve
DIEnve\Scripts\activate  # Windows
```

3. **Install dependencies**
```bash
pip install flask pandas scikit-learn joblib
```

4. **Siapkan model**
   - Letakkan file model `model_dummy.joblib` di folder `model/`

5. **Jalankan aplikasi**
```bash
python app.py
```

6. **Akses aplikasi**
   - Buka browser: `http://localhost:5000`

## 📁 Struktur Proyek

```
Proyek ML DI/
├── app.py                 # Aplikasi Flask utama
├── templates/
│   └── index.html        # Template HTML
├── static/
│   ├── assets/
│   │   ├── css/          # File CSS
│   │   ├── js/           # File JavaScript
│   │   └── images/       # Gambar dan logo
│   └── uploads/          # Folder upload file
├── model/
│   └── model_dummy.joblib # Model ML
└── README.md
```

## 🔧 Penggunaan

1. **Upload File CSV**
   - Drag & drop atau klik untuk pilih file CSV
   - File harus memiliki minimal 10 kolom fitur

2. **Prediksi**
   - Klik tombol "Predict" setelah upload berhasil
   - Hasil akan ditampilkan dalam popup

3. **Format Data**
   - CSV dengan 10+ kolom numerik
   - Baris pertama sebagai header (opsional)

## 🎯 Model ML

- **Type**: Binary Classification
- **Input**: 10 fitur numerik
- **Output**: Yes/No prediction dengan probabilitas
- **Format**: Joblib (.joblib)

## 📱 Responsive Design

- **Desktop**: 3 anggota tim per slide
- **Mobile**: 2 anggota tim per slide (vertikal)
- **Auto-responsive**: Deteksi otomatis ukuran layar

## 🏗️ Development

### Menambah Fitur Baru
1. Edit `app.py` untuk backend logic
2. Update `templates/index.html` untuk UI
3. Modifikasi `static/assets/css/custom.css` untuk styling
4. Tambah JavaScript di `static/assets/js/app.js`

### Testing
```bash
# Test dengan file CSV sample
# Upload file dengan 10+ kolom numerik
```

## 🔒 Keamanan

- Validasi file CSV
- Sanitasi input
- Error handling
- File size limits

## 📞 Kontak

**Universitas YARSI**
- 📍 Menara YARSI, Jl. Let. Jend. Suprapto Kav. 13, Jakarta Pusat
- 📞 +62(21)4206675
- 📧 info@yarsi.ac.id

## 👥 Tim Pengembang

- **Chandra Prasteyo Utomo** - Lead AI Researcher
- **Ummi Azizah Rachmawati** - UI/UX
- **Muhamad Fathurahman** - Software Developer
- **Sri Chusri Haryanti** - UI/UX Designer
- **Ibu Puspa** - Data Scientist
- **Alim El Hakim** - Backend Developer
- **Nashuha Insani** - AI Engineer
- **Muhammad Wildan Pratama** - Frontend Developer
- **Mufid Farhan Muhana** - Backend Developer

## 📄 Lisensi

© 2025 YARSI AI. All rights reserved.

## 🔄 Changelog

### v1.0.0
- ✅ Upload CSV functionality
- ✅ ML prediction integration
- ✅ Responsive team carousel
- ✅ Contact section
- ✅ Clean code structure