# SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK
## Platform Deteksi Disabilitas Intelektual Berbasis AI

---

## BAB 1 SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK

### 1.1 Pendahuluan

#### 1.1.1 Siklus Hidup Pengembangan Aplikasi

Platform Deteksi Disabilitas Intelektual dikembangkan menggunakan metodologi **Software Development Life Cycle (SDLC)** dengan pendekatan **Agile Development** yang terdiri dari fase-fase berikut:

**1. Fase Perencanaan dan Analisis**
- Identifikasi kebutuhan medis untuk deteksi disabilitas intelektual
- Analisis teknologi Nanopore NextGen Sequencing
- Studi kelayakan implementasi AI/ML untuk analisis genomik
- Definisi scope dan timeline pengembangan

**2. Fase Desain Sistem**
- Perancangan arsitektur cloud computing (AWS)
- Desain machine learning pipeline untuk analisis metilasi DNA
- Perancangan antarmuka pengguna (UI/UX) untuk tenaga medis
- Desain database dan API architecture

**3. Fase Implementasi**
- Pengembangan frontend menggunakan Flask Web Framework
- Implementasi backend API dengan Python
- Integrasi model machine learning (TensorFlow/Scikit-learn)
- Pengembangan sistem autentikasi dan otorisasi

**4. Fase Testing dan Quality Assurance**
- Unit testing untuk setiap komponen
- Integration testing untuk API dan database
- User Acceptance Testing (UAT) dengan tenaga medis
- Security testing dan performance testing

**5. Fase Deployment dan Maintenance**
- Deployment ke cloud infrastructure (AWS)
- Monitoring dan logging sistem
- Maintenance dan update berkala
- Support dan dokumentasi pengguna

#### 1.1.2 Tujuan Penulisan Spesifikasi Kebutuhan Perangkat Lunak

Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SRS) ini disusun dengan tujuan:

**1. Dokumentasi Kebutuhan Sistem**
- Mendefinisikan secara detail kebutuhan fungsional dan non-fungsional platform
- Menyediakan referensi lengkap untuk tim pengembang, stakeholder, dan pengguna
- Memastikan pemahaman yang sama antara semua pihak terkait

**2. Panduan Pengembangan**
- Memberikan blueprint untuk proses pengembangan aplikasi
- Menjadi acuan dalam implementasi fitur-fitur sistem
- Memfasilitasi estimasi waktu dan resource yang dibutuhkan

**3. Basis Testing dan Validasi**
- Menyediakan kriteria untuk User Acceptance Testing (UAT)
- Menjadi dasar untuk verifikasi dan validasi sistem
- Memastikan kualitas dan keandalan platform medis

**4. Komunikasi Stakeholder**
- Memfasilitasi komunikasi antara tim teknis dan non-teknis
- Menyediakan dokumentasi untuk approval dan sign-off
- Menjadi kontrak kerja antara pengembang dan client

#### 1.1.3 Cakupan Produk

**Nama Produk**: Platform Deteksi Disabilitas Intelektual Berbasis AI

**Deskripsi Produk**:
Platform web-based yang menggunakan teknologi Artificial Intelligence dan Machine Learning untuk menganalisis data genomik (file .bed dari Nanopore NextGen Sequencing) guna mendeteksi potensi disabilitas intelektual pada anak. Platform ini dikembangkan khusus untuk tenaga medis profesional di lingkungan klinis.

**Cakupan Fungsional**:

1. **Sistem Autentikasi dan Manajemen User**
   - Registrasi dan login tenaga medis
   - Manajemen session dan keamanan akses
   - Validasi kredensial dan otorisasi

2. **Upload dan Manajemen File Genomik**
   - Upload file .bed (Browser Extensible Data)
   - Validasi format dan integritas file
   - Penyimpanan aman file medis

3. **Analisis AI/ML untuk Deteksi**
   - Pemrosesan data metilasi DNA
   - Analisis menggunakan model machine learning
   - Generasi risk score dan confidence level

4. **Pelaporan dan Visualisasi Hasil**
   - Tampilan hasil analisis dalam format medis
   - Risk assessment dan rekomendasi klinis
   - Medical disclaimer dan panduan interpretasi

5. **Riwayat dan Tracking Analisis**
   - Penyimpanan history prediksi
   - Tracking per user dan per analisis
   - Export dan dokumentasi hasil

6. **Informasi Medis dan Edukasi**
   - Informasi tentang disabilitas intelektual
   - Panduan penggunaan platform
   - Arsitektur sistem dan metodologi

**Cakupan Teknis**:
- Frontend: Flask Web Application dengan HTML5, CSS3, JavaScript
- Backend: Python dengan Flask Framework
- Database: PostgreSQL untuk data persistence
- AI/ML: TensorFlow, Scikit-learn untuk model prediksi
- Cloud: AWS infrastructure (Lightsail, S3, Lambda, SageMaker)
- Security: JWT authentication, HTTPS, data encryption

**Batasan Cakupan**:
- Platform hanya mendukung file format .bed
- Sistem dirancang untuk single file upload per analisis
- Target user terbatas pada tenaga medis profesional
- Hasil analisis bersifat skrining awal, bukan diagnosis definitif

#### 1.1.4 Definisi, Singkatan, dan Akronim

