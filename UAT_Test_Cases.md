# DAFTAR UAT (USER ACCEPTANCE TESTING)
## Platform Deteksi Disabilitas Intelektual - YARSI AI

### INFORMASI UMUM
- **Aplikasi**: Platform Deteksi Disabilitas Intelektual
- **Teknologi**: Flask Web Application dengan AI/ML Backend
- **Target User**: Tenaga medis profesional
- **File Format**: .bed (Nanopore NextGen Sequencing data)
- **Upload**: Single file upload only - satu file per analisis medis

---

## 1. LANDING PAGE TESTING

### TC-LP-001: Akses Landing Page
**Tujuan**: Memastikan landing page dapat diakses dengan benar
- **Langkah**:
  1. Buka browser
  2. Akses URL aplikasi (http://localhost:8004/)
- **Expected Result**: 
  - Landing page terbuka dengan benar
  - Logo YARSI AI terlihat
  - Navbar menampilkan menu: Home, About, Contact, Login
  - Banner utama menampilkan informasi platform AI

### TC-LP-002: Navigasi Menu Landing Page
**Tujuan**: Memastikan semua menu di landing page berfungsi
- **Langkah**:
  1. Klik menu "Home" → harus tetap di landing page
  2. Klik menu "About" → scroll ke section About Us
  3. Klik menu "Contact" → scroll ke section Contact Us
  4. Klik menu "Login" → redirect ke halaman login
- **Expected Result**: Semua navigasi berfungsi dengan benar

### TC-LP-003: Konten Informasi Platform
**Tujuan**: Memastikan informasi platform ditampilkan lengkap
- **Langkah**:
  1. Scroll ke section informasi klinis
  2. Periksa konten "Definisi Medis Disabilitas Intelektual"
  3. Periksa konten "Arsitektur Cloud dan Machine Learning"
- **Expected Result**: 
  - Informasi medis ditampilkan dengan benar
  - Gambar dan ikon terlihat
  - Link "Pelajari Lebih" dan "Akses Sistem" berfungsi

### TC-LP-004: Section Tim Peneliti
**Tujuan**: Memastikan carousel tim peneliti berfungsi
- **Langkah**:
  1. Scroll ke section "Tim Peneliti"
  2. Klik tombol next (›) pada carousel
  3. Klik tombol previous (‹) pada carousel
  4. Klik indicator dots di bawah carousel
- **Expected Result**: 
  - Carousel bergerak dengan smooth transition
  - Menampilkan informasi tim peneliti dengan benar
  - Semua kontrol carousel berfungsi

### TC-LP-005: Section Contact Us
**Tujuan**: Memastikan informasi kontak ditampilkan
- **Langkah**:
  1. Scroll ke section "Hubungi Kami"
  2. Periksa informasi Universitas YARSI
  3. Periksa logo mitra/partner
- **Expected Result**: 
  - Informasi kontak lengkap (alamat, telepon, email)
  - Logo partner ditampilkan dengan benar
  - Google Maps embed berfungsi

---

## 2. AUTHENTICATION TESTING

### TC-AUTH-001: Akses Halaman Login
**Tujuan**: Memastikan halaman login dapat diakses
- **Langkah**:
  1. Dari landing page, klik menu "Login"
  2. Atau akses langsung /login
- **Expected Result**: 
  - Halaman login terbuka
  - Form login ditampilkan (username/email, password)
  - Button show/hide password tersedia di field password
  - Checkbox "Ingat saya" tersedia
  - Link "Lupa password" tersedia
  - Link "Registrasi" tersedia

### TC-AUTH-002: Validasi Form Login
**Tujuan**: Memastikan validasi form login berfungsi
- **Langkah**:
  1. Buka halaman login - periksa status awal tombol
  2. Isi username saja, biarkan password kosong
  3. Isi password saja, biarkan username kosong
  4. Isi username dan password kurang dari 8 karakter
  5. Isi username dan password valid (minimal 8 karakter)
  6. Hapus salah satu field yang sudah terisi
- **Expected Result**: 
  - Tombol login disabled saat halaman pertama kali dibuka
  - Tombol tetap disabled jika ada field yang kosong
  - Tombol tetap disabled jika password kurang dari 8 karakter
  - Tombol enabled hanya ketika semua field terisi dan password ≥ 8 karakter
  - Tombol kembali disabled jika ada field yang dikosongkan
  - Validasi real-time berfungsi saat user mengetik

### TC-AUTH-003: Login dengan Kredensial Valid
**Tujuan**: Memastikan login berhasil dengan kredensial yang benar
- **Langkah**:
  1. Isi username/email yang terdaftar
  2. Isi password yang benar
  3. Klik tombol "Login ke Sistem Medis"
- **Expected Result**: 
  - Login berhasil
  - Redirect ke dashboard (/dashboard)
  - Session token tersimpan
  - Flash message "Login berhasil!" ditampilkan

### TC-AUTH-004: Login dengan Kredensial Invalid
**Tujuan**: Memastikan login gagal dengan kredensial salah
- **Langkah**:
  1. Isi username/email yang tidak terdaftar
  2. Isi password sembarang
  3. Klik tombol login
- **Expected Result**: 
  - Login gagal
  - Tetap di halaman login
  - Flash message error ditampilkan
  - Form direset

### TC-AUTH-005: Akses Halaman Register
**Tujuan**: Memastikan halaman registrasi dapat diakses
- **Langkah**:
  1. Dari halaman login, klik link "Registrasi"
  2. Atau akses langsung /register
- **Expected Result**: 
  - Halaman register terbuka
  - Form registrasi lengkap (nama, email, password, konfirmasi password)
  - Button show/hide password tersedia di field password dan konfirmasi password
  - Checkbox terms & conditions
  - Link kembali ke login

### TC-AUTH-006: Validasi Form Register
**Tujuan**: Memastikan validasi form registrasi berfungsi
- **Langkah**:
  1. Buka halaman register - periksa status awal tombol
  2. Isi nama lengkap saja, biarkan field lain kosong
  3. Isi nama dan email, biarkan password kosong
  4. Isi nama, email, password, biarkan konfirmasi password kosong
  5. Isi semua field tapi password kurang dari 8 karakter
  6. Isi semua field valid tapi password tidak sama dengan konfirmasi
  7. Isi semua field valid tapi tidak centang terms & conditions
  8. Isi semua field valid dan centang terms & conditions
  9. Hapus salah satu field yang sudah terisi
- **Expected Result**: 
  - Tombol register disabled saat halaman pertama kali dibuka
  - Tombol tetap disabled selama ada field yang kosong
  - Tombol tetap disabled jika password kurang dari 8 karakter
  - Tombol tetap disabled jika password tidak match dengan konfirmasi
  - Tombol tetap disabled jika terms & conditions tidak dicentang
  - Tombol enabled hanya ketika semua field terisi valid dan terms dicentang
  - Tombol kembali disabled jika ada field yang dikosongkan
  - Validasi real-time berfungsi saat user mengetik di setiap field

### TC-AUTH-007: Registrasi User Baru
**Tujuan**: Memastikan registrasi user baru berhasil
- **Langkah**:
  1. Isi nama lengkap
  2. Isi email yang belum terdaftar
  3. Isi password (minimal 8 karakter)
  4. Isi konfirmasi password yang sama
  5. Centang terms & conditions
  6. Klik tombol "Daftar"
- **Expected Result**: 
  - Registrasi berhasil
  - Redirect ke halaman login
  - Flash message "Registrasi berhasil! Silakan login."
  - User dapat login dengan kredensial baru

### TC-AUTH-008: Registrasi dengan Email Terdaftar
**Tujuan**: Memastikan registrasi gagal jika email sudah ada
- **Langkah**:
  1. Isi data registrasi dengan email yang sudah terdaftar
  2. Submit form
- **Expected Result**: 
  - Registrasi gagal
  - Error message ditampilkan
  - Tetap di halaman register

### TC-AUTH-009: Fungsi Show/Hide Password Login
**Tujuan**: Memastikan button show/hide password berfungsi di halaman login
- **Langkah**:
  1. Buka halaman login
  2. Isi password di field password
  3. Klik button show password (icon mata)
  4. Klik lagi button hide password
- **Expected Result**: 
  - Password awalnya tersembunyi (type="password")
  - Setelah klik show: password terlihat sebagai text biasa
  - Icon berubah dari mata tertutup ke mata terbuka
  - Setelah klik hide: password kembali tersembunyi
  - Icon kembali ke mata tertutup

### TC-AUTH-010: Fungsi Show/Hide Password Register
**Tujuan**: Memastikan button show/hide password berfungsi di halaman register
- **Langkah**:
  1. Buka halaman register
  2. Isi password di field password
  3. Isi konfirmasi password di field konfirmasi
  4. Klik button show password di field password
  5. Klik button show password di field konfirmasi password
  6. Klik button hide password di kedua field
- **Expected Result**: 
  - Kedua password field awalnya tersembunyi
  - Button show/hide berfungsi independen untuk setiap field
  - Icon berubah sesuai status show/hide
  - Password dan konfirmasi password dapat ditampilkan/disembunyikan terpisah

---

## 3. DASHBOARD TESTING

### TC-DASH-001: Akses Dashboard Tanpa Login
**Tujuan**: Memastikan dashboard tidak dapat diakses tanpa login
- **Langkah**:
  1. Akses /dashboard tanpa login
- **Expected Result**: 
  - Redirect ke halaman login
  - Dashboard tidak dapat diakses

### TC-DASH-002: Akses Dashboard Setelah Login
**Tujuan**: Memastikan dashboard dapat diakses setelah login
- **Langkah**:
  1. Login dengan kredensial valid
  2. Periksa halaman dashboard
- **Expected Result**: 
  - Dashboard terbuka dengan benar
  - Navbar menampilkan: Dashboard, About, Contact, Logout
  - Banner utama dengan upload area tersedia
  - Informasi klinis ditampilkan

### TC-DASH-003: Navigasi Dashboard
**Tujuan**: Memastikan navigasi di dashboard berfungsi
- **Langkah**:
  1. Klik menu "Dashboard" → tetap di dashboard
  2. Klik menu "About" → scroll ke section about
  3. Klik menu "Contact" → scroll ke section contact
  4. Klik menu "Logout" → logout dan redirect ke login
- **Expected Result**: Semua navigasi berfungsi dengan benar

### TC-DASH-004: Upload Area Interface
**Tujuan**: Memastikan interface upload area berfungsi
- **Langkah**:
  1. Periksa drop zone upload
  2. Klik area upload
  3. Periksa tombol "Analisis Medis"
- **Expected Result**: 
  - Drop zone terlihat dengan jelas
  - File input tersembunyi tapi dapat diakses
  - Tombol analisis disabled sebelum upload
  - Icon dan text informatif ditampilkan

---

## 4. FILE UPLOAD TESTING

### TC-UPLOAD-001: Upload Single File Valid (.bed)
**Tujuan**: Memastikan upload single file .bed berhasil
- **Langkah**:
  1. Klik area upload untuk memilih file
  2. Pilih satu file dengan ekstensi .bed
  3. Periksa response upload
- **Expected Result**: 
  - File .bed berhasil diupload
  - Response success dari server
  - Tombol "Analisis Medis" menjadi enabled
  - Nama file ditampilkan
  - Hanya satu file yang dapat diupload per session

### TC-UPLOAD-002: Upload File Invalid (bukan .bed)
**Tujuan**: Memastikan file selain .bed ditolak
- **Langkah**:
  1. Coba upload file .txt, .csv, .jpg, .pdf
  2. Periksa response
- **Expected Result**: 
  - Upload ditolak
  - Error message "Invalid file type, only BED allowed"
  - Tombol analisis tetap disabled

### TC-UPLOAD-003: Status Button Analysis Tanpa File
**Tujuan**: Memastikan button analysis tidak dapat diklik tanpa file
- **Langkah**:
  1. Buka dashboard setelah login
  2. Periksa status tombol "Analisis Medis" sebelum upload file
  3. Coba klik tombol "Analisis Medis"
- **Expected Result**: 
  - Tombol "Analisis Medis" dalam status disabled
  - Tombol tidak dapat diklik
  - Tidak ada proses analisis yang berjalan
  - Cursor menunjukkan "not-allowed" saat hover

### TC-UPLOAD-004: Upload File Kedua (Replace)
**Tujuan**: Memastikan upload file baru menggantikan file sebelumnya
- **Langkah**:
  1. Upload file .bed pertama
  2. Upload file .bed kedua
  3. Periksa status file yang tersimpan
- **Expected Result**: 
  - File kedua menggantikan file pertama
  - Hanya satu file aktif dalam sistem
  - Tombol analisis tetap berfungsi untuk file terbaru
  - Nama file yang ditampilkan adalah file terbaru

### TC-UPLOAD-005: Validasi Single File Upload
**Tujuan**: Memastikan sistem hanya menerima satu file per analisis
- **Langkah**:
  1. Coba drag multiple files ke drop zone
  2. Coba select multiple files dari file picker
- **Expected Result**: 
  - Sistem hanya menerima satu file
  - File pertama yang dipilih yang diproses
  - Error message jika mencoba upload multiple files
  - Interface menunjukkan "single file only"

---

## 5. PREDICTION/ANALYSIS TESTING

### TC-PRED-001: Analisis File yang Sudah Diupload
**Tujuan**: Memastikan analisis AI berfungsi
- **Langkah**:
  1. Upload file .bed yang valid
  2. Klik tombol "Analisis Medis"
  3. Tunggu proses analisis
- **Expected Result**: 
  - Loading indicator ditampilkan
  - Proses analisis berjalan
  - Hasil prediksi ditampilkan dalam popup/modal
  - Hasil berisi: Risk Score, Confidence, Condition

### TC-PRED-002: Analisis Tanpa Upload File
**Tujuan**: Memastikan analisis tidak bisa dilakukan tanpa file
- **Langkah**:
  1. Klik tombol "Analisis Medis" tanpa upload file
- **Expected Result**: 
  - Tombol disabled atau error message
  - Analisis tidak dijalankan

### TC-PRED-003: Handling Error Analisis
**Tujuan**: Memastikan error handling saat analisis gagal
- **Langkah**:
  1. Upload file .bed yang corrupt atau invalid content
  2. Jalankan analisis
- **Expected Result**: 
  - Error message yang informatif
  - Tidak crash aplikasi
  - User dapat mencoba lagi

### TC-PRED-004: Format Hasil Prediksi
**Tujuan**: Memastikan hasil prediksi ditampilkan dengan benar
- **Langkah**:
  1. Jalankan analisis yang berhasil
  2. Periksa format hasil dalam popup
- **Expected Result**: 
  - Risk Score ditampilkan
  - Confidence dalam persentase
  - Predicted Condition jelas
  - Medical disclaimer ditampilkan
  - Tombol close berfungsi

### TC-PRED-005: Simpan Hasil ke History
**Tujuan**: Memastikan hasil prediksi tersimpan ke history
- **Langkah**:
  1. Jalankan analisis
  2. Periksa apakah hasil tersimpan
  3. Akses halaman history
- **Expected Result**: 
  - Hasil analisis tersimpan otomatis
  - Dapat diakses dari history
  - Data lengkap tersimpan

---

## 6. ABOUT PAGE TESTING

### TC-ABOUT-001: Akses Halaman About
**Tujuan**: Memastikan halaman about dapat diakses
- **Langkah**:
  1. Dari dashboard atau landing page, klik menu "About"
  2. Atau akses langsung /about
- **Expected Result**: 
  - Halaman about terbuka
  - Konten informasi medis ditampilkan
  - Layout responsive

### TC-ABOUT-002: Konten Informasi Medis
**Tujuan**: Memastikan konten medis lengkap dan akurat
- **Langkah**:
  1. Scroll dan baca semua konten
  2. Periksa section "Urgensi"
  3. Periksa section "Karakteristik Klinis"
  4. Periksa section "Pendekatan"
- **Expected Result**: 
  - Semua konten terbaca dengan jelas
  - Gambar dan formatting benar
  - Informasi medis akurat dan lengkap

### TC-ABOUT-003: Navigasi dalam About Page
**Tujuan**: Memastikan navigasi dalam halaman about
- **Langkah**:
  1. Periksa navbar (berbeda untuk user login/tidak login)
  2. Scroll ke berbagai section
  3. Periksa link eksternal jika ada
- **Expected Result**: 
  - Navbar sesuai status login
  - Smooth scrolling
  - Link eksternal berfungsi (buka tab baru)

### TC-ABOUT-004: Responsive Design About
**Tujuan**: Memastikan about page responsive
- **Langkah**:
  1. Buka di desktop
  2. Resize browser window
  3. Buka di mobile/tablet
- **Expected Result**: 
  - Layout menyesuaikan ukuran layar
  - Text tetap terbaca
  - Gambar tidak overflow

---

## 7. ARCHITECTURE PAGE TESTING

### TC-ARCH-001: Akses Halaman Architecture
**Tujuan**: Memastikan halaman architecture dapat diakses (hanya setelah login)
- **Langkah**:
  1. Login terlebih dahulu
  2. Akses /architecture
- **Expected Result**: 
  - Halaman architecture terbuka
  - Diagram arsitektur ditampilkan
  - Informasi teknis lengkap

### TC-ARCH-002: Akses Architecture Tanpa Login
**Tujuan**: Memastikan architecture page protected
- **Langkah**:
  1. Logout atau akses tanpa login
  2. Coba akses /architecture
- **Expected Result**: 
  - Redirect ke halaman login
  - Architecture page tidak dapat diakses

### TC-ARCH-003: Konten Architecture
**Tujuan**: Memastikan konten arsitektur lengkap
- **Langkah**:
  1. Periksa diagram "Cloud Infrastructure Architecture"
  2. Periksa diagram "Machine Learning Pipeline Architecture"
  3. Periksa deskripsi komponen
- **Expected Result**: 
  - Kedua diagram terlihat jelas
  - Deskripsi komponen lengkap dan akurat
  - Gambar tidak broken

### TC-ARCH-004: Tombol Kembali
**Tujuan**: Memastikan tombol kembali berfungsi
- **Langkah**:
  1. Klik tombol "Kembali"
- **Expected Result**: 
  - Kembali ke halaman sebelumnya (dashboard)
  - Navigasi berfungsi dengan benar

---

## 8. HISTORY PAGE TESTING

### TC-HIST-001: Akses Halaman History
**Tujuan**: Memastikan halaman history dapat diakses (hanya setelah login)
- **Langkah**:
  1. Login terlebih dahulu
  2. Klik menu "History" atau akses /history
- **Expected Result**: 
  - Halaman history terbuka
  - Tabel history ditampilkan
  - Loading indicator muncul saat load data

### TC-HIST-002: Akses History Tanpa Login
**Tujuan**: Memastikan history page protected
- **Langkah**:
  1. Logout atau akses tanpa login
  2. Coba akses /history
- **Expected Result**: 
  - Redirect ke halaman login
  - History page tidak dapat diakses

### TC-HIST-003: Tampilan History Kosong
**Tujuan**: Memastikan handling ketika belum ada history
- **Langkah**:
  1. Akses history dengan user baru (belum pernah analisis)
- **Expected Result**: 
  - Pesan "Belum ada riwayat prediksi" ditampilkan
  - Icon inbox atau indicator kosong
  - Layout tetap rapi

### TC-HIST-004: Tampilan History dengan Data
**Tujuan**: Memastikan history ditampilkan dengan benar
- **Langkah**:
  1. Lakukan beberapa analisis terlebih dahulu
  2. Akses halaman history
- **Expected Result**: 
  - Tabel history berisi data prediksi
  - Kolom: No, Tanggal Upload, Aksi
  - Tanggal dalam format Indonesia
  - Tombol "Cek History" tersedia

### TC-HIST-005: Detail History
**Tujuan**: Memastikan detail history dapat dilihat
- **Langkah**:
  1. Dari tabel history, klik tombol "Cek History"
  2. Periksa popup detail
- **Expected Result**: 
  - Popup detail terbuka
  - Menampilkan Risk Score, Confidence, Condition
  - Medical disclaimer ditampilkan
  - Tombol close berfungsi

### TC-HIST-006: Navigasi History
**Tujuan**: Memastikan navigasi di halaman history
- **Langkah**:
  1. Periksa navbar (Dashboard, History, Logout)
  2. Klik menu Dashboard → kembali ke dashboard
  3. Klik menu Logout → logout
- **Expected Result**: 
  - Semua navigasi berfungsi
  - Active state pada menu History

---

## 9. PERFORMANCE TESTING

### TC-PERF-001: Page Load Time
**Tujuan**: Memastikan halaman load dengan cepat
- **Langkah**:
  1. Ukur waktu load setiap halaman
  2. Periksa dengan network throttling
- **Expected Result**: 
  - Halaman load < 3 detik (normal network)
  - Graceful degradation pada slow network
  - Loading indicators ditampilkan

### TC-PERF-002: File Upload Performance
**Tujuan**: Memastikan upload single file tidak timeout
- **Langkah**:
  1. Upload file .bed ukuran normal (< 5MB)
  2. Monitor progress upload
- **Expected Result**: 
  - Upload berhasil dalam waktu wajar (< 10 detik)
  - Progress indicator berfungsi
  - Tidak ada timeout error untuk file ukuran normal

### TC-PERF-003: Prediction Performance
**Tujuan**: Memastikan analisis AI tidak terlalu lama
- **Langkah**:
  1. Jalankan analisis dengan berbagai file
  2. Monitor waktu proses
- **Expected Result**: 
  - Analisis selesai dalam waktu wajar (< 30 detik)
  - Loading indicator informatif
  - Tidak ada timeout

### TC-PERF-004: Concurrent Users
**Tujuan**: Memastikan aplikasi handle multiple users dengan single file upload
- **Langkah**:
  1. Simulasi 2-3 users login bersamaan
  2. Masing-masing upload satu file dan analisis
- **Expected Result**: 
  - Aplikasi tetap responsif
  - Tidak ada conflict antar user
  - Setiap user dapat upload dan analisis file masing-masing
  - Performance degradation minimal

---

## 10. RESPONSIVE DESIGN TESTING

### TC-RESP-001: Desktop View
**Tujuan**: Memastikan tampilan desktop optimal
- **Langkah**:
  1. Test di resolusi 1920x1080, 1366x768
  2. Periksa semua halaman
- **Expected Result**: 
  - Layout rapi dan proporsional
  - Semua element terlihat
  - Navigation mudah digunakan

### TC-RESP-002: Tablet View
**Tujuan**: Memastikan tampilan tablet optimal
- **Langkah**:
  1. Test di resolusi tablet (768x1024)
  2. Periksa portrait dan landscape
- **Expected Result**: 
  - Layout menyesuaikan dengan baik
  - Touch-friendly interface
  - Navbar collapse berfungsi

### TC-RESP-003: Mobile View
**Tujuan**: Memastikan tampilan mobile optimal
- **Langkah**:
  1. Test di resolusi mobile (375x667, 414x896)
  2. Periksa semua fitur
- **Expected Result**: 
  - Layout mobile-first
  - Text tetap readable
  - Touch targets cukup besar
  - Upload area tetap usable

### TC-RESP-004: Cross-Browser Compatibility
**Tujuan**: Memastikan kompatibilitas browser
- **Langkah**:
  1. Test di Chrome, Firefox, Safari, Edge
  2. Periksa semua fitur utama
- **Expected Result**: 
  - Konsisten di semua browser
  - Tidak ada broken features
  - CSS dan JS berfungsi normal

---

## 11. ACCESSIBILITY TESTING

### TC-ACC-001: Keyboard Navigation
**Tujuan**: Memastikan aplikasi dapat digunakan dengan keyboard
- **Langkah**:
  1. Navigate menggunakan Tab key
  2. Submit form dengan Enter
  3. Close modal dengan Escape
- **Expected Result**: 
  - Semua element dapat diakses dengan keyboard
  - Focus indicator jelas
  - Logical tab order

### TC-ACC-002: Screen Reader Compatibility
**Tujuan**: Memastikan kompatibilitas dengan screen reader
- **Langkah**:
  1. Test dengan screen reader
  2. Periksa alt text pada gambar
  3. Periksa label pada form
- **Expected Result**: 
  - Content dapat dibaca screen reader
  - Alt text informatif
  - Form labels jelas

### TC-ACC-003: Color Contrast
**Tujuan**: Memastikan kontras warna memadai
- **Langkah**:
  1. Periksa kontras text dan background
  2. Test dengan color blindness simulator
- **Expected Result**: 
  - Kontras memenuhi standar WCAG
  - Readable untuk color blind users
  - Information tidak hanya bergantung pada warna

---

## KRITERIA KEBERHASILAN UAT

### ✅ PASS CRITERIA:
- Semua test case critical (TC-AUTH, TC-UPLOAD, TC-PRED, TC-HIST) PASS
- Minimal 90% dari semua test case PASS
- Performance memenuhi standar (load time < 3s, analysis < 30s)
- Responsive design berfungsi di semua device
- Fitur utama (Login, Register, Predict, History) berfungsi dengan baik

### ❌ FAIL CRITERIA:
- Ada test case critical yang FAIL
- Performance tidak memenuhi standar
- Aplikasi crash atau tidak stabil
- Fitur utama tidak berfungsi

---

## ENVIRONMENT TESTING

### Test Environment:
- **OS**: Windows 10/11, macOS, Ubuntu
- **Browser**: Chrome (latest), Firefox (latest), Safari (latest), Edge (latest)
- **Device**: Desktop, Tablet, Mobile
- **Network**: Fast, Slow, Offline
- **Screen Resolution**: 1920x1080, 1366x768, 768x1024, 375x667

### Test Data:
- **Valid .bed files**: Small to medium size (< 5MB)
- **Invalid files**: .txt, .csv, .jpg, .exe
- **User accounts**: Valid, invalid, new registration
- **Network conditions**: Normal, slow, disconnected
- **File quantity**: Single file per test case (no multiple files)

---

## SIGN-OFF

**Tester**: _________________ **Date**: _________

**Product Owner**: _________________ **Date**: _________

**Technical Lead**: _________________ **Date**: _________

**Medical Advisor**: _________________ **Date**: _________

---

*Dokumen ini mencakup 11 kategori testing dengan fokus pada platform web FE dan BE (Login, Register, Predict, History) untuk memastikan Platform Deteksi Disabilitas Intelektual berfungsi dengan baik untuk digunakan oleh tenaga medis profesional.*