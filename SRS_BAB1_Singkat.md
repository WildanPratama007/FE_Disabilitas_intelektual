# SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK
## Platform Deteksi Disabilitas Intelektual Berbasis AI

---

## BAB 1 SPESIFIKASI KEBUTUHAN PERANGKAT LUNAK

### 1.1 Pendahuluan

#### 1.1.1 Siklus Hidup Pengembangan Aplikasi

Platform ini dikembangkan menggunakan metodologi SDLC (Software Development Life Cycle) dengan pendekatan Agile Development. Proses pengembangan terdiri dari lima fase utama yaitu perencanaan dan analisis kebutuhan medis, desain sistem dan arsitektur cloud, implementasi menggunakan Flask dan Python, testing komprehensif termasuk UAT dengan tenaga medis, serta deployment dan maintenance pada infrastruktur AWS.

#### 1.1.2 Tujuan Penulisan Spesifikasi Kebutuhan Perangkat Lunak

Dokumen SRS ini bertujuan untuk mendokumentasikan seluruh kebutuhan sistem secara detail, memberikan panduan pengembangan yang jelas bagi tim, menjadi basis untuk testing dan validasi sistem, serta memfasilitasi komunikasi efektif antara stakeholder teknis dan non-teknis dalam pengembangan platform medis ini.

#### 1.1.3 Cakupan Produk

Platform Deteksi Disabilitas Intelektual adalah aplikasi web berbasis AI yang menganalisis data genomik file .bed untuk mendeteksi potensi disabilitas intelektual pada anak. Platform ini dikhususkan untuk tenaga medis profesional dengan fitur utama meliputi sistem login/registrasi, upload file genomik, analisis AI menggunakan machine learning, pelaporan hasil medis, dan riwayat analisis.

Secara teknis, platform dibangun dengan Flask (frontend), Python (backend), PostgreSQL (database), TensorFlow/Scikit-learn (AI/ML), dan AWS cloud infrastructure. Sistem hanya mendukung file .bed dengan single upload per analisis, dan hasil berupa skrining awal yang memerlukan konfirmasi medis lebih lanjut.

#### 1.1.4 Definisi, Singkatan, dan Akronim

**Definisi Utama:**
- **Disabilitas Intelektual**: Gangguan perkembangan dengan keterbatasan fungsi intelektual dan perilaku adaptif
- **File .bed**: Format data genomik dari Nanopore NextGen Sequencing
- **Risk Score**: Nilai numerik tingkat risiko hasil analisis AI
- **Confidence Level**: Tingkat kepercayaan model AI terhadap prediksi

**Singkatan Penting:**
- AI: Artificial Intelligence
- ML: Machine Learning  
- SRS: Software Requirements Specification
- UAT: User Acceptance Testing
- API: Application Programming Interface
- AWS: Amazon Web Services
- NGS: Next Generation Sequencing
- YARSI: Yayasan Rumah Sakit Islam

#### 1.1.5 Deskripsi Umum Bab

Dokumen SRS ini terdiri dari lima bab utama. BAB 1 membahas pendahuluan dan spesifikasi kebutuhan dasar. BAB 2 akan menguraikan deskripsi umum sistem dan fungsi platform. BAB 3 akan menjelaskan kebutuhan fungsional secara detail. BAB 4 akan membahas kebutuhan non-fungsional seperti performa dan keamanan. BAB 5 akan menguraikan arsitektur dan desain sistem secara komprehensif.

Dokumen ini ditujukan untuk tim pengembang sebagai panduan implementasi, project manager untuk perencanaan, stakeholder medis untuk validasi kebutuhan, dan quality assurance untuk strategi testing. Sebagai dokumen hidup, SRS ini akan diperbarui secara berkala sesuai perkembangan sistem dan feedback dari pengguna.

### 1.2 Deskripsi Umum Perangkat Lunak

#### 1.2.1 Perspektif Produk

Platform Deteksi Disabilitas Intelektual merupakan sistem web-based yang berdiri sendiri (standalone) namun terintegrasi dengan infrastruktur cloud AWS. Platform ini beroperasi sebagai aplikasi medis khusus yang memproses data genomik untuk keperluan skrining disabilitas intelektual, dimana sistem menerima input berupa file .bed dari hasil Nanopore NextGen Sequencing dan menghasilkan output berupa laporan analisis AI dengan risk score dan confidence level.

#### 1.2.2 Fungsi Produk

