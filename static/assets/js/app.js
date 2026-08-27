// ML Disability Detection App JavaScript

// DOM Elements - will be initialized after DOM loads
let dropZone = null;
let fileInput = null;

// File Upload Functionality
function initializeFileUpload() {
  // Get elements inside this function to ensure DOM is ready
  dropZone = document.getElementById('dropZone');
  fileInput = document.getElementById('fileInput');
  
  if (!dropZone || !fileInput) {
    console.error('Upload elements not found');
    return;
  }
  
  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.background = 'rgba(255,255,255,0.2)';
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.style.background = 'rgba(255,255,255,0.1)';
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.background = 'rgba(255,255,255,0.1)';
    const files = e.dataTransfer.files;
    if (files.length > 1) {
      showSingleFileModal();
      return;
    }
    if (files.length > 0) {
      fileInput.files = files;
      handleFileUpload();
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 1) {
      showSingleFileModal();
      fileInput.value = ''; // Reset file input
      return;
    }
    if (fileInput.files.length > 0) {
      handleFileUpload();
    }
  });

  // Prevent form submission
  document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();
  });
}

let uploadedFileName = '';

function formatFileSize(bytes) {
  if (bytes >= 1073741824) {
    return (bytes / 1073741824).toFixed(2) + ' GB';
  } else if (bytes >= 1048576) {
    return (bytes / 1048576).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return bytes + ' bytes';
  }
}

function handleFileUpload() {
  const file = fileInput.files[0];
  const fileSize = formatFileSize(file.size);
  
  // Show upload progress UI
  dropZone.innerHTML = `
    <div style="text-align: center; width: 100%; padding: 20px;">
      <i class="fa fa-cloud-upload" style="font-size: 40px; color: #0066CC; margin-bottom: 15px;"></i>
      <p style="margin: 10px 0; font-weight: 600; color: #333;">Uploading: ${file.name}</p>
      <p style="margin: 5px 0; font-size: 12px; color: #666;">Size: ${fileSize}</p>
      
      <!-- Progress Bar Container -->
      <div style="background: #e0e0e0; border-radius: 10px; height: 20px; width: 100%; margin: 15px 0; overflow: hidden;">
        <div id="uploadProgressBar" style="background: linear-gradient(90deg, #0066CC, #22b3c1); height: 100%; width: 0%; border-radius: 10px; transition: width 0.3s ease;"></div>
      </div>
      
      <!-- Progress Text -->
      <p id="uploadProgressText" style="margin: 5px 0; font-size: 14px; color: #0066CC; font-weight: 600;">0%</p>
      <p id="uploadSpeedText" style="margin: 5px 0; font-size: 11px; color: #888;"></p>
    </div>
  `;

  const formData = new FormData();
  formData.append('file', file);

  // Use XMLHttpRequest for progress tracking
  const xhr = new XMLHttpRequest();
  let startTime = Date.now();
  
  // Track upload progress
  xhr.upload.addEventListener('progress', function(e) {
    if (e.lengthComputable) {
      const percentComplete = Math.round((e.loaded / e.total) * 100);
      const progressBar = document.getElementById('uploadProgressBar');
      const progressText = document.getElementById('uploadProgressText');
      const speedText = document.getElementById('uploadSpeedText');
      
      if (progressBar) {
        progressBar.style.width = percentComplete + '%';
      }
      if (progressText) {
        progressText.textContent = percentComplete + '%';
      }
      
      // Calculate upload speed
      const elapsedTime = (Date.now() - startTime) / 1000; // seconds
      if (elapsedTime > 0 && speedText) {
        const uploadSpeed = e.loaded / elapsedTime;
        const remainingBytes = e.total - e.loaded;
        const remainingTime = remainingBytes / uploadSpeed;
        
        let speedDisplay = formatFileSize(uploadSpeed) + '/s';
        let timeDisplay = '';
        
        if (remainingTime < 60) {
          timeDisplay = Math.round(remainingTime) + ' detik tersisa';
        } else {
          timeDisplay = Math.round(remainingTime / 60) + ' menit tersisa';
        }
        
        speedText.textContent = speedDisplay + ' • ' + timeDisplay;
      }
    }
  });

  // Handle completion
  xhr.addEventListener('load', function() {
    if (xhr.status === 200) {
      try {
        const data = JSON.parse(xhr.responseText);
        if (data.status === 'success' || data.success) {
          uploadedFileName = data.data ? data.data.filename : data.filename;
          const predictBtn = document.getElementById('predictBtn');
          predictBtn.disabled = false;
          predictBtn.style.background = '#22b3c1';
          predictBtn.style.cursor = 'pointer';

          const fileSizeDisplay = data.data && data.data.size_mb ? `(${data.data.size_mb} MB)` : '';
          
          dropZone.innerHTML = `
            <div style="text-align: center;">
              <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #2ECC71, #27AE60); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4);">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <p style="margin: 10px 0; font-weight: 600; color: #2ECC71; font-size: 16px;">Upload Berhasil!</p>
              <p style="margin: 5px 0; font-size: 13px; color: #333;">${data.data ? data.data.original_name : data.filename} ${fileSizeDisplay}</p>
              <p style="margin: 10px 0; font-size: 12px; color: #666;">Klik "Analisis Medis" untuk memproses</p>
            </div>
          `;
        } else {
          showUploadError(data.message || 'Upload gagal');
        }
      } catch (e) {
        showUploadError('Invalid response from server');
      }
    } else {
      showUploadError('Server error: ' + xhr.status);
    }
  });

  // Handle errors
  xhr.addEventListener('error', function() {
    showUploadError('Network error - pastikan koneksi stabil');
  });

  xhr.addEventListener('abort', function() {
    showUploadError('Upload dibatalkan');
  });

  // Send request
  xhr.open('POST', '/upload', true);
  xhr.send(formData);
}

