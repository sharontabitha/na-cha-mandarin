# 🧋 Na Cha (奶茶) — PWA Mandarin Learning App
> **Tugas Akhir Praktikum Pemrograman Mobile / Web Service 2026**  
> **Judul Tugas Akhir**: *Pengembangan Progressive Web Apps (PWA) Pembelajaran Bahasa Mandarin HSK 1–3 Menggunakan Spaced Repetition System dan Audio Native Berbasis Web Service*

---

## 📌 Pemenuhan Ketentuan Tugas Akhir

| Ketentuan Praktikum | Status | Implementasi di Na Cha |
| :--- | :---: | :--- |
| **Platform PWA (Progressive Web Apps)** | ✅ **Terpenuhi** | Menggunakan `manifest.json`, Service Worker (`sw.js`), ikon PWA 192x192 & 512x512, offline caching, dan installable. |
| **Menggunakan API (Web Service) Buatan Sendiri (Modul 1)** | ✅ **Terpenuhi** | REST API di `server/server.js` (port 3001) dengan endpoint `/api/vocabularies`, `/api/grammar`, `/api/stories`, `/api/conversations`, `/api/quizzes`, `/api/about` terhubung via `apiService.js`. |
| **Bottom Navigation Bar** | ✅ **Terpenuhi** | `MobileBottomNav.jsx` dengan 6 menu: Beranda, Belajar, Membaca, Dialog, Kuis, Profil. |
| **Minimal 5 Halaman** | ✅ **Terpenuhi (6 Halaman)** | 1. Beranda, 2. Kosakata & Tata Bahasa, 3. Ruang Baca, 4. Percakapan, 5. Kuis & Evaluasi, 6. Profil & About. |
| **Minimal 2 Halaman List ➔ Detail** | ✅ **Terpenuhi** | **Halaman 1**: List Kosakata (Search & Grid) ➔ Modal Detail Kosakata lengkap.<br>**Halaman 2**: List Topik Percakapan ➔ Detail Dialog line-by-line & audio. |
| **Halaman Profile / About Aplikasi** | ✅ **Terpenuhi** | `ProfileTab.jsx` memiliki kartu identitas pengguna, 8 pilihan maskot lucu, dan seksi resmi "About Aplikasi & Lembar Tugas Akhir". |
| **Deploy Free Hosting (Khusus PWA)** | ✅ **Siap Deploy** | Konfigurasi `vercel.json` dan `netlify.toml` siap 1-click deploy ke Vercel atau Netlify. |
| **Source Code di GitHub** | ✅ **Siap Push** | Repositori Git lokal sudah diinisialisasi dan siap di-push ke GitHub. |

---

## 📡 Web Service REST API (Modul 1)

Server REST API dapat dijalankan secara mandiri dengan Node.js bawaan tanpa dependensi pihak ketiga:

```bash
# Menjalankan REST API Server (Port 3001)
npm run server
```

### Daftar Endpoint REST API:
- `GET /api/health` — Status kesehatan Web Service
- `GET /api/vocabularies?level=HSK 1&search=...` — Daftar kosakata HSK
- `GET /api/vocabularies/:id` — Detail satu kosakata
- `GET /api/grammar?level=HSK 1` — Rumus pola tata bahasa
- `GET /api/stories?level=HSK 1` — Cerita ruang baca
- `GET /api/conversations` — Daftar percakapan 9 kategori
- `GET /api/conversations/:category` — Detail dialog per kategori
- `GET /api/quizzes?level=HSK 1` — Soal evaluasi & kuis
- `GET /api/about` — Informasi metadata aplikasi & tugas akhir

---

## 🚀 Cara Menjalankan Aplikasi di Lokal

### 1. Jalankan Backend API:
```bash
npm run server
# API aktif di http://localhost:3001
```

### 2. Jalankan Frontend PWA:
```bash
npm run dev
# Buka di browser: http://localhost:3000
```

---

## ☁️ Panduan Deploy ke Free Hosting (Vercel / Netlify)

### Opsi A: Deploy ke Vercel (Disarankan)
1. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik **Add New...** ➔ **Project** ➔ Import repositori `na-cha`.
3. Framework Preset: **Vite**.
4. Klik **Deploy**! File `vercel.json` sudah terpasang otomatis.

### Opsi B: Deploy ke Netlify
1. Buka [netlify.com](https://netlify.com) dan login.
2. Klik **Add new site** ➔ **Import an existing project** dari GitHub.
3. Build command: `npm run build`, Publish directory: `dist`. File `netlify.toml` sudah tersedia.

---

## 🐙 Panduan Upload ke GitHub

1. Buat repositori baru di [github.com/new](https://github.com/new) dengan nama `na-cha`.
2. Di terminal folder proyek, jalankan:
```bash
git remote add origin https://github.com/USERNAME_ANDA/na-cha.git
git branch -M main
git push -u origin main
```