Fungsi utama platform meliputi autentikasi pengguna untuk memastikan hanya tenaga medis yang dapat mengakses sistem, upload dan validasi file .bed sebagai input data genomik, analisis AI menggunakan model machine learning untuk deteksi pola metilasi DNA, generasi laporan hasil dengan risk assessment dan interpretasi medis, serta penyimpanan riwayat analisis untuk tracking dan dokumentasi. Platform juga menyediakan informasi edukasi tentang disabilitas intelektual dan arsitektur sistem untuk transparansi metodologi.

#### 1.2.3 Kelas Dan Karakteristik Pengguna

Pengguna utama platform adalah tenaga medis profesional termasuk dokter spesialis anak, genetika medis, dan neurologi yang memiliki pemahaman dasar tentang genomik dan interpretasi hasil laboratorium. Pengguna memiliki karakteristik tingkat pendidikan tinggi (minimal S1 kedokteran), pengalaman klinis dalam menangani pasien anak dengan gangguan perkembangan, serta kemampuan mengoperasikan aplikasi web dan memahami terminologi medis.

#### 1.2.4 Lingkungan Operasi

Platform beroperasi pada lingkungan web browser modern (Chrome, Firefox, Safari, Edge) dengan sistem operasi Windows, macOS, atau Linux. Server aplikasi berjalan pada AWS Lightsail dengan database PostgreSQL, storage menggunakan Amazon S3, dan model AI di-deploy pada Amazon SageMaker. Sistem memerlukan koneksi internet stabil untuk akses cloud services dan proses analisis real-time.

#### 1.2.5 Batasan Perancangan dan Implementasi

Batasan utama meliputi dukungan format file terbatas hanya pada .bed, kapasitas single file upload per analisis, ketergantungan pada koneksi internet untuk fungsi cloud, serta hasil analisis yang bersifat skrining awal bukan diagnosis definitif. Platform juga dibatasi untuk penggunaan tenaga medis profesional saja dengan sistem autentikasi yang ketat dan tidak tersedia untuk akses publik.

#### 1.2.6 Asumsi dan Dependensi

Platform mengasumsikan pengguna memiliki akses internet stabil, browser modern yang mendukung HTML5 dan JavaScript, serta pemahaman dasar tentang genomik dan interpretasi hasil medis. Dependensi utama meliputi ketersediaan AWS cloud services, model machine learning yang telah dilatih dan di-deploy, database PostgreSQL yang berfungsi normal, serta API backend yang responsif untuk komunikasi frontend-backend.

### 1.3 Kebutuhan Fungsional

#### 1.3.1 Antarmuka Pengguna