function showUploadError(message) {
  dropZone.innerHTML = `
    <div style="text-align: center;">
      <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #E74C3C, #C0392B); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
      <p style="margin: 10px 0; font-weight: 600; color: #E74C3C; font-size: 16px;">Upload Gagal</p>
      <p style="margin: 5px 0; font-size: 13px; color: #666;">${message}</p>
      <p style="margin: 10px 0; font-size: 12px; color: #888;">Klik di sini untuk coba lagi</p>
    </div>
  `;
}

// Prediction Functionality
function predictImage() {
  if (!uploadedFileName) {
    alert('Silakan upload file terlebih dahulu');
    return;
  }

  // Show loading screen
  showLoadingScreen();

  fetch(`/upload/predict?file_name=${uploadedFileName}`, {
      method: 'GET'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Predict response:', data);
      // Hide loading screen
      hideLoadingScreen();
      
      if (data.success) {
        const prediction = data.prediction;
        showResultPopup(prediction, null);
      } else {
        alert('Prediction failed: ' + (data.message || 'Unknown error'));
      }
    })
    .catch(error => {
      // Hide loading screen on error
      hideLoadingScreen();
      console.error('Prediction error:', error);
      alert('Error: ' + error.message);
    });
}

// Loading Screen Functions
function showLoadingScreen() {
  const loadingScreen = document.createElement('div');
  loadingScreen.id = 'loadingScreen';
  loadingScreen.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8); z-index: 2000; display: flex;
    align-items: center; justify-content: center;
  `;
  
  loadingScreen.innerHTML = `
    <div style="background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); padding: 40px; border-radius: 20px; text-align: center; border: 3px solid #0066CC; box-shadow: 0 10px 30px rgba(0, 102, 204, 0.3);">
      <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 20px;">
        <i class="fa fa-stethoscope" style="color: #0066CC; font-size: 24px;"></i>
        <h3 style="color: #0066CC; margin: 0;">🔬 Analisis BED File</h3>
        <i class="fa fa-heartbeat" style="color: #E74C3C; font-size: 24px;"></i>
      </div>
      <div style="margin: 30px 0;">
        <div style="width: 60px; height: 60px; border: 4px solid #f3f3f3; border-top: 4px solid #0066CC; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
        <p style="color: #0066CC; font-weight: 600; margin: 10px 0;">Memproses file BED...</p>
        <p style="color: #666; font-size: 14px; margin: 5px 0;">File BED besar membutuhkan waktu 1-2 menit</p>
      </div>
      <div style="background: #E3F2FD; padding: 15px; border-radius: 8px; border-left: 4px solid #0066CC;">
        <p style="color: #0066CC; font-size: 12px; margin: 0;">🧬 Mengekstrak DMR regions dari data methylation Nanopore</p>
      </div>
    </div>
  `;
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(loadingScreen);
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.remove();
  }
}

function showResultPopup(prediction, imagePath) {
  const popup = document.createElement('div');
  popup.id = 'resultPopup';
  popup.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
    background: rgba(0,0,0,0.8); z-index: 1000; display: flex; 
    align-items: center; justify-content: center;
  `;

  popup.innerHTML = `
    <div style="background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); padding: 35px; border-radius: 20px; max-width: 550px; text-align: center; position: relative; border: 3px solid #0066CC; box-shadow: 0 10px 30px rgba(0, 102, 204, 0.3);">
      <button onclick="closeResultPopup()" style="position: absolute; top: 15px; right: 20px; background: none; border: none; font-size: 28px; cursor: pointer; color: #E74C3C;">&times;</button>
      <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 20px;">
        <i class="fa fa-stethoscope" style="color: #0066CC; font-size: 24px;"></i>
        <h3 style="color: #0066CC; margin: 0;">📋 Laporan Diagnostik AI</h3>
        <i class="fa fa-heartbeat" style="color: #E74C3C; font-size: 24px;"></i>
      </div>
      <div style="background: #E3F2FD; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #0066CC;">
        <div style="color: #0066CC; font-size: 16px; line-height: 1.6; font-weight: 500;">${prediction}</div>
      </div>
      <div style="background: #FFF3CD; padding: 10px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #FFC107;">
        <p style="color: #856404; font-size: 12px; margin: 0;">⚠️ <strong>Catatan Medis:</strong> Hasil ini merupakan skrining awal. Diperlukan evaluasi lanjutan oleh tenaga medis profesional.</p>
      </div>
      <button onclick="closeResultPopup()" style="background: linear-gradient(135deg, #0066CC 0%, #17A2B8 100%); color: white; padding: 12px 30px; border: 2px solid white; border-radius: 25px; margin-top: 10px; cursor: pointer; font-weight: 600; box-shadow: 0 4px 15px rgba(0, 102, 204, 0.3);">📄 Tutup Laporan</button>
    </div>
  `;

  // Add ESC key event listener
  function handleEscKey(event) {
    if (event.key === 'Escape') {
      closeResultPopup();
    }
  }
  
  document.addEventListener('keydown', handleEscKey);
  popup.addEventListener('remove', () => {
    document.removeEventListener('keydown', handleEscKey);
  });

  document.body.appendChild(popup);
}

