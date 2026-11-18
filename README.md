# Na Cha (奶茶) — Belajar Mandarin Semanis & Semudah Menikmati Milk Tea 🧋

Aplikasi pembelajaran bahasa Mandarin yang kompatibel untuk **Web dan Mobile**, dengan maskot **Milk Tea (Na Cha 奶茶)** yang imut, sistem penyaringan level **HSK 1, HSK 2, HSK 3** aktif, serta halaman **Profil Pengguna**.

---

## 🧋 Maskot & Identitas Brand
- **Nama Aplikasi**: **Na Cha** (Hanzi: **奶茶**, *Nǎi Chá* yang berarti *Milk Tea* / Teh Susu Boba).
- **Maskot**: **Cha-Cha** — cangkir teh susu boba menggemaskan dengan boba mutiara, sedotan belang merah-putih, dan ekspresi wajah ceria yang mendampingi dan menyemangati pembelajar di setiap sesi.
- **Slogan**: *"Belajar Mandarin Semudah & Semanis Menikmati Milk Tea!"*

---

## 🎚️ Penyaringan Level Materi (HSK 1 · HSK 2 · HSK 3)
Pemilihan level HSK (melalui **dropdown header**, **menu mobile**, atau **halaman profil**) secara langsung dan aktif **menyaring seluruh konten pembelajaran**:

1. **HSK 1 (Basic · 150 Kata)**:
   - **Modul**: Dasar Salam, Angka, Keluarga, dan Belanja Kebutuhan Harian (Pasar Buah).
   - **Kosakata**: 苹果 (*apel*), 香蕉 (*pisang*), 西瓜 (*semangka*), 多少钱 (*berapa harga*), 斤 (*jin = 500g*), 便宜 (*murah*), 贵 (*mahal*), 买 (*beli*), 卖 (*jual*).
   - **Tata Bahasa**: Pola kalimat tanya harga: `[Subjek/Benda] + [多少钱] + ([Satuan])?`. Pembeda 几 vs 多少.
   - **Cerita Bacaan**: *"Di Toko Buah Paman Wang (在王叔叔的水果店)"*.
   - **Kuis & Evaluasi**: Latihan susun kalimat belanja, pencocokan kata buah, dan kuis audio pasar.

2. **HSK 2 (Elementary · 300 Kata)**:
   - **Modul**: Perjalanan & Cuaca (旅行与天气), Transportasi & MRT (城市交通与地铁), Belanja Pakaian.
   - **Kosakata**: 机场 (*bandara*), 方便 (*praktis*), 离 (*berjarak dari*), 旅游 (*traveling*), 准备 (*menyiapkan*), 晴天 (*cuaca cerah*), 比 (*komparasi*).
   - **Tata Bahasa**: Struktur perbandingan komparatif: `[Subjek A] + [比] + [Objek B] + [Kata Sifat]`. Pola jarak: `Tempat A + 离 + Tempat B + 近/远`.
   - **Cerita Bacaan**: *"Naik Kereta Cepat ke Beijing (坐高铁去北京)"*.
   - **Kuis & Evaluasi**: Susun kalimat komparatif 比, pencocokan kata traveling, dan menyimak info cuaca.

3. **HSK 3 (Intermediate · 600 Kata)**:
   - **Modul**: Kehidupan Kantor & Karir (职场生活与会议), Kesehatan & Olahraga, Adaptasi & Pemecahan Masalah.
   - **Kosakata**: 决定 (*memutuskan*), 相信 (*percaya*), 解决 (*menyelesaikan masalah*), 发现 (*menemukan*), 习惯 (*kebiasaan*), 把 (*partikel pemindah objek*).
   - **Tata Bahasa**: Pola kalimat disposisi 把: `[Subjek] + [把] + [Objek] + [Kata Kerja] + [Hasil]`. Pola korelasi: `越...越...` (*semakin... semakin...*).
   - **Cerita Bacaan**: *"Pengalaman Bekerja di Shanghai (在上海工作的经验)"*.
   - **Kuis & Evaluasi**: Susun kalimat 把, kuis kosakata karir, dan pemahaman bacaan profesional.

---

## 👤 Halaman Profil (Profile & Level Management)
Halaman profil komprehensif ([`src/components/ProfileTab.jsx`](file:///c:/Users/MSI/na%20cha/src/components/ProfileTab.jsx)) menyediakan:
- **Pengaturan Level HSK**: Memilih level HSK aktif (1, 2, atau 3) dalam 1 klik dengan tinjauan target kata dan silabus.
- **Kartu Identitas Pengguna & Maskot Na Cha**: Mengubah nama siswa, melihat lencana pro, dan pesan motivasi dari maskot.
- **Statistik Belajar**: Hari streak beruntun, total XP terkumpul, jumlah kata yang dihafal, dan progres % penguasaan tiap level HSK.
- **Pengaturan Target Harian**: Slider penyesuaian target XP (20 s/d 150 XP) dan target menit belajar (5 s/d 60 menit per hari).

---

## 🚀 Cara Menjalankan

```bash
# Server pengembangan:
npm run dev

# Build produksi:
npm run build

# Preview build produksi:
npm run preview
```
Buka peramban pada `http://localhost:3000`.
