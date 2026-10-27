/**
 * ==========================================================================
 * CODING FIRST PURWOKERTO - OFFICIAL JAVASCRIPT
 * "Your Future Education" | "Learning Today, Creating Tomorrow"
 * Integrasi WhatsApp, Email, Navigasi Mobile, Filter Program & ScrollSpy
 * ==========================================================================
 */

/**
 * Global helper: Dipanggil oleh tombol "Coba Free Trial Kelas Ini" pada setiap kartu program
 * Mengisi dropdown pilihan kursus secara otomatis dan scroll halus ke formulir pendaftaran
 */
window.selectTrialProgram = function (programIdentifier) {
  const selectElem = document.getElementById('programInterest');
  const trialSection = document.getElementById('trial');

  if (selectElem && programIdentifier) {
    const cleanId = String(programIdentifier).toLowerCase();

    // Cek kecocokan keyword utama: coding, robotik, calistung, english, microsoft, jurnalistik
    const keywords = ['coding', 'robotik', 'calistung', 'english', 'microsoft', 'jurnalistik'];
    let targetKeyword = '';
    for (let i = 0; i < keywords.length; i++) {
      if (cleanId.includes(keywords[i])) {
        targetKeyword = keywords[i];
        break;
      }
    }

    for (let i = 0; i < selectElem.options.length; i++) {
      const optVal = selectElem.options[i].value.toLowerCase();
      if ((targetKeyword && optVal.includes(targetKeyword)) || optVal.includes(cleanId)) {
        selectElem.selectedIndex = i;
        break;
      }
    }

    // Feedback visual transisi warna oranye energi
    selectElem.style.transition = 'all 0.3s ease';
    selectElem.style.borderColor = '#FF6B00';
    selectElem.style.boxShadow = '0 0 0 4px rgba(255, 107, 0, 0.28)';
    setTimeout(function () {
      selectElem.style.borderColor = '';
      selectElem.style.boxShadow = '';
    }, 2400);
  }

  if (trialSection) {
    trialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const studentNameInput = document.getElementById('studentName');
    if (studentNameInput) {
      setTimeout(function () {
        studentNameInput.focus();
      }, 500);
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Kontak Resmi Coding First Purwokerto
  const ADMIN_WHATSAPP_NUMBER = '6287769678988'; // 0877-6967-8988
  const ADMIN_EMAIL = 'codingfirst.id@gmail.com';

  /* --------------------------------------------------------------------------
   * 1. Navigasi Mobile (Hamburger Toggle & Auto-Close)
   * ----------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (event) {
      if (!navbar.contains(event.target)) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 2. Sticky Navbar Shadow Effect on Scroll
   * ----------------------------------------------------------------------- */
  window.addEventListener('scroll', function () {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* --------------------------------------------------------------------------
   * 3. ScrollSpy Navigasi Aktif
   * ----------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollPosition = window.pageYOffset + 130;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach((link) => link.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  /* --------------------------------------------------------------------------
   * 4. Filter Kategori Program Kursus (Semua, Teknologi, Bahasa, Calistung)
   * ----------------------------------------------------------------------- */
  const progFilterBtns = document.querySelectorAll('.prog-filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  if (progFilterBtns.length > 0 && courseCards.length > 0) {
    progFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const category = btn.getAttribute('data-category');

        progFilterBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');

        courseCards.forEach(function (card) {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 5. Form Pendaftaran Free Trial Online (WhatsApp & Email Integrasi)
   * ----------------------------------------------------------------------- */
  const freeTrialForm = document.getElementById('freeTrialForm');
  const trialAlertSuccess = document.getElementById('trialAlertSuccess');
  const btnSubmitEmail = document.getElementById('btnSubmitEmail');

  function getTrialData() {
    return {
      studentName: document.getElementById('studentName').value.trim(),
      studentAge: document.getElementById('studentAge').value.trim(),
      parentName: document.getElementById('parentName').value.trim(),
      whatsappNumber: document.getElementById('whatsappNumber').value.trim(),
      programInterest: document.getElementById('programInterest').value,
      classMode: document.getElementById('classMode').value,
      preferredSchedule: document.getElementById('preferredSchedule').value,
      notes: document.getElementById('notes').value.trim() || 'Tidak ada catatan khusus'
    };
  }

  function validateTrialData(data) {
    if (!data.studentName) {
      alert('Mohon masukkan nama lengkap anak.');
      return false;
    }
    if (!data.studentAge) {
      alert('Mohon masukkan usia / kelas sekolah anak.');
      return false;
    }
    if (!data.parentName) {
      alert('Mohon masukkan nama orang tua / wali.');
      return false;
    }
    if (!data.whatsappNumber) {
      alert('Mohon masukkan nomor WhatsApp aktif yang dapat dihubungi.');
      return false;
    }
    if (!data.programInterest) {
      alert('Mohon pilih salah satu program pembelajaran yang diminati.');
      return false;
    }
    return true;
  }

  // A. Submit via WhatsApp API
  if (freeTrialForm) {
    freeTrialForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = getTrialData();
      if (!validateTrialData(data)) return;

      const waMessage = 
`*PENDAFTARAN FREE TRIAL - CODING FIRST PURWOKERTO*
_Your Future Education_

Halo Admin Coding First Purwokerto, saya ingin mendaftarkan putra/putri saya untuk sesi Free Trial 60 Menit:

👤 *Nama Siswa:* ${data.studentName}
🎂 *Usia / Kelas:* ${data.studentAge}
👨‍👩‍👧 *Nama Orang Tua/Wali:* ${data.parentName}
📱 *No. WhatsApp:* ${data.whatsappNumber}
🚀 *Program Pilihan:* ${data.programInterest}
🏫 *Format Kelas:* ${data.classMode}
⏰ *Pilihan Waktu:* ${data.preferredSchedule}
📝 *Catatan Tambahan:* ${data.notes}

Mohon konfirmasi jadwal dan ketersediaan slot kelas terdekat. Terima kasih!`;

      const encodedMessage = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodedMessage}`;

      window.open(waUrl, '_blank', 'noopener,noreferrer');

      if (trialAlertSuccess) {
        trialAlertSuccess.classList.remove('hidden');
        trialAlertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      setTimeout(function () {
        freeTrialForm.reset();
      }, 2500);
    });
  }

  // B. Submit via Email Cadangan
  if (btnSubmitEmail) {
    btnSubmitEmail.addEventListener('click', function () {
      const data = getTrialData();
      if (!validateTrialData(data)) return;

      const emailSubject = encodeURIComponent(`Pendaftaran Free Trial Coding First Purwokerto - ${data.studentName}`);
      const emailBody = encodeURIComponent(
`Halo Tim Coding First Purwokerto,

Saya bermaksud mendaftarkan putra/putri saya untuk sesi Free Trial:
- Nama Siswa: ${data.studentName}
- Usia / Kelas: ${data.studentAge}
- Nama Orang Tua: ${data.parentName}
- No. WhatsApp: ${data.whatsappNumber}
- Program Pilihan: ${data.programInterest}
- Format Kelas: ${data.classMode}
- Pilihan Waktu: ${data.preferredSchedule}
- Catatan Khusus: ${data.notes}

Mohon konfirmasi jadwal kelas terdekat.

Salam hangat,
${data.parentName}`
      );

      const mailtoUrl = `mailto:${ADMIN_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
      window.location.href = mailtoUrl;

      if (trialAlertSuccess) {
        trialAlertSuccess.classList.remove('hidden');
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 6. Form Kontak Cepat (General Contact Form)
   * ----------------------------------------------------------------------- */
  const generalContactForm = document.getElementById('generalContactForm');
  const generalContactSuccess = document.getElementById('generalContactSuccess');

  if (generalContactForm) {
    generalContactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contactFullName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      const waText = 
`*PESAN / KEMITRAAN - CODING FIRST PURWOKERTO*
- *Nama:* ${name}
- *Email:* ${email}
- *No. WhatsApp:* ${phone}
- *Isi Pesan / Kolaborasi:*
${message}`;

      const waUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      if (generalContactSuccess) {
        generalContactSuccess.classList.remove('hidden');
      }

      generalContactForm.reset();

      setTimeout(function () {
        if (generalContactSuccess) {
          generalContactSuccess.classList.add('hidden');
        }
      }, 5000);
    });
  }

});
