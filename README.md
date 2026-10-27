# Coding First - Official Website & Academy Landing Page

Website resmi dan portal pendaftaran akademi edukasi teknologi **Coding First**, spesialis kursus **Coding, Robotika, dan Internet of Things (IoT)** untuk anak & remaja (usia 6–18 tahun).

---

## 🚀 Fitur Utama & Key Deliverables

1. **Website Live & Responsive:** 
   - Dirancang dengan layout mobile-friendly (optimal di smartphone, tablet, laptop, dan desktop monitor lebar).
   - Zero-dependency framework (Vanilla HTML5, CSS3 kustom & JavaScript modern), memuat dalam sekejap tanpa bundler yang rumit.
2. **Profil Perusahaan & Visi-Misi:**
   - Latar belakang Coding First dalam membentuk nalar komputasional (*computational thinking*).
   - Kartu inspiratif Visi & Misi 4 pilar serta Core Values (*Creative Exploration, Logical Reasoning, Hands-on Engineering, Future-Ready*).
3. **Kurikulum Berjenjang & Paket Biaya Transparan:**
   - Pembagian level belajar: *Little Coder (6-8 tahun)*, *Junior Dev (9-13 tahun)*, *Robotics & IoT Inventor (10-18 tahun)*.
   - 4-Tahap Roadmap Belajar (*Foundation &rarr; Application &rarr; Creation &rarr; Exhibition*).
   - *Pricing cards* komparatif: **Paket Starter**, **Paket Innovator Pro (Terpopuler)**, dan **Paket Private 1-on-1** lengkap dengan garansi kepuasan.
4. **Galeri & Dokumentasi Kegiatan Modular:**
   - Portofolio foto kegiatan anak saat merakit robot, coding Scratch, IoT smart home, dan workshop.
   - Filter tab kategori interaktif: *Semua Foto*, *Coding & Game*, *Robotika*, dan *IoT & Workshop*.
   - Fitur modal perbesar foto (*Lightbox Preview*) saat gambar diklik.
5. **Form Pendaftaran Free Trial Online:**
   - Formulir interaktif untuk calon siswa / orang tua memesan 1 sesi Free Trial (60 menit gratis).
   - Integrasi langsung ke WhatsApp Admin (`https://wa.me/...`) dengan pesan terformat otomatis, serta tombol cadangan via Email (`mailto:...`).
6. **Floating WhatsApp Widget:**
   - Tombol mengambang di pojok kanan bawah dengan *tooltip* interaktif untuk konsultasi kilat 24/7.
7. **SEO & Performa:**
   - Meta tag lengkap (Deskripsi, Kata Kunci, Open Graph Facebook/WhatsApp, Twitter Card, Favicon SVG).

---

## 🎨 Panduan Warna & Design System (Sesuai Ketentuan)

| Elemen / Kategori | Nilai Hex | Penggunaan di Website |
| :--- | :--- | :--- |
| **Primary & Action Blue** | `#0056FF` / `#0044CC` | Tombol CTA utama, badge aktif, aksen logo, fokus formulir, border paket populer |
| **Secondary / WhatsApp Green** | `#25D366` / `#10B981` | Tombol WhatsApp direct, tombol submit pendaftaran, ikon badge sukses, pulse live |
| **Background & Surface** | `#FFFFFF` / `#F8FAFC` / `#F3F4F6` | Latar belakang section bergantian, card container, backdrop form |
| **Text & Heading** | `#111827` / `#1F2937` | Heading, judul kurikulum, paragraf isi, dan label formulir berkontras tinggi |

---

## 📁 Struktur Berkas

```
Coding-First/
├── index.html        # Struktur semantik HTML5, meta tags SEO, dan seluruh section
├── style.css         # Styling kustom terstruktur, CSS variables, animasi, responsif mobile
├── script.js         # Navigasi mobile, filter galeri, modal lightbox, WhatsApp form builder
└── README.md         # Dokumentasi resmi dan petunjuk pembaruan
```

---

## 🛠️ Cara Mengubah Nomor WhatsApp Admin

Jika nomor WhatsApp resmi Coding First ingin diganti:
1. Buka berkas [script.js](file:///d:/Project/Coding-First/script.js).
2. Temukan baris ke-12:
   ```javascript
   const ADMIN_WHATSAPP_NUMBER = '6281234567890';
   const ADMIN_EMAIL = 'info@codingfirst.id';
   ```
3. Ganti `'6281234567890'` dengan nomor WhatsApp baru Anda (gunakan format kode negara tanpa simbol `+`, contoh `6281299998888`).
4. Pada [index.html](file:///d:/Project/Coding-First/index.html), ubah tautan `wa.me/6281234567890` pada tombol header atau kontak langsung sesuai kebutuhan.

---

## 📷 Cara Menambah atau Mengubah Foto di Galeri

Struktur galeri dibuat **sangat modular**. Untuk menambahkan foto baru:
1. Buka [index.html](file:///d:/Project/Coding-First/index.html) pada bagian `<!-- Gallery Grid Modular -->`.
2. Gandakan elemen `<article>` berikut dan sesuaikan data:
   ```html
   <article class="gallery-card" data-category="robotics">
     <div class="gallery-thumb" onclick="openLightbox(this)" 
          data-src="URL_FOTO_BESAR_ANDA" 
          data-caption="Deskripsi kegiatan saat tampil di modal">
       <img src="URL_FOTO_THUMBNAIL" alt="Deskripsi Foto" loading="lazy">
       <div class="gallery-overlay">
         <span class="zoom-icon">🔍 Klik Perbesar</span>
       </div>
     </div>
     <div class="gallery-info">
       <span class="gallery-tag">Robotika</span>
       <h4>Judul Kegiatan</h4>
       <p>Deskripsi singkat kegiatan anak-anak.</p>
     </div>
   </article>
   ```
3. Kategori yang didukung secara otomatis oleh filter: `coding`, `robotics`, atau `iot`.

---

## 🌐 Cara Menjalankan Website Secara Lokal

1. Cukup klik ganda berkas `index.html` untuk membukanya langsung di peramban favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, atau Safari).
2. Atau jalankan *live server* sederhana melalui terminal:
   ```bash
   # Menggunakan Python
   python -m http.server 8000
   
   # Atau menggunakan npx serve
   npx serve .
   ```
   Lalu buka `http://localhost:8000` di browser.
