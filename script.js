// Script sederhana untuk Dummy Landing Page Template

document.addEventListener('DOMContentLoaded', function () {
  // 1. Toggle Menu Navigasi di Mobile
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });

    // Tutup menu saat salah satu link diklik
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Handler Form Kontak (Dummy Submit)
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Mencegah reload halaman

      // Tampilkan notifikasi sukses dummy
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
      }

      // Reset input form
      contactForm.reset();

      // Sembunyikan notifikasi setelah 4 detik
      setTimeout(function () {
        if (formSuccess) {
          formSuccess.classList.add('hidden');
        }
      }, 4000);
    });
  }
});
