# SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK
## Platform Deteksi Disabilitas Intelektual - Standalone AI System

---

## BAB 1 SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK

### 1.1 Pendahuluan

#### 1.1.1 Siklus Hidup Pengembangan Aplikasi

Platform Deteksi Disabilitas Intelektual Standalone dikembangkan menggunakan metodologi **Software Development Life Cycle (SDLC)** dengan pendekatan **Agile Development** yang terdiri dari fase-fase berikut:

**1. Fase Perencanaan dan Analisis**
- Identifikasi kebutuhan medis untuk deteksi disabilitas intelektual
- Analisis teknologi genomik dan epigenetik
- Studi kelayakan implementasi Decision Tree untuk analisis CSV
- Definisi scope standalone system tanpa API eksternal

**2. Fase Desain Sistem**
- Perancangan arsitektur standalone dengan model terintegrasi
- Desain Decision Tree pipeline (Combined FMR1 + DMR)
- Perancangan antarmuka pengguna untuk analisis genomik
- Desain local storage dan JSON-based history

**3. Fase Implementasi**
- Pengembangan Flask application dengan model integration
- Implementasi inference engine lokal
- Integrasi Decision Tree model (Scikit-learn)
- Pengembangan sistem upload dan prediksi standalone

**4. Fase Testing dan Quality Assurance**
- Unit testing untuk model inference
- Integration testing untuk Flask-model communication
- User Acceptance Testing (UAT) dengan sample data
- Performance testing untuk local processing

**5. Fase Deployment dan Maintenance**
- Deployment sebagai standalone application
- Local monitoring dan logging
- Maintenance dan model updates
- Documentation dan user support

#### 1.1.2 Tujuan Penulisan Spesifikasi Kebutuhan Perangkat Lunak

Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SRS) ini disusun dengan tujuan:

**1. Dokumentasi Kebutuhan Sistem Standalone**
- Mendefinisikan kebutuhan fungsional sistem terintegrasi
- Menyediakan referensi untuk pengembangan standalone
- Memastikan pemahaman arsitektur tanpa API eksternal

**2. Panduan Pengembangan Model Integration**
- Memberikan blueprint untuk integrasi model lokal
- Menjadi acuan implementasi inference engine
- Memfasilitasi estimasi resource dan performance

**3. Basis Testing dan Validasi Model**
- Menyediakan kriteria untuk testing model accuracy
- Menjadi dasar validasi confidence scoring
- Memastikan kualitas prediksi medis

**4. Komunikasi Stakeholder Medis**
- Memfasilitasi komunikasi dengan tim peneliti
- Menyediakan dokumentasi untuk approval medis
- Menjadi kontrak untuk deliverable penelitian

#### 1.1.3 Cakupan Produk

**Nama Produk**: Platform Deteksi Disabilitas Intelektual - Standalone AI System

**Deskripsi Produk**:
Platform standalone yang menggunakan Decision Tree terintegrasi untuk menganalisis data genomik CSV guna mendeteksi potensi disabilitas intelektual. Platform ini beroperasi tanpa memerlukan API server eksternal dan dirancang untuk lingkungan penelitian medis.

**Cakupan Fungsional**:

1. **Sistem Upload dan Validasi CSV**
   - Upload file CSV dengan data genomik
   - Validasi format dan struktur data
   - Automatic feature alignment dengan model

2. **Model Decision Tree Terintegrasi**
   - Combined FMR1 + DMR Decision Tree
   - Local inference tanpa API calls
   - Realistic confidence scoring (75-95%)

3. **Analisis dan Prediksi Lokal**
   - Binary classification (case vs ctrl)
   - Real-time processing dan hasil
   - Medical-grade accuracy dan reliability

4. **Sistem History Lokal**
   - JSON-based history storage
   - Tracking prediksi per session
   - Local data persistence

5. **Sample Data Management**
   - Download kumpulan test data ZIP
   - Multiple CSV samples untuk testing
   - Validation data untuk accuracy check

6. **Interface Medis dan Dokumentasi**
   - Medical-themed user interface
   - Informasi tentang disabilitas intelektual
   - Arsitektur sistem dan metodologi

**Cakupan Teknis**:
- Frontend: Flask Web Application dengan HTML5, CSS3, JavaScript
- Backend: Integrated Flask dengan local model inference
- Model: Decision Tree (Scikit-learn) dengan Joblib serialization
- Storage: JSON file system untuk history
- Processing: Local CSV processing dengan Pandas
- Security: Local file validation dan sanitization

**Batasan Cakupan**:
- Platform hanya mendukung file format CSV
- Sistem dirancang untuk single file upload per analisis
- Model terbatas pada Combined FMR1 + DMR features
- Hasil analisis bersifat skrining awal, bukan diagnosis definitif
- Tidak ada koneksi ke database eksternal atau API

#### 1.1.4 Definisi, Singkatan, dan Akronim

**Definisi Medis**:
- **Disabilitas Intelektual**: Gangguan neurodevelopmental dengan keterbatasan signifikan dalam fungsi intelektual dan perilaku adaptif
- **FMR1 Gene**: Fragile X Mental Retardation 1 gene yang terkait dengan disabilitas intelektual
- **DMR**: Differentially Methylated Region yang mempengaruhi ekspresi gen
- **Epigenetik**: Modifikasi yang mempengaruhi ekspresi gen tanpa mengubah sekuens DNA

