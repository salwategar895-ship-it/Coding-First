/**
 * ==========================================================================
 * CODING FIRST - JAVASCRIPT UTAMA
 * Interaktivitas, Integrasi WhatsApp/Email, Filter Galeri, Lightbox & Validasi
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Nomor WhatsApp Admin Resmi Coding First (Format Internasional tanpa tanda +)
  const ADMIN_WHATSAPP_NUMBER = '6281234567890';
  const ADMIN_EMAIL = 'info@codingfirst.id';

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

    // Menutup menu saat salah satu link navigasi diklik
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Menutup menu jika klik di luar area navbar
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
   * 3. ScrollSpy Navigasi Aktif (Highlight Link Saat Scroll)
   * ----------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollPosition = window.pageYOffset + 120;

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
   * 4. Galeri Filter Interaktif (Semua, Coding, Robotika, IoT)
   * ----------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Perbarui status aktif tombol
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedFilter = btn.getAttribute('data-filter');

      galleryCards.forEach(function (card) {
        const category = card.getAttribute('data-category');

        if (selectedFilter === 'all' || category === selectedFilter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
   * 5. Lightbox Modal Preview Foto Galeri
   * ----------------------------------------------------------------------- */
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  window.openLightbox = function (element) {
    const imgSrc = element.getAttribute('data-src');
    const imgCaption = element.getAttribute('data-caption');

    if (lightboxModal && lightboxImg) {
      lightboxImg.src = imgSrc;
      lightboxCaption.textContent = imgCaption || 'Dokumentasi Kegiatan Coding First';
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Kunci scroll halaman belakang
    }
  };

  window.closeLightbox = function (event) {
    if (event) {
      // Tutup jika mengklik latar belakang atau tombol close
      const isBackdrop = event.target === lightboxModal;
      const isCloseBtn = event.target.classList.contains('lightbox-close');
      if (!isBackdrop && !isCloseBtn) return;
    }

    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = ''; // Pulihkan scroll
      if (lightboxImg) lightboxImg.src = '';
    }
  };

  // Tutup lightbox dengan tombol keyboard Escape (ESC)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      window.closeLightbox();
    }
  });

  /* --------------------------------------------------------------------------
   * 6. Form Pendaftaran Free Trial Online (Integrasi WhatsApp & Email)
   * ----------------------------------------------------------------------- */
  const freeTrialForm = document.getElementById('freeTrialForm');
  const trialAlertSuccess = document.getElementById('trialAlertSuccess');
  const btnSubmitEmail = document.getElementById('btnSubmitEmail');

  function getFormData() {
    return {
      studentName: document.getElementById('studentName').value.trim(),
      studentAge: document.getElementById('studentAge').value.trim(),
      parentName: document.getElementById('parentName').value.trim(),
      whatsappNumber: document.getElementById('whatsappNumber').value.trim(),
      programInterest: document.getElementById('programInterest').value,
      classMode: document.getElementById('classMode').value,
      preferredSchedule: document.getElementById('preferredSchedule').value,
      notes: document.getElementById('notes').value.trim() || 'Tidak ada'
    };
  }

  function validateTrialForm(data) {
    if (!data.studentName) {
      alert('Mohon masukkan nama lengkap anak Anda.');
      return false;
    }
    if (!data.studentAge) {
      alert('Mohon masukkan usia atau kelas sekolah anak.');
      return false;
    }
    if (!data.parentName) {
      alert('Mohon masukkan nama orang tua / wali.');
      return false;
    }
    if (!data.whatsappNumber) {
      alert('Mohon masukkan nomor WhatsApp aktif yang bisa dihubungi.');
      return false;
    }
    if (!data.programInterest) {
      alert('Mohon pilih program kursus yang diminati.');
      return false;
    }
    return true;
  }

  // A. Submit Form Free Trial via WhatsApp
  if (freeTrialForm) {
    freeTrialForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const data = getFormData();
      if (!validateTrialForm(data)) return;

      // Susun pesan terstruktur rapi untuk WhatsApp
      const waMessage = 
`*PENDAFTARAN FREE TRIAL - CODING FIRST*
Halo Admin Coding First, saya ingin mendaftarkan anak saya untuk sesi Free Trial 60 Menit:

👤 *Nama Siswa:* ${data.studentName}
🎂 *Usia / Kelas:* ${data.studentAge}
👨‍👩‍👧 *Nama Orang Tua/Wali:* ${data.parentName}
📱 *No. WhatsApp:* ${data.whatsappNumber}
🚀 *Program Pilihan:* ${data.programInterest}
🏫 *Metode Kelas:* ${data.classMode}
⏰ *Pilihan Waktu:* ${data.preferredSchedule}
📝 *Catatan / Pengalaman:* ${data.notes}

Mohon informasi ketersediaan slot kelas terdekat. Terima kasih!`;

      const encodedMessage = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodedMessage}`;

      // Buka link WhatsApp API
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // Tampilkan notifikasi sukses di halaman
      if (trialAlertSuccess) {
        trialAlertSuccess.classList.remove('hidden');
        trialAlertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Reset form setelah 2 detik
      setTimeout(function () {
        freeTrialForm.reset();
      }, 2000);
    });
  }

  // B. Submit Form Free Trial via Email Alternatif
  if (btnSubmitEmail) {
    btnSubmitEmail.addEventListener('click', function () {
      const data = getFormData();
      if (!validateTrialForm(data)) return;

      const emailSubject = encodeURIComponent(`Pendaftaran Free Trial Coding First - ${data.studentName}`);
      const emailBody = encodeURIComponent(
`Halo Tim Coding First,

Berikut adalah data pendaftaran Free Trial putra/putri saya:
- Nama Siswa: ${data.studentName}
- Usia / Kelas: ${data.studentAge}
- Nama Orang Tua: ${data.parentName}
- No. WhatsApp: ${data.whatsappNumber}
- Program Diminati: ${data.programInterest}
- Metode Kelas: ${data.classMode}
- Pilihan Jadwal: ${data.preferredSchedule}
- Catatan Tambahan: ${data.notes}

Mohon konfirmasi jadwal Free Trial berikutnya.

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
   * 7. Form Kontak Cepat (General Contact Form)
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

      // Buat tautan WhatsApp cepat dari pesan kontak umum
      const waText = 
`*PESAN PERTANYAAN WEBSITE CODING FIRST*
- *Nama:* ${name}
- *Email:* ${email}
- *No. HP/WA:* ${phone}
- *Isi Pesan:*
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
      }, 6000);
    });
  }

  /* --------------------------------------------------------------------------
   * 8. FAQ Accordion (Tanya Jawab Interaktif)
   * ----------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        // Opsional: Tutup item lain saat satu item dibuka
        faqItems.forEach((other) => {
          if (other !== item) other.classList.remove('active');
        });

        if (!isActive) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });

});
