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
      if (data.success) {
        uploadedFileName = data.filename;
        const predictBtn = document.getElementById('predictBtn');
        predictBtn.disabled = false;
        predictBtn.style.background = '#22b3c1';
        predictBtn.style.cursor = 'pointer';

        dropZone.innerHTML = `
          <div style="text-align: center;">
            <i class="fa fa-check-circle" style="font-size: 32px; margin-bottom: 10px; color: #4CAF50;"></i>
            <p style="margin: 10px 0;">File berhasil diupload: ${data.filename}</p>
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
function predictImage() {
  if (!uploadedFileName) {
    alert('Silakan upload file terlebih dahulu');
    return;
  }

  fetch('/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename: uploadedFileName
      })
    })
    .then(response => response.json())
    .then(data => {
      showResultPopup(data.prediction, data.image_path);
    })
    .catch(error => {
      alert('Error: ' + error);
    });
}

function showResultPopup(prediction, imagePath) {
  const popup = document.createElement('div');
  popup.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
    background: rgba(0,0,0,0.8); z-index: 1000; display: flex; 
    align-items: center; justify-content: center;
  `;

  popup.innerHTML = `
    <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; text-align: center; position: relative;">
      <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
      <h3 style="color: #333; margin-bottom: 20px;">Hasil Analisis Data CSV</h3>
      <div style="color: #333; font-size: 16px; line-height: 1.5;">${prediction}</div>
      <button onclick="this.parentElement.parentElement.remove()" style="background: #22b3c1; color: white; padding: 10px 25px; border: none; border-radius: 25px; margin-top: 20px; cursor: pointer;">Tutup</button>
    </div>
  `;

  document.body.appendChild(popup);
}

// Team Carousel Functionality
let slideIndex = 1;
let isMobile = window.innerWidth <= 768;
let totalSlides = isMobile ? Math.ceil(9 / 2) : 3;

const teamMembers = [
  { initials: 'CP', name: 'Chandra Prasteyo Utomo', role: 'Lead AI Researcher', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { initials: 'UA', name: 'Ummi Azizah Rachmawati', role: 'UI/UX', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { initials: 'MF', name: 'Muhamad Fathurahman', role: 'Software Developer', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { initials: 'SC', name: 'Sri Chusri Haryanti', role: 'UI/UX Designer', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { initials: 'IP', name: 'Ibu Puspa', role: 'Data Scientist', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { initials: 'AH', name: 'Alim El Hakim', role: 'Backend Developer', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { initials: 'NI', name: 'Nashuha Insani', role: 'AI Engineer', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
  { initials: 'MW', name: 'Muhammad Wildan Pratama', role: 'FrontEnd Developer', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { initials: 'MM', name: 'Mufid Farhan Muhana', role: 'BackEnd Developer', gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)' }
];

function initializeTeamCarousel() {
  const slides = document.getElementById('teamSlides');
  const dots = document.querySelectorAll('.dot');

  function reorganizeForMobile() {
    if (isMobile) {
      const teamSlides = document.querySelectorAll('.team-slide');
      teamSlides.forEach(slide => slide.style.display = 'none');

      const slidesContainer = document.getElementById('teamSlides');
      slidesContainer.innerHTML = '';

      const totalSlides = Math.ceil(teamMembers.length / 2);
      for (let i = 0; i < totalSlides; i++) {
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
              </div>
            `;
            slide.appendChild(memberDiv);
          }
        }

        slidesContainer.appendChild(slide);
      }
    } else {
      const teamSlides = document.querySelectorAll('.team-slide:not(.mobile-slide)');
      teamSlides.forEach(slide => slide.style.display = 'flex');
      const mobileSlides = document.querySelectorAll('.mobile-slide');
      mobileSlides.forEach(slide => slide.remove());
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
      totalSlides = isMobile ? Math.ceil(9 / 2) : 3;
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
  initializeFileUpload();
  initializeTeamCarousel();
});

// Make predictImage available globally
window.predictImage = predictImage;