**Definisi Teknis**:
- **CSV File**: Comma-Separated Values format untuk data genomik
- **Decision Tree**: Algoritma machine learning untuk binary classification
- **Confidence Score**: Tingkat kepercayaan model terhadap prediksi (75-95%)
- **Feature Alignment**: Proses menyelaraskan kolom CSV dengan model features

**Singkatan dan Akronim**:

| Akronim | Kepanjangan | Deskripsi |
|---------|-------------|-----------|
| AI | Artificial Intelligence | Kecerdasan buatan untuk analisis |
| ML | Machine Learning | Pembelajaran mesin Decision Tree |
| CSV | Comma-Separated Values | Format file data genomik |
| DT | Decision Tree | Algoritma klasifikasi utama |
| FMR1 | Fragile X Mental Retardation 1 | Gen target analisis |
| DMR | Differentially Methylated Region | Region metilasi target |
| SRS | Software Requirements Specification | Dokumen spesifikasi |
| UAT | User Acceptance Testing | Testing penerimaan pengguna |
| UI/UX | User Interface/User Experience | Antarmuka pengguna |
| JSON | JavaScript Object Notation | Format penyimpanan history |
| HTML | HyperText Markup Language | Bahasa markup web |
| CSS | Cascading Style Sheets | Bahasa styling web |
| JS | JavaScript | Bahasa pemrograman frontend |
| YARSI | Yayasan Rumah Sakit Islam | Institusi peneliti |
| SDLC | Software Development Life Cycle | Siklus pengembangan |

**Istilah Khusus Platform**:
- **Standalone System**: Sistem yang beroperasi tanpa API eksternal
- **Local Inference**: Prediksi model yang dijalankan secara lokal
- **Feature Alignment**: Proses otomatis menyelaraskan kolom CSV
- **Zero Imputation**: Pengisian nilai 0 untuk fitur yang hilang
- **Medical Dashboard**: Interface utama untuk analisis genomik
- **Prediction History**: Riwayat analisis tersimpan dalam JSON
- **Sample Data ZIP**: Kumpulan file test untuk validasi

#### 1.1.5 Deskripsi Umum Bab

Dokumen SRS ini terdiri dari beberapa bab yang memberikan gambaran lengkap tentang Platform Standalone:

**BAB 1: Spesifikasi Kebutuhan Perangkat Lunak**
- Pendahuluan dan metodologi pengembangan standalone
- Tujuan, cakupan, dan definisi sistem terintegrasi
- Arsitektur tanpa API dan local processing

**BAB 2: Deskripsi Umum Sistem** *(akan dilanjutkan)*
- Perspektif produk dalam ekosistem penelitian medis
- Fungsi-fungsi utama sistem standalone
- Karakteristik pengguna dan batasan teknis
- Asumsi model dan dependensi lokal

**BAB 3: Kebutuhan Fungsional** *(akan dilanjutkan)*
- Spesifikasi detail fitur upload dan prediksi
- Use case untuk analisis genomik CSV
- Interface requirements dan model integration
- Kebutuhan processing dan storage lokal

**BAB 4: Kebutuhan Non-Fungsional** *(akan dilanjutkan)*
- Performance requirements untuk local processing
- Accuracy dan reliability requirements model
- Usability requirements untuk peneliti medis
- Security requirements untuk data genomik

**BAB 5: Arsitektur dan Desain Sistem** *(akan dilanjutkan)*
- Arsitektur standalone dan model integration
- Decision Tree pipeline dan inference engine
- Local storage design dan data flow
- CSV processing dan feature alignment

**Struktur Pembahasan Setiap Bab**:
- Overview objektif sistem standalone
- Detail implementasi dengan contoh CSV
- Referensi ke komponen model terintegrasi
- Summary dan validation criteria

**Audience dan Penggunaan Dokumen**:
- **Tim Peneliti Medis**: Untuk validasi kebutuhan klinis
- **Developer**: Sebagai panduan implementasi standalone
- **Quality Assurance**: Untuk testing strategy model
- **System Administrator**: Untuk deployment lokal
- **End Users**: Untuk pemahaman sistem capabilities

**Maintenance dan Update Dokumen**:
- Update seiring dengan improvement model accuracy
- Version control untuk perubahan algoritma
- Review berkala dengan tim peneliti medis
- Integration feedback dari testing dengan sample data

---

### 1.2 Kebutuhan Sistem Standalone

#### 1.2.1 Kebutuhan Model Integration
- Decision Tree model harus terintegrasi dalam Flask application
- Model artifacts (joblib files) harus accessible secara lokal
- Inference engine harus mendukung real-time processing
- Feature alignment harus otomatis untuk berbagai format CSV

#### 1.2.2 Kebutuhan Performance Lokal
- Response time prediksi maksimal 5 detik
- Support untuk file CSV hingga 10MB
- Memory usage optimal untuk model loading
- Concurrent processing untuk multiple requests

#### 1.2.3 Kebutuhan Accuracy dan Reliability
- Model accuracy minimal 85% pada validation set
- Confidence scoring realistis (75-95% range)
- Consistent results untuk input yang sama
- Proper error handling untuk invalid data

#### 1.2.4 Kebutuhan Medical Compliance
- Medical disclaimer untuk setiap hasil prediksi
- Proper documentation untuk interpretasi hasil
- Audit trail untuk tracking prediksi
- Data privacy untuk informasi genomik

---

*Dokumen ini merupakan living document yang akan terus berkembang sesuai dengan improvement model dan feedback dari tim peneliti medis. Untuk informasi lebih lanjut, silakan hubungi tim pengembang Platform Deteksi Disabilitas Intelektual - YARSI AI.*