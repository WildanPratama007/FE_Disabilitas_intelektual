// ML Disability Detection App JavaScript

// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');

// File Upload Functionality
function initializeFileUpload() {
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
    if (files.length > 0) {
      fileInput.files = files;
      handleFileUpload();
    }
  });

  fileInput.addEventListener('change', () => {
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

function handleFileUpload() {
  dropZone.innerHTML = `
    <div style="text-align: center;">
      <i class="fa fa-spinner fa-spin" style="font-size:24px;color:#22b3c1;border:2px solid #22b3c1;border-radius:50%;width:60px;height:60px;display:flex;align-items:center;justify-content:center;"></i>
      <p style="margin: 10px 0;">Uploading: ${fileInput.files[0].name}</p>
    </div>
  `;

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success' || data.success) {
        uploadedFileName = data.data ? data.data.filename : data.filename;
        const predictBtn = document.getElementById('predictBtn');
        predictBtn.disabled = false;
        predictBtn.style.background = '#22b3c1';
        predictBtn.style.cursor = 'pointer';

        dropZone.innerHTML = `
          <div style="text-align: center;">
            <i class="fa fa-check-circle" style="font-size: 32px; margin-bottom: 10px; color: #2ECC71;"></i>
            <p style="margin: 10px 0;">📋 Data medis berhasil diupload: ${data.data ? data.data.original_name : data.filename}</p>
            <p style="margin: 5px 0; font-size: 12px; color: #4c4f51ff;">✅ Siap untuk analisis klinis</p>
          </div>
        `;
      } else {
        dropZone.innerHTML = `
          <div style="text-align: center;">
            <i class="fa fa-times-circle" style="font-size: 32px; margin-bottom: 10px; color: #dc3545;"></i>
            <p style="margin: 10px 0;">Upload gagal: ${data.message}</p>
          </div>
        `;
      }
    })
    .catch(error => {
      dropZone.innerHTML = `
        <div style="text-align: center;">
          <i class="fa fa-times-circle" style="font-size: 32px; margin-bottom: 10px; color: #dc3545;"></i>
          <p style="margin: 10px 0;">Error: ${error}</p>
        </div>
      `;
    });
}

// Prediction Functionality
let isPopupOpen = false;

function predictImage() {
  if (!uploadedFileName) {
    alert('Silakan upload file terlebih dahulu');
    return;
  }

  if (isPopupOpen) {
    return; // Prevent multiple popups
  }

  // Show loading screen
  showLoadingScreen();

  fetch(`/upload/predict?file_name=${uploadedFileName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Predict response:', data);
      // Hide loading screen
      hideLoadingScreen();
      const prediction = data.data ? data.data.prediction : data.prediction;
      const imagePath = data.data ? data.data.image_path : data.image_path;
      showResultPopup(prediction, imagePath);
    })
    .catch(error => {
      // Hide loading screen on error
      hideLoadingScreen();
      alert('Error: ' + error);
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
        <h3 style="color: #0066CC; margin: 0;">🔬 Analisis Medis</h3>
        <i class="fa fa-heartbeat" style="color: #E74C3C; font-size: 24px;"></i>
      </div>
      <div style="margin: 30px 0;">
        <div style="width: 60px; height: 60px; border: 4px solid #f3f3f3; border-top: 4px solid #0066CC; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
        <p style="color: #0066CC; font-weight: 600; margin: 10px 0;">Sedang menganalisis data medis...</p>
        <p style="color: #666; font-size: 14px; margin: 5px 0;">Mohon tunggu, proses ini memerlukan waktu beberapa detik</p>
      </div>
      <div style="background: #E3F2FD; padding: 15px; border-radius: 8px; border-left: 4px solid #0066CC;">
        <p style="color: #0066CC; font-size: 12px; margin: 0;">🤖 AI sedang memproses data genomik untuk deteksi disabilitas intelektual</p>
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
  if (isPopupOpen) {
    return; // Prevent multiple popups
  }
  
  isPopupOpen = true;
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
    isPopupOpen = false; // Reset flag
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
  // Only initialize file upload if elements exist
  if (dropZone && fileInput) {
    initializeFileUpload();
  }
  
  // Always initialize team carousel
  initializeTeamCarousel();
});

// Make predictImage available globally
window.predictImage = predictImage;