function closeResultPopup() {
  const popup = document.getElementById('resultPopup');
  if (popup) {
    popup.remove();
  }
}

function showSingleFileModal() {
  const modal = document.createElement('div');
  modal.id = 'singleFileModal';
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
    background: rgba(0,0,0,0.8); z-index: 1000; display: flex; 
    align-items: center; justify-content: center;
  `;

  modal.innerHTML = `
    <div style="background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); padding: 35px; border-radius: 20px; max-width: 450px; text-align: center; position: relative; border: 3px solid #E74C3C; box-shadow: 0 10px 30px rgba(231, 76, 60, 0.3);">
      <button onclick="closeSingleFileModal()" style="position: absolute; top: 15px; right: 20px; background: none; border: none; font-size: 28px; cursor: pointer; color: #E74C3C;">&times;</button>
      <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 20px;">
        <i class="fa fa-exclamation-triangle" style="color: #E74C3C; font-size: 24px;"></i>
        <h3 style="color: #E74C3C; margin: 0;">⚠️ Upload Terbatas</h3>
        <i class="fa fa-file-o" style="color: #E74C3C; font-size: 24px;"></i>
      </div>
      <div style="background: #FFEBEE; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #E74C3C;">
        <div style="color: #C62828; font-size: 16px; line-height: 1.6; font-weight: 500;">
          Hanya Bisa Single File<br>
          <span style="font-size: 14px; font-weight: normal;">Sistem hanya mendukung upload satu file .bed per analisis</span>
        </div>
      </div>
      <div style="background: #FFF3CD; padding: 10px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #FFC107;">
        <p style="color: #856404; font-size: 12px; margin: 0;">💡 <strong>Tips:</strong> Pilih satu file .bed untuk analisis genomik yang optimal.</p>
      </div>
      <button onclick="closeSingleFileModal()" style="background: linear-gradient(135deg, #E74C3C 0%, #C62828 100%); color: white; padding: 12px 30px; border: 2px solid white; border-radius: 25px; margin-top: 10px; cursor: pointer; font-weight: 600; box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);">📄 Mengerti</button>
    </div>
  `;

  // Add ESC key event listener
  function handleEscKey(event) {
    if (event.key === 'Escape') {
      closeSingleFileModal();
    }
  }
  
  document.addEventListener('keydown', handleEscKey);
  modal.addEventListener('remove', () => {
    document.removeEventListener('keydown', handleEscKey);
  });

  document.body.appendChild(modal);
}

function closeSingleFileModal() {
  const modal = document.getElementById('singleFileModal');
  if (modal) {
    modal.remove();
  }
}

// Team Carousel Functionality
let slideIndex = 1;
let isMobile = window.innerWidth <= 768;
let totalSlides = 2;

const teamMembers = [
  { initials: 'S', name: 'Sultana', role: 'Ketua Pengusul', org: 'Universitas YARSI', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { initials: 'AH', name: 'Ahmad Rusdan Handoyo Utomo', role: 'Anggota', org: 'Universitas YARSI', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { initials: 'CP', name: 'Chandra Prasetyo Utomo', role: 'Anggota', org: 'Universitas YARSI', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { initials: 'KP', name: 'Kinasih Prayuni', role: 'Anggota', org: 'Universitas YARSI', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { initials: 'SP', name: 'Susanti PhD', role: 'Anggota', org: 'Pathgen', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }
];

function initializeTeamCarousel() {
  const slides = document.getElementById('teamSlides');
  if (!slides) return; // Exit if no carousel found
  
  const dots = document.querySelectorAll('.dot');

  function reorganizeForMobile() {
    if (isMobile) {
      const teamSlides = document.querySelectorAll('.team-slide');
      teamSlides.forEach(slide => slide.style.display = 'none');

      const slidesContainer = document.getElementById('teamSlides');
      slidesContainer.innerHTML = '';

      const totalMobileSlides = Math.ceil(teamMembers.length / 2);
      for (let i = 0; i < totalMobileSlides; i++) {
        const slide = document.createElement('div');
        slide.className = 'team-slide mobile-slide';
        slide.style.cssText = 'min-width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;';

        const membersInSlide = Math.min(2, teamMembers.length - (i * 2));

        for (let j = 0; j < membersInSlide; j++) {
          const memberIndex = i * 2 + j;
          if (memberIndex < teamMembers.length) {
            const member = teamMembers[memberIndex];
            const memberDiv = document.createElement('div');
            memberDiv.style.cssText = 'width: 100%; text-align: center;';
            memberDiv.innerHTML = `
              <div class="team-member" style="text-align: center;">
                <div style="width: 120px; height: 120px; border-radius: 50%; background: ${member.gradient}; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 36px; font-weight: bold;">${member.initials}</div>
                <h4 style="color: white; margin-bottom: 8px; font-size: 16px; line-height: 1.2;">${member.name}</h4>
                <p style="color: #ccc; margin-bottom: 5px; font-size: 14px;">${member.role}</p>
                <p style="color: #aaa; font-size: 12px;">${member.org}</p>
              </div>
            `;
            slide.appendChild(memberDiv);
          }
        }

        slidesContainer.appendChild(slide);
      }
      totalSlides = totalMobileSlides;
    } else {
      const teamSlides = document.querySelectorAll('.team-slide:not(.mobile-slide)');
      teamSlides.forEach(slide => slide.style.display = 'flex');
      const mobileSlides = document.querySelectorAll('.mobile-slide');
      mobileSlides.forEach(slide => slide.remove());
      totalSlides = 2;
    }
  }

  function showSlide(n) {
    if (n > totalSlides) slideIndex = 1;
    if (n < 1) slideIndex = totalSlides;

    slides.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;

    dots.forEach(dot => dot.style.backgroundColor = '#bbb');
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].style.backgroundColor = '#22b3c1';
    }
  }

  window.currentSlide = function(n) {
    slideIndex = n;
    showSlide(slideIndex);
  };

  window.nextSlide = function() {
    slideIndex++;
    showSlide(slideIndex);
  };

  window.prevSlide = function() {
    slideIndex--;
    showSlide(slideIndex);
  };

  // Update on window resize
  window.addEventListener('resize', function () {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
      isMobile = newIsMobile;
      slideIndex = 1;
      reorganizeForMobile();
      showSlide(slideIndex);
    }
  });

  // Auto slide every 4 seconds
  setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
  }, 4000);

  // Initialize
  reorganizeForMobile();
  showSlide(slideIndex);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize file upload
  initializeFileUpload();
  
  // Always initialize team carousel
  initializeTeamCarousel();
});

// Make predictImage available globally
window.predictImage = predictImage;