Platform menyediakan antarmuka web yang responsif dan user-friendly untuk tenaga medis. Landing page menampilkan informasi platform, tim peneliti, dan akses login dengan desain medis profesional menggunakan skema warna biru medis (#0066CC) dan hijau (#2ECC71). Halaman login memiliki form autentikasi dengan validasi real-time, tombol show/hide password, dan link registrasi. Dashboard utama menyediakan area upload file dengan drag-and-drop interface, tombol analisis yang ter-disable hingga file ter-upload, dan navigasi ke halaman history dan about.

*[Gambar 1.1: Screenshot Landing Page dengan banner utama dan informasi platform]*
*[Gambar 1.2: Screenshot Halaman Login dengan form autentikasi]*
*[Gambar 1.3: Screenshot Dashboard dengan area upload file dan tombol analisis]*

Halaman hasil analisis menampilkan popup modal dengan risk score, confidence level, dan interpretasi medis dalam format yang mudah dipahami. Halaman history menyediakan tabel riwayat analisis dengan kolom tanggal upload dan tombol detail. Semua halaman menggunakan navbar konsisten dengan logo YARSI AI, menu navigasi, dan tombol logout untuk pengguna yang sudah login.

*[Gambar 1.4: Screenshot Modal Hasil Analisis dengan risk score dan interpretasi]*
*[Gambar 1.5: Screenshot Halaman History dengan tabel riwayat analisis]*

#### 1.3.2 Antarmuka Komunikasi

Sistem menggunakan arsitektur REST API untuk komunikasi antara frontend Flask dan backend services. Endpoint utama meliputi `/api/v1/auth/login` untuk autentikasi, `/api/v1/auth/register` untuk registrasi pengguna baru, `/api/v1/files/` untuk upload file .bed, `/api/v1/files/predict` untuk proses analisis AI, dan `/api/v1/files/predictions/history` untuk mengambil riwayat analisis. Semua komunikasi menggunakan protokol HTTPS dengan JWT token untuk autentikasi dan otorisasi.

*[Gambar 1.6: Diagram Arsitektur API dengan endpoint dan flow komunikasi]*

Format pertukaran data menggunakan JSON dengan struktur response standar yang mencakup status, message, dan data. Upload file menggunakan multipart/form-data dengan validasi format .bed di sisi server. Sistem juga mengimplementasikan error handling yang komprehensif dengan kode status HTTP yang sesuai dan pesan error yang informatif untuk memudahkan debugging dan user experience.

*[Gambar 1.7: Contoh JSON Response Structure untuk berbagai endpoint]*

### 1.4 Fitur Sistem

#### 1.4.1 Sistem Autentikasi dan Manajemen Pengguna

Platform menyediakan sistem registrasi untuk tenaga medis baru dengan validasi email, password minimal 8 karakter, dan konfirmasi password. Fitur login menggunakan email/username dan password dengan validasi real-time yang memastikan tombol login hanya aktif ketika semua field terisi dengan benar. Sistem juga dilengkapi dengan fitur show/hide password untuk kemudahan input, checkbox "Ingat saya" untuk session persistence, dan link "Lupa password" untuk recovery akun.

*[Gambar 1.8: Screenshot Form Registrasi dengan validasi real-time]*
*[Gambar 1.9: Screenshot Fitur Show/Hide Password pada form login]*

#### 1.4.2 Upload dan Manajemen File Genomik

Sistem mendukung upload file .bed dengan interface drag-and-drop yang user-friendly atau melalui file picker tradisional. Platform melakukan validasi format file secara otomatis dan hanya menerima file dengan ekstensi .bed. Fitur single file upload memastikan hanya satu file yang dapat diproses per analisis, dengan file baru menggantikan file sebelumnya. Status upload ditampilkan dengan loading indicator dan konfirmasi sukses.

*[Gambar 1.10: Screenshot Area Upload dengan drag-and-drop interface]*
*[Gambar 1.11: Screenshot Validasi File dan Status Upload]*

#### 1.4.3 Analisis AI dan Machine Learning

Fitur inti platform adalah analisis AI yang memproses data metilasi DNA dari file .bed menggunakan model machine learning. Tombol "Analisis Medis" hanya aktif setelah file berhasil di-upload dan menampilkan loading screen dengan indikator progress selama proses analisis. Sistem menghasilkan risk score numerik, confidence level dalam persentase, dan predicted condition (Intellectual Disability atau Non-Intellectual Disability) berdasarkan algoritma AI.

*[Gambar 1.12: Screenshot Loading Screen selama proses analisis AI]*
*[Gambar 1.13: Screenshot Tombol Analisis dalam status disabled dan enabled]*

#### 1.4.4 Pelaporan dan Visualisasi Hasil

Hasil analisis ditampilkan dalam modal popup yang berisi risk score, confidence level, dan interpretasi medis yang mudah dipahami. Laporan dilengkapi dengan medical disclaimer yang menekankan bahwa hasil merupakan skrining awal yang memerlukan konfirmasi medis lebih lanjut. Format laporan dirancang khusus untuk tenaga medis dengan terminologi yang sesuai dan rekomendasi tindak lanjut.

*[Gambar 1.14: Screenshot Modal Hasil Analisis dengan interpretasi medis lengkap]*

#### 1.4.5 Riwayat dan Tracking Analisis

Platform menyimpan riwayat semua analisis yang dilakukan oleh setiap pengguna dalam halaman history yang dapat diakses melalui navigasi utama. Tabel history menampilkan nomor urut, tanggal upload dalam format Indonesia, dan tombol "Cek History" untuk melihat detail hasil. Fitur ini memungkinkan tenaga medis untuk melakukan tracking dan dokumentasi analisis pasien secara sistematis.

*[Gambar 1.15: Screenshot Halaman History dengan tabel riwayat lengkap]*
*[Gambar 1.16: Screenshot Detail History dengan informasi analisis sebelumnya]*

#### 1.4.6 Informasi Medis dan Edukasi

Platform menyediakan halaman About yang berisi informasi komprehensif tentang disabilitas intelektual, definisi medis, karakteristik klinis, dan pendekatan diagnosis. Halaman Architecture menampilkan diagram infrastruktur cloud dan machine learning pipeline untuk transparansi metodologi. Landing page juga menyediakan informasi tim peneliti dengan carousel interaktif dan publikasi penelitian terkait.

*[Gambar 1.17: Screenshot Halaman About dengan informasi medis lengkap]*
*[Gambar 1.18: Screenshot Halaman Architecture dengan diagram sistem]*
*[Gambar 1.19: Screenshot Carousel Tim Peneliti pada landing page]*

---

## LAMPIRAN

### Lampiran A: User Stories

Berikut adalah daftar user stories yang menggambarkan kebutuhan pengguna dari perspektif tenaga medis profesional:

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|--------------------|---------|
| US-001 | Sebagai user, saya ingin login dengan kredensial yang valid agar dapat mengakses sistem dengan aman | - Form login dengan validasi kredensial<br>- Autentikasi aman dengan JWT token<br>- Redirect ke dashboard setelah login berhasil | High |
| US-002 | Sebagai user baru, saya ingin registrasi akun agar bisa menggunakan platform | - Form registrasi dengan field lengkap<br>- Validasi email dan password<br>- Konfirmasi registrasi dan redirect ke login | High |
| US-003 | Sebagai user, saya ingin mengunggah file .bed tunggal agar dapat dianalisis oleh AI | - Upload area dengan drag-and-drop<br>- Validasi format file .bed<br>- Single file upload per analisis | High |
| US-004 | Sebagai user, saya ingin menjalankan analisis medis berbasis AI agar mendapat hasil berupa Risk Score, Confidence, dan Predicted Condition | - Tombol analisis aktif setelah upload<br>- Proses AI dengan loading indicator<br>- Hasil berupa Risk Score, Confidence, Predicted Condition | High |
| US-005 | Sebagai user, saya ingin melihat riwayat analisis (history) agar dapat meninjau hasil sebelumnya | - Halaman history dengan tabel riwayat<br>- Detail hasil analisis sebelumnya<br>- Tracking per user | Medium |
| US-006 | Sebagai user, saya ingin mengakses halaman About agar memahami informasi medis dan pendekatan sistem | - Halaman About dengan informasi medis<br>- Penjelasan disabilitas intelektual<br>- Pendekatan sistem yang digunakan | Low |
| US-007 | Sebagai user, saya ingin melihat halaman Architecture agar mengetahui arsitektur cloud dan machine learning sistem | - Halaman Architecture dengan diagram<br>- Penjelasan cloud infrastructure<br>- Machine learning pipeline | Low |
| US-008 | Sebagai user, saya ingin navigasi ke Landing Page agar dapat memulai penggunaan aplikasi | - Landing page informatif<br>- Akses mudah ke fitur utama<br>- Informasi platform dan tim peneliti | Medium |
| US-009 | Sebagai user, saya ingin navigasi ke Dashboard agar dapat mengelola dan melihat data analisis | - Dashboard dengan upload area<br>- Akses ke fitur analisis<br>- Navigasi ke history dan about | High |
| US-010 | Sebagai user, saya ingin navigasi ke halaman About agar mengetahui informasi tentang Tim Peneliti | - Informasi tim peneliti lengkap<br>- Carousel tim dengan foto dan profil<br>- Publikasi penelitian terkait | Low |
| US-011 | Sebagai user, saya ingin navigasi ke halaman Contact agar dapat menghubungi pengelola aplikasi | - Informasi kontak lengkap<br>- Alamat, telepon, email institusi<br>- Google Maps embed lokasi | Low |
| US-012 | Sebagai user, saya ingin navigasi ke Logout agar dapat keluar dari sistem dengan aman | - Tombol logout di navbar<br>- Session cleared setelah logout<br>- Redirect ke halaman login | Medium |
| US-013 | Sebagai user, saya ingin tampilan responsif di desktop, tablet, dan mobile agar bisa menggunakan aplikasi di berbagai perangkat | - Responsive design untuk semua device<br>- Layout menyesuaikan ukuran layar<br>- Touch-friendly interface untuk mobile | Medium |
| US-014 | Sebagai user, saya ingin aplikasi berjalan cepat dan stabil meskipun banyak user login dan analisis bersamaan | - Performance optimal dengan concurrent users<br>- Load time < 3 detik<br>- Sistem stabil saat high traffic | High |
| US-015 | Sebagai user, saya ingin dapat menggunakan aplikasi dengan keyboard (aksesibilitas) agar lebih mudah digunakan oleh semua kalangan | - Keyboard navigation support<br>- Tab order yang logis<br>- Focus indicator yang jelas | Medium |

*[Tabel 1.1: User Stories Platform Deteksi Disabilitas Intelektual]*

**Keterangan Priority:**
- **High**: Fitur inti yang harus ada untuk fungsi dasar platform
- **Medium**: Fitur penting untuk user experience yang baik
- **Low**: Fitur tambahan untuk informasi dan transparansi

---

*Platform Deteksi Disabilitas Intelektual - YARSI AI*