**Definisi Medis**:
- **Disabilitas Intelektual**: Gangguan neurodevelopmental dengan keterbatasan signifikan dalam fungsi intelektual dan perilaku adaptif
- **Metilasi DNA**: Modifikasi epigenetik yang mempengaruhi ekspresi gen tanpa mengubah sekuens DNA
- **Nanopore Sequencing**: Teknologi sequencing DNA generasi ketiga yang dapat membaca molekul DNA secara real-time

**Definisi Teknis**:
- **BED File**: Browser Extensible Data format untuk menyimpan data genomik
- **Risk Score**: Nilai numerik yang menunjukkan tingkat risiko disabilitas intelektual
- **Confidence Level**: Tingkat kepercayaan model AI terhadap prediksi yang dihasilkan

**Singkatan dan Akronim**:

| Akronim | Kepanjangan | Deskripsi |
|---------|-------------|-----------|
| AI | Artificial Intelligence | Kecerdasan buatan untuk analisis data |
| ML | Machine Learning | Pembelajaran mesin untuk prediksi |
| API | Application Programming Interface | Interface komunikasi antar sistem |
| SRS | Software Requirements Specification | Dokumen spesifikasi kebutuhan |
| UAT | User Acceptance Testing | Testing penerimaan pengguna |
| UI/UX | User Interface/User Experience | Antarmuka dan pengalaman pengguna |
| JWT | JSON Web Token | Token untuk autentikasi |
| HTTPS | HyperText Transfer Protocol Secure | Protokol komunikasi aman |
| AWS | Amazon Web Services | Platform cloud computing |
| S3 | Simple Storage Service | Layanan penyimpanan cloud |
| NGS | Next Generation Sequencing | Teknologi sequencing DNA modern |
| DI | Disabilitas Intelektual | Kondisi medis target deteksi |
| YARSI | Yayasan Rumah Sakit Islam | Institusi pengembang |
| REST | Representational State Transfer | Arsitektur API |
| JSON | JavaScript Object Notation | Format pertukaran data |
| CSS | Cascading Style Sheets | Bahasa styling web |
| HTML | HyperText Markup Language | Bahasa markup web |
| JS | JavaScript | Bahasa pemrograman web |
| SQL | Structured Query Language | Bahasa query database |
| CRUD | Create, Read, Update, Delete | Operasi dasar database |
| MVC | Model-View-Controller | Pola arsitektur aplikasi |
| SDLC | Software Development Life Cycle | Siklus pengembangan perangkat lunak |

**Istilah Khusus Platform**:
- **Medical Dashboard**: Antarmuka utama untuk tenaga medis
- **Genomic Analysis**: Proses analisis data genomik menggunakan AI
- **Clinical Report**: Laporan hasil analisis untuk keperluan medis
- **Prediction History**: Riwayat analisis dan prediksi yang telah dilakukan
- **Medical Disclaimer**: Peringatan bahwa hasil adalah skrining awal

#### 1.1.5 Deskripsi Umum Bab

Dokumen SRS ini terdiri dari beberapa bab yang saling terkait untuk memberikan gambaran lengkap tentang Platform Deteksi Disabilitas Intelektual:

**BAB 1: Spesifikasi Kebutuhan Perangkat Lunak**
- Pendahuluan dan latar belakang pengembangan
- Tujuan, cakupan, dan definisi istilah
- Metodologi pengembangan dan siklus hidup aplikasi

**BAB 2: Deskripsi Umum Sistem** *(akan dilanjutkan)*
- Perspektif produk dalam ekosistem medis
- Fungsi-fungsi utama platform
- Karakteristik pengguna dan batasan sistem
- Asumsi dan dependensi teknologi

**BAB 3: Kebutuhan Fungsional** *(akan dilanjutkan)*
- Spesifikasi detail fitur-fitur sistem
- Use case dan skenario penggunaan
- Interface requirements dan integrasi
- Kebutuhan data dan pemrosesan

**BAB 4: Kebutuhan Non-Fungsional** *(akan dilanjutkan)*
- Performance dan scalability requirements
- Security dan privacy requirements
- Usability dan accessibility requirements
- Reliability dan availability requirements

**BAB 5: Arsitektur dan Desain Sistem** *(akan dilanjutkan)*
- Arsitektur cloud dan infrastructure
- Machine learning pipeline design
- Database design dan data flow
- API design dan integration points

**Struktur Pembahasan Setiap Bab**:
- Setiap bab dimulai dengan overview dan objektif
- Pembahasan detail dengan contoh dan ilustrasi
- Referensi ke bab lain yang terkait
- Summary dan key points di akhir bab

**Audience dan Penggunaan Dokumen**:
- **Tim Pengembang**: Sebagai panduan implementasi teknis
- **Project Manager**: Untuk planning dan tracking progress
- **Stakeholder Medis**: Untuk validasi kebutuhan klinis
- **Quality Assurance**: Sebagai basis untuk testing strategy
- **System Administrator**: Untuk deployment dan maintenance

**Maintenance dan Update Dokumen**:
- Dokumen ini akan diupdate seiring dengan perkembangan sistem
- Setiap perubahan akan didokumentasikan dengan version control
- Review berkala akan dilakukan bersama stakeholder
- Feedback dari UAT akan diintegrasikan ke dalam dokumen

---

*Dokumen ini merupakan living document yang akan terus berkembang sesuai dengan kebutuhan dan feedback dari stakeholder. Untuk informasi lebih lanjut atau klarifikasi, silakan hubungi tim pengembang Platform Deteksi Disabilitas Intelektual - YARSI AI.*