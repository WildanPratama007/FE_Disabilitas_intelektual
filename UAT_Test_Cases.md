# User Acceptance Testing (UAT) Test Cases
## Platform Deteksi Disabilitas Intelektual - Standalone AI System

---

## 1. Informasi Umum Testing

### 1.1 Tujuan UAT
- Memvalidasi fungsionalitas sistem standalone dengan model terintegrasi
- Memastikan akurasi prediksi Decision Tree untuk data genomik CSV
- Verifikasi user experience untuk peneliti medis
- Validasi compliance dengan standar penelitian medis

### 1.2 Scope Testing
- **Platform**: Standalone Flask application dengan local model
- **Model**: Decision Tree (Combined FMR1 + DMR)
- **Data Format**: CSV files dengan genomic features
- **Environment**: Local development dan production deployment
- **Users**: Tim peneliti medis dan developer

### 1.3 Test Environment
- **OS**: Windows 10/11, macOS, Linux
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+
- **Python**: 3.8+
- **Dependencies**: Flask, Scikit-learn, Pandas, Joblib
- **Model Path**: `../model/deployment_artifacts/`

---

## 2. Test Cases - Core Functionality

### TC001: Model Loading dan Initialization
**Objective**: Memastikan model Decision Tree berhasil dimuat saat aplikasi startup

**Pre-conditions**:
- Model artifacts tersedia di `../model/deployment_artifacts/`
- Files: `model_decision_tree_combined.joblib`, `label_encoder.joblib`, `feature_names.json`

**Test Steps**:
1. Jalankan `python app.py`
2. Periksa console output untuk model loading status
3. Akses `http://localhost:8004`

**Expected Results**:
- Console menampilkan "✅ Local model loaded successfully"
- Aplikasi dapat diakses tanpa error
- Landing page terbuka dengan normal

**Pass Criteria**: Model berhasil dimuat dan aplikasi berjalan normal

---

### TC002: Landing Page Access
**Objective**: Memvalidasi akses ke landing page dan navigasi dasar

**Pre-conditions**:
- Aplikasi berjalan di `http://localhost:8004`

**Test Steps**:
1. Buka browser dan akses `http://localhost:8004`
2. Periksa tampilan landing page
3. Klik tombol navigasi ke dashboard
4. Periksa responsive design di berbagai ukuran layar

**Expected Results**:
- Landing page terbuka dengan medical theme
- Informasi tim peneliti dan kontak tersedia
- Navigasi ke dashboard berfungsi
- Responsive design bekerja di mobile dan desktop

**Pass Criteria**: Landing page accessible dan navigasi berfungsi normal

---

### TC003: CSV File Upload - Valid File
**Objective**: Memvalidasi upload file CSV yang valid

**Pre-conditions**:
- Berada di dashboard page
- File test CSV tersedia (bc10.csv, bc11.csv, dll)

**Test Steps**:
1. Klik area upload atau drag file CSV ke drop zone
2. Pilih file CSV yang valid (contoh: bc10.csv)
3. Periksa feedback upload success
4. Verifikasi file tersimpan di `static/uploads/`

**Expected Results**:
- Upload progress indicator muncul
- Success message: "📋 Data medis berhasil diupload"
- Tombol "🩺 Analisis Medis" menjadi aktif
- File tersimpan dengan nama yang secure

**Pass Criteria**: File CSV berhasil diupload dan tersimpan

---

### TC004: CSV File Upload - Invalid File
**Objective**: Memvalidasi penolakan file non-CSV

**Pre-conditions**:
- Berada di dashboard page

**Test Steps**:
1. Coba upload file dengan format selain CSV (.txt, .xlsx, .pdf)
2. Periksa error message yang muncul
3. Verifikasi tombol analisis tetap disabled

**Expected Results**:
- Error message: "Invalid file type, only CSV allowed"
- Upload ditolak dengan feedback yang jelas
- Tombol analisis tetap tidak aktif
- Tidak ada file tersimpan di uploads folder

**Pass Criteria**: File non-CSV ditolak dengan error message yang tepat

---

### TC005: AI Prediction - Successful Analysis
**Objective**: Memvalidasi prediksi AI menggunakan model Decision Tree lokal

**Pre-conditions**:
- File CSV valid telah diupload
- Tombol "🩺 Analisis Medis" aktif

**Test Steps**:
1. Klik tombol "🩺 Analisis Medis"
2. Periksa loading screen dengan medical animation
3. Tunggu hasil prediksi muncul dalam popup
4. Verifikasi format hasil prediksi

**Expected Results**:
- Loading screen muncul dengan animation
- Popup hasil berisi:
  - Prediction: "case" atau "ctrl"
  - Confidence: 75.0% - 95.0%
  - Sample: nama file CSV
- Medical disclaimer ditampilkan
- Keyboard shortcut ESC untuk close popup

**Pass Criteria**: Prediksi berhasil dengan hasil yang valid dan confidence realistis

---

### TC006: Confidence Score Validation
**Objective**: Memvalidasi confidence score dalam range yang realistis

**Pre-conditions**:
- Beberapa file CSV test tersedia

**Test Steps**:
1. Upload dan analisis file bc10.csv
2. Catat confidence score yang dihasilkan
3. Upload dan analisis file bc11.csv
4. Catat confidence score yang dihasilkan
5. Ulangi untuk 3-5 file berbeda

**Expected Results**:
- Confidence score dalam range 75.0% - 95.0%
- Variasi confidence berdasarkan kualitas data
- Tidak ada confidence 100% (unrealistic)
- Consistency untuk file yang sama

**Pass Criteria**: Semua confidence score dalam range realistis 75-95%

---

### TC007: History Storage dan Retrieval
**Objective**: Memvalidasi penyimpanan dan pengambilan history prediksi

**Pre-conditions**:
- Minimal 2 prediksi telah dilakukan

**Test Steps**:
1. Akses halaman History
2. Periksa daftar prediksi yang tersimpan
3. Klik "Cek History" pada salah satu entry
4. Verifikasi detail prediksi dalam popup
5. Periksa file `static/history.json`

**Expected Results**:
- History page menampilkan list prediksi
- Setiap entry berisi tanggal dan nomor urut
- Detail popup menampilkan prediction, confidence, filename
- File JSON berisi data history yang valid
- Format timestamp ISO yang benar

**Pass Criteria**: History tersimpan dan dapat diakses dengan benar

---

### TC008: Sample Data Download
**Objective**: Memvalidasi download kumpulan test data ZIP

**Pre-conditions**:
- File `kumpulan_test_data_csv.zip` tersedia di model folder

**Test Steps**:
1. Klik tombol "📥 Unduh Test Data (ZIP)"
2. Periksa proses download
3. Extract file ZIP yang didownload
4. Verifikasi isi file CSV dalam ZIP

**Expected Results**:
- Download dimulai otomatis
- File ZIP berhasil didownload
- ZIP berisi multiple file CSV (bc10.csv, bc11.csv, dll)
- Setiap CSV memiliki format yang valid untuk testing

**Pass Criteria**: Sample data berhasil didownload dan berisi file test yang valid

---

## 3. Test Cases - User Experience

### TC009: Responsive Design Validation
**Objective**: Memvalidasi tampilan responsive di berbagai device

**Test Steps**:
1. Akses aplikasi di desktop (1920x1080)
2. Akses aplikasi di tablet (768x1024)
3. Akses aplikasi di mobile (375x667)
4. Test semua fitur di setiap ukuran layar

**Expected Results**:
- Layout menyesuaikan dengan ukuran layar
- Semua tombol dan form accessible
- Text readable tanpa horizontal scroll
- Navigation menu berfungsi di mobile

**Pass Criteria**: Aplikasi fully responsive di semua device sizes

---

### TC010: Medical Theme dan Branding
**Objective**: Memvalidasi konsistensi medical theme dan branding

**Test Steps**:
1. Periksa color scheme medical (biru, hijau, merah untuk medical elements)
2. Verifikasi medical icons dan imagery
3. Periksa medical disclaimer di setiap hasil
4. Validasi branding YARSI AI

**Expected Results**:
- Consistent medical color palette
- Appropriate medical icons (stethoscope, heartbeat, dll)
- Medical disclaimer visible dan jelas
- YARSI branding prominent dan professional

**Pass Criteria**: Theme medical konsisten dan professional

---

## 4. Test Cases - Performance

### TC011: Model Inference Performance
**Objective**: Memvalidasi performance prediksi model lokal

**Test Steps**:
1. Upload file CSV berukuran kecil (< 1MB)
2. Catat waktu dari klik "Analisis" hingga hasil muncul
3. Upload file CSV berukuran sedang (1-5MB)
4. Catat waktu prediksi
5. Ulangi test 5 kali untuk setiap ukuran

**Expected Results**:
- Prediksi file kecil: < 3 detik
- Prediksi file sedang: < 5 detik
- Consistent performance across multiple runs
- No memory leaks atau performance degradation

**Pass Criteria**: Response time prediksi dalam batas yang acceptable

---

### TC012: Concurrent User Simulation
**Objective**: Memvalidasi handling multiple requests simultan

**Test Steps**:
1. Buka 3 browser tabs berbeda
2. Upload file berbeda di setiap tab secara bersamaan
3. Jalankan prediksi di semua tab dalam waktu bersamaan
4. Periksa hasil di setiap tab

**Expected Results**:
- Semua prediksi berhasil diproses
- Tidak ada interference antar session
- Hasil prediksi sesuai dengan file masing-masing
- No server errors atau crashes

**Pass Criteria**: Sistem dapat handle multiple concurrent requests

---

## 5. Test Cases - Error Handling

### TC013: Model File Missing
**Objective**: Memvalidasi error handling ketika model files tidak tersedia

**Test Steps**:
1. Backup dan hapus sementara file model dari deployment_artifacts
2. Restart aplikasi
3. Coba akses dashboard dan lakukan prediksi

**Expected Results**:
- Console menampilkan "❌ Failed to load local model"
- Aplikasi tetap berjalan tanpa crash
- Error message yang informatif saat prediksi
- Graceful degradation tanpa model

**Pass Criteria**: Error handling yang proper untuk missing model

---

### TC014: Corrupted CSV File
**Objective**: Memvalidasi handling file CSV yang corrupt atau invalid format

**Test Steps**:
1. Buat file CSV dengan format yang salah (missing headers, invalid data)
2. Upload file tersebut
3. Coba lakukan prediksi
4. Periksa error message yang muncul

**Expected Results**:
- Upload mungkin berhasil (file extension valid)
- Prediksi gagal dengan error message yang jelas
- Tidak ada crash atau unhandled exception
- User mendapat feedback yang informatif

**Pass Criteria**: Corrupted files handled dengan error message yang jelas

---

## 6. Test Cases - Security

### TC015: File Upload Security
**Objective**: Memvalidasi keamanan file upload

**Test Steps**:
1. Coba upload file dengan nama yang mengandung special characters
2. Coba upload file dengan path traversal (../../../etc/passwd)
3. Coba upload file executable dengan extension .csv
4. Periksa file yang tersimpan di uploads folder

**Expected Results**:
- Filename di-sanitize dengan secure_filename()
- Path traversal attempts ditolak
- File executable tidak dapat dieksekusi
- Semua file tersimpan dengan nama yang aman

**Pass Criteria**: File upload secure dari common attack vectors

---

## 7. Acceptance Criteria

### 7.1 Functional Acceptance
- ✅ Model Decision Tree berhasil dimuat dan berfungsi
- ✅ CSV upload dan validation bekerja dengan benar
- ✅ Prediksi AI menghasilkan hasil yang akurat
- ✅ Confidence score dalam range realistis (75-95%)
- ✅ History system menyimpan dan menampilkan data dengan benar
- ✅ Sample data download berfungsi
- ✅ Responsive design di semua device

### 7.2 Performance Acceptance
- ✅ Response time prediksi < 5 detik
- ✅ Support file CSV hingga 5MB
- ✅ Concurrent user handling yang stabil
- ✅ Memory usage yang optimal

### 7.3 Security Acceptance
- ✅ File upload security yang memadai
- ✅ Input validation dan sanitization
- ✅ Error handling yang proper
- ✅ No sensitive information exposure

### 7.4 Medical Compliance Acceptance
- ✅ Medical disclaimer di setiap hasil
- ✅ Appropriate medical terminology
- ✅ Professional medical theme
- ✅ Audit trail untuk tracking

---

## 8. Test Execution Summary

### 8.1 Test Environment Setup
```bash
# Setup testing environment
cd "Last Man Standings/web"
pip install -r requirements.txt
python app.py

# Verify model loading
# Check console for "✅ Local model loaded successfully"
```

### 8.2 Test Data Preparation
- Download sample CSV files dari ZIP
- Prepare invalid files untuk negative testing
- Setup different file sizes untuk performance testing

### 8.3 Test Execution Checklist
- [ ] All functional test cases passed
- [ ] Performance benchmarks met
- [ ] Security tests completed
- [ ] User experience validated
- [ ] Medical compliance verified
- [ ] Documentation updated

### 8.4 Sign-off Criteria
- **Technical Lead**: All technical requirements met
- **Medical Researcher**: Clinical accuracy validated
- **Quality Assurance**: All test cases passed
- **Project Manager**: Deliverables completed

---

*UAT Test Cases ini akan dieksekusi oleh tim peneliti medis dan quality assurance untuk memastikan platform memenuhi standar penelitian medis dan technical requirements.*