// Na Cha (奶茶) - Learning Content Dataset
// Structured Indonesian-Mandarin curriculum with Multi-Level HSK Filtering (HSK 1, HSK 2, HSK 3)
import { DEFAULT_MASCOT_AVATAR } from './avatarsData.js';

export const HSK_LEVELS_META = {
  "HSK 1": {
    id: "HSK 1",
    name: "HSK 1 · BASIC",
    chineseName: "汉语水平考试一级",
    targetWords: 150,
    grammarPoints: 30,
    color: "teal",
    accentBg: "bg-teal-50",
    accentText: "text-teal-700",
    accentBorder: "border-teal-200",
    description: "Tingkat pemula mutlak: Mengenal sapaan, berhitung, transaksi harian dasar, dan belanja makanan.",
    idealFor: "Siswa yang baru mulai belajar Mandarin (0-3 bulan)"
  },
  "HSK 2": {
    id: "HSK 2",
    name: "HSK 2 · ELEMENTARY",
    chineseName: "汉语水平考试二级",
    targetWords: 300,
    grammarPoints: 60,
    color: "blue",
    accentBg: "bg-blue-50",
    accentText: "text-blue-700",
    accentBorder: "border-blue-200",
    description: "Tingkat dasar lanjut: Berkomunikasi saat traveling, menanyakan arah, cuaca, dan perbandingan.",
    idealFor: "Siswa yang ingin bisa bepergian dan berkomunikasi praktis di Tiongkok (3-6 bulan)"
  },
  "HSK 3": {
    id: "HSK 3",
    name: "HSK 3 · INTERMEDIATE",
    chineseName: "汉语水平考试三级",
    targetWords: 600,
    grammarPoints: 120,
    color: "purple",
    accentBg: "bg-purple-50",
    accentText: "text-purple-700",
    accentBorder: "border-purple-200",
    description: "Tingkat menengah: Mampu berdiskusi tentang pekerjaan, rencana studi, kesehatan, dan pola kalimat 把.",
    idealFor: "Siswa yang mempersiapkan diri untuk magang atau kuliah di negara berbahasa Mandarin (6-12 bulan)"
  }
};

export const USER_PROFILE = {
  name: "Budi",
  title: "Pecinta Boba & Mandarin",
  avatar: DEFAULT_MASCOT_AVATAR,
  streakDays: 14,
  xp: 1420,
  dailyGoalXP: 50,
  currentDayXP: 35,
  dailyMinutes: 11,
  targetMinutes: 15,
  hskProgress: {
    "HSK 1": { masteredWords: 142, inReview: 18, grammarPoints: 28, completionPercent: 95 },
    "HSK 2": { masteredWords: 84, inReview: 12, grammarPoints: 16, completionPercent: 42 },
    "HSK 3": { masteredWords: 26, inReview: 6, grammarPoints: 5, completionPercent: 12 }
  },
  preferences: {
    audioSpeed: 1.0,
    showPinyinByDefault: true,
    showIndoByDefault: true,
    soundEffects: true
  }
};

// ==========================================
// 1. MODULES PER LEVEL
// ==========================================
export const MODULES_BY_LEVEL = {
  "HSK 1": [
    {
      id: "mod-1-1",
      title: "Bab 1: Dasar Salam & Angka (问候与数字)",
      description: "Menguasai 25 kata dasar: 你好, 谢谢, 再见, angka 1-99, dan rumus kalimat dasar 是.",
      status: "completed",
      hskLevel: "HSK 1",
      totalWords: 25,
      xpReward: 300,
      units: [
        { id: "u-1-1", title: "Unit 1.1: Kosakata Salam & Sapaan", type: "vocab", status: "completed" },
        { id: "u-1-2", title: "Unit 1.2: Tata Bahasa Kalimat 是 (shì)", type: "grammar", status: "completed" },
        { id: "u-1-3", title: "Unit 1.3: Menyimak Sapaan Pagi & Siang", type: "listening", status: "completed" },
        { id: "u-1-4", title: "Unit 1.4: Cerita: Bertemu Teman Baru", type: "reading", status: "completed" }
      ]
    },
    {
      id: "mod-1-2",
      title: "Bab 2: Keluarga & Pekerjaan (家庭与职业)",
      description: "Menyapa kerabat (爸爸, 妈妈), pola kepemilikan 的 (de), dan profesi dasar (老师, 学生).",
      status: "completed",
      hskLevel: "HSK 1",
      totalWords: 28,
      xpReward: 350,
      units: [
        { id: "u-2-1", title: "Unit 2.1: Kosakata Anggota Keluarga", type: "vocab", status: "completed" },
        { id: "u-2-2", title: "Unit 2.2: Partikel Kepemilikan 的 (de)", type: "grammar", status: "completed" },
        { id: "u-2-3", title: "Unit 2.3: Dialog Keluarga di Rumah", type: "listening", status: "completed" },
        { id: "u-2-4", title: "Unit 2.4: Cerita: Foto Keluarga Wang", type: "reading", status: "completed" }
      ]
    },
    {
      id: "mod-1-3",
      title: "Bab 3: Belanja & Kebutuhan Harian (购物与日常)",
      description: "Modul Aktif: Menanyakan harga dengan 多少钱, satuan 斤 di Tiongkok, tawar menawar di pasar buah.",
      status: "active",
      hskLevel: "HSK 1",
      totalWords: 32,
      xpReward: 400,
      units: [
        { id: "u-3-1", title: "Unit 3.1: 10 Kosakata Buah & Ukuran", type: "vocab", status: "completed" },
        { id: "u-3-2", title: "Unit 3.2: Tata Bahasa: 多少钱 & 斤", type: "grammar", status: "active" },
        { id: "u-3-3", title: "Unit 3.3: Latihan Menyimak: Percakapan Penjual Buah", type: "listening", status: "available" },
        { id: "u-3-4", title: "Unit 3.4: Cerita Pendek 1 Paragraf & Kuis Pemahaman", type: "reading", status: "available" }
      ]
    },
    {
      id: "mod-1-4",
      title: "Bab 4: Restoran & Makanan Favorit (餐厅与美食)",
      description: "Pemesanan di restoran Tiongkok, bumbu, pola 想 (xiǎng) dan 要 (yào), serta etiket makan.",
      status: "locked",
      hskLevel: "HSK 1",
      totalWords: 30,
      xpReward: 450,
      units: [
        { id: "u-4-1", title: "Unit 4.1: Kosakata Makanan & Minuman", type: "vocab", status: "locked" },
        { id: "u-4-2", title: "Unit 4.2: Tata Bahasa Modal 想 vs 要", type: "grammar", status: "locked" },
        { id: "u-4-3", title: "Unit 4.3: Menyimak Pesanan Pelanggan", type: "listening", status: "locked" },
        { id: "u-4-4", title: "Unit 4.4: Cerita: Malam di Kedai Mie", type: "reading", status: "locked" }
      ]
    }
  ],

  "HSK 2": [
    {
      id: "mod-2-1",
      title: "Bab 1: Perjalanan & Cuaca (旅行与天气)",
      description: "Menanyakan ramalan cuaca (晴天, 下雨), kosakata berwisata (旅游, 准备), dan struktur perbandingan 比.",
      status: "active",
      hskLevel: "HSK 2",
      totalWords: 35,
      xpReward: 450,
      units: [
        { id: "u-21-1", title: "Unit 1.1: Kosakata Bandara & Cuaca", type: "vocab", status: "completed" },
        { id: "u-21-2", title: "Unit 1.2: Tata Bahasa Struktur Komparatif 比 (bǐ)", type: "grammar", status: "active" },
        { id: "u-21-3", title: "Unit 1.3: Menyimak Informasi Penerbangan", type: "listening", status: "available" },
        { id: "u-21-4", title: "Unit 1.4: Cerita: Naik Kereta Cepat ke Beijing", type: "reading", status: "available" }
      ]
    },
    {
      id: "mod-2-2",
      title: "Bab 2: Transportasi Kota & Arah (城市交通与地铁)",
      description: "Menanyakan rute kereta bawah tanah, jarak dengan pola 离 (lí), dan naik bus kota (公共汽车).",
      status: "available",
      hskLevel: "HSK 2",
      totalWords: 32,
      xpReward: 480,
      units: [
        { id: "u-22-1", title: "Unit 2.1: Kosakata Stasiun Kereta & Tiket", type: "vocab", status: "available" },
        { id: "u-22-2", title: "Unit 2.2: Tata Bahasa Jarak: A 离 B 远/近", type: "grammar", status: "available" },
        { id: "u-22-3", title: "Unit 2.3: Menyimak Pengumuman Stasiun", type: "listening", status: "available" },
        { id: "u-22-4", title: "Unit 2.4: Cerita: Transit di Shanghai Metro", type: "reading", status: "available" }
      ]
    },
    {
      id: "mod-2-3",
      title: "Bab 3: Belanja Pakaian & Ukuran (买衣服与试穿)",
      description: "Ukuran pakaian (大, 小, 合适), warna, dan pola pengandaian sederhana 如果...就...",
      status: "locked",
      hskLevel: "HSK 2",
      totalWords: 38,
      xpReward: 520,
      units: [
        { id: "u-23-1", title: "Unit 3.1: Kosakata Warna & Baju", type: "vocab", status: "locked" },
        { id: "u-23-2", title: "Unit 3.2: Tata Bahasa Jika... Maka (如果)", type: "grammar", status: "locked" },
        { id: "u-23-3", title: "Unit 3.3: Menyimak Saran Pelayan Toko", type: "listening", status: "locked" },
        { id: "u-23-4", title: "Unit 3.4: Cerita: Belanja Jaket Hangat", type: "reading", status: "locked" }
      ]
    }
  ],

  "HSK 3": [
    {
      id: "mod-3-1",
      title: "Bab 1: Kehidupan Kantor & Karir (职场生活与会议)",
      description: "Mengatur agenda rapat (开会), mengambil keputusan (决定), dan pola kalimat 把 (bǎ).",
      status: "active",
      hskLevel: "HSK 3",
      totalWords: 45,
      xpReward: 600,
      units: [
        { id: "u-31-1", title: "Unit 1.1: Kosakata Profesional & Manajemen", type: "vocab", status: "completed" },
        { id: "u-31-2", title: "Unit 1.2: Tata Bahasa Struktur Kalimat 把 (bǎ)", type: "grammar", status: "active" },
        { id: "u-31-3", title: "Unit 1.3: Menyimak Diskusi Rapat Proyek", type: "listening", status: "available" },
        { id: "u-31-4", title: "Unit 1.4: Cerita: Pengalaman Bekerja di Shanghai", type: "reading", status: "available" }
      ]
    },
    {
      id: "mod-3-2",
      title: "Bab 2: Kesehatan & Olahraga (健康与运动习惯)",
      description: "Membicarakan gaya hidup sehat, berkonsultasi dengan dokter, pola 越...越... dan 除了...以外.",
      status: "available",
      hskLevel: "HSK 3",
      totalWords: 42,
      xpReward: 620,
      units: [
        { id: "u-32-1", title: "Unit 2.1: Kosakata Medis & Kebugaran", type: "vocab", status: "available" },
        { id: "u-32-2", title: "Unit 2.2: Tata Bahasa Pola 越...越...", type: "grammar", status: "available" },
        { id: "u-32-3", title: "Unit 2.3: Menyimak Saran Dokter", type: "listening", status: "available" },
        { id: "u-32-4", title: "Unit 2.4: Cerita: Rutinitas Jogging Pagi", type: "reading", status: "available" }
      ]
    },
    {
      id: "mod-3-3",
      title: "Bab 3: Mengatasi Masalah & Adaptasi (解决日常问题)",
      description: "Menghadapi keterlambatan penerbangan, kehilangan barang, dan negosiasi sewa apartemen.",
      status: "locked",
      hskLevel: "HSK 3",
      totalWords: 48,
      xpReward: 650,
      units: [
        { id: "u-33-1", title: "Unit 3.1: Kosakata Solusi & Kendala", type: "vocab", status: "locked" },
        { id: "u-33-2", title: "Unit 3.2: Tata Bahasa Pasif 被 (bèi)", type: "grammar", status: "locked" },
        { id: "u-33-3", title: "Unit 3.3: Menyimak Layanan Pelanggan", type: "listening", status: "locked" },
        { id: "u-33-4", title: "Unit 3.4: Cerita: Menemukan Dompet yang Hilang", type: "reading", status: "locked" }
      ]
    }
  ]
};

// ==========================================
// 2. VOCABULARY PER LEVEL
// ==========================================
export const VOCABULARY_BY_LEVEL = {
  "HSK 1": [
    {
      id: "voc-apple",
      hanzi: "苹果",
      pinyin: "píngguǒ",
      tones: "Nada 2 + 3",
      indonesian: "Apel (Buah segar)",
      pos: "Nomina (Kata Benda)",
      hskLevel: "HSK 1",
      srsInterval: "SRS Interval 2 (3 Hari)",
      isBookmarked: true,
      radicals: [
        { char: "艹", pinyin: "cǎo", meaning: "Rumput / Flora" },
        { char: "平", pinyin: "píng", meaning: "Datar / Damai" },
        { char: "果", pinyin: "guǒ", meaning: "Buah / Hasil" }
      ],
      example: {
        hanzi: "这个苹果多少钱一斤？",
        pinyin: "Zhè ge píngguǒ duōshao qián yì jīn?",
        indonesian: "Berapa harga satu jin (500 gram) apel ini?"
      },
      cultureNote: {
        title: "Satuan '斤 (jīn)' di Tiongkok",
        text: "Di pasar tradisional Tiongkok, harga komoditas pangan biasanya dihitung per jin (斤), setara dengan 500 gram (setengah kilogram), bukan per kilogram penuh."
      }
    },
    {
      id: "voc-banana",
      hanzi: "香蕉",
      pinyin: "xiāngjiāo",
      tones: "Nada 1 + 1",
      indonesian: "Pisang",
      pos: "Nomina (Kata Benda)",
      hskLevel: "HSK 1",
      srsInterval: "SRS Interval 1 (1 Hari)",
      isBookmarked: false,
      radicals: [
        { char: "禾", pinyin: "hé", meaning: "Padi / Tanaman" },
        { char: "日", pinyin: "rì", meaning: "Matahari" },
        { char: "艹", pinyin: "cǎo", meaning: "Flora" }
      ],
      example: {
        hanzi: "我喜欢吃香蕉。",
        pinyin: "Wǒ xǐhuan chī xiāngjiāo.",
        indonesian: "Saya suka makan pisang."
      },
      cultureNote: {
        title: "Buah di Pasar Malam",
        text: "Buah pisang dan semangka sering disajikan potong di pasar malam (夜市) sebagai camilan segar."
      }
    },
    {
      id: "voc-watermelon",
      hanzi: "西瓜",
      pinyin: "xīguā",
      tones: "Nada 1 + 1",
      indonesian: "Semangka",
      pos: "Nomina (Kata Benda)",
      hskLevel: "HSK 1",
      srsInterval: "SRS Interval 3 (7 Hari)",
      isBookmarked: false,
      radicals: [
        { char: "西", pinyin: "xī", meaning: "Barat" },
        { char: "瓜", pinyin: "guā", meaning: "Labu / Melon" }
      ],
      example: {
        hanzi: "夏天的西瓜很甜。",
        pinyin: "Xiàtiān de xīguā hěn tián.",
        indonesian: "Semangka musim panas sangat manis."
      },
      cultureNote: {
        title: "Tradisi Makan Semangka di Musim Panas",
        text: "Di Tiongkok, makan semangka dingin bersama keluarga saat musim panas adalah simbol kebersamaan dan pelepas dahaga nomor satu."
      }
    },
    {
      id: "voc-duoshaoqian",
      hanzi: "多少钱",
      pinyin: "duōshao qián",
      tones: "Nada 1 + netral + 2",
      indonesian: "Berapa harganya? / Berapa uang?",
      pos: "Frasa Interogatif (Tanya)",
      hskLevel: "HSK 1",
      srsInterval: "SRS Interval 2 (3 Hari)",
      isBookmarked: true,
      radicals: [
        { char: "多", pinyin: "duō", meaning: "Banyak" },
        { char: "少", pinyin: "shǎo", meaning: "Sedikit" },
        { char: "钅", pinyin: "jīn", meaning: "Logam / Emas" }
      ],
      example: {
        hanzi: "请问，一共多少钱？",
        pinyin: "Qǐngwèn, yígòng duōshao qián?",
        indonesian: "Permisi, semuanya berapa harganya?"
      },
      cultureNote: {
        title: "Pembayaran Digital di Tiongkok",
        text: "Saat ini di Tiongkok, setelah menanyakan 多少钱, orang umumnya langsung memindai kode QR via WeChat Pay atau Alipay (扫码支付)."
      }
    },
    {
      id: "voc-jin",
      hanzi: "斤",
      pinyin: "jīn",
      tones: "Nada 1",
      indonesian: "Jin (Satuan berat 500 gram)",
      pos: "Satuan Ukuran (Kata Ukur)",
      hskLevel: "HSK 1",
      srsInterval: "SRS Interval 3 (7 Hari)",
      isBookmarked: false,
      radicals: [
        { char: "斤", pinyin: "jīn", meaning: "Kapak / Satuan Berat" }
      ],
      example: {
        hanzi: "我要买两斤西红柿。",
        pinyin: "Wǒ yào mǎi liǎng jīn xīhóngshì.",
        indonesian: "Saya ingin membeli 2 jin (1 kg) tomat."
      },
      cultureNote: {
        title: "Perbedaan 斤 (jīn) dan 公斤 (gōngjīn)",
        text: "1 斤 (jīn) = 500 gram. Jika Anda ingin membeli 1 kilogram penuh, gunakan istilah 公斤 (gōngjīn)!"
      }
    },
    {
      id: "voc-cheap",
      hanzi: "便宜",
      pinyin: "piányi",
      tones: "Nada 2 + netral",
      indonesian: "Murah / Terjangkau",
      pos: "Adjektiva (Kata Sifat)",
      hskLevel: "HSK 1",
      srsInterval: "SRS Interval 1 (1 Hari)",
      isBookmarked: true,
      radicals: [
        { char: "亻", pinyin: "rén", meaning: "Orang" },
        { char: "宀", pinyin: "mián", meaning: "Atap" }
      ],
      example: {
        hanzi: "可以便宜一点儿吗？",
        pinyin: "Kěyǐ piányi yìdiǎnr ma?",
        indonesian: "Bolehkah lebih murah sedikit?"
      },
      cultureNote: {
        title: "Seni Menawar",
        text: "Frasa 可以便宜一点儿吗 adalah kalimat sakti saat berbelanja di pasar cinderamata di Tiongkok!"
      }
    },
    {
      id: "voc-expensive",
      hanzi: "贵",
      pinyin: "guì",
      tones: "Nada 4",
      indonesian: "Mahal / Berharga",
      pos: "Adjektiva (Kata Sifat)",
      hskLevel: "HSK 1",
      srsInterval: "SRS Interval 2 (3 Hari)",
      isBookmarked: false,
      radicals: [
        { char: "贝", pinyin: "bèi", meaning: "Kerang (simbol uang kuno)" }
      ],
      example: {
        hanzi: "太贵了，我不买。",
        pinyin: "Tài guì le, wǒ bù mǎi.",
        indonesian: "Terlalu mahal, saya tidak beli."
      },
      cultureNote: {
        title: "Radikal 贝 (Kerang)",
        text: "Banyak karakter yang berhubungan dengan nilai atau uang memiliki radikal 贝 karena zaman kuno kerang dijadikan mata uang."
      }
    },
    {
      id: "voc-buy",
      hanzi: "买",
      pinyin: "mǎi",
      tones: "Nada 3 (Turun Naik)",
      indonesian: "Membeli (Aktivitas belanja)",
      pos: "Verba (Kata Kerja)",
      hskLevel: "HSK 1",
      srsInterval: "SRS Interval 3 (7 Hari)",
      isBookmarked: true,
      radicals: [
        { char: "乙", pinyin: "yǐ", meaning: "Lekukan" },
        { char: "头", pinyin: "tóu", meaning: "Bentuk atas" }
      ],
      example: {
        hanzi: "你想买什么水果？",
        pinyin: "Nǐ xiǎng mǎi shénme shuǐguǒ?",
        indonesian: "Kamu mau beli buah apa?"
      },
      cultureNote: {
        title: "Tips Mengingat 买 vs 卖",
        text: "买 (mǎi) nada 3 mengayun berarti beli, 卖 (mài) nada 4 tegas ke bawah berarti jual."
      }
    }
  ],

  "HSK 2": [
    {
      id: "voc-airport",
      hanzi: "机场",
      pinyin: "jīchǎng",
      tones: "Nada 1 + 3",
      indonesian: "Bandara / Lapangan Terbang",
      pos: "Nomina (Kata Benda)",
      hskLevel: "HSK 2",
      srsInterval: "SRS Interval 2 (3 Hari)",
      isBookmarked: true,
      radicals: [
        { char: "木", pinyin: "mù", meaning: "Kayu / Mesin" },
        { char: "土", pinyin: "tǔ", meaning: "Tanah / Lapangan" }
      ],
      example: {
        hanzi: "我正在去机场的路上。",
        pinyin: "Wǒ zhèngzài qù jīchǎng de lù shang.",
        indonesian: "Saya sedang dalam perjalanan menuju bandara."
      },
      cultureNote: {
        title: "Bandara Internasional Daxing Beijing",
        text: "Bandara Daxing (北京大兴国际机场) dijuluki 'Starfish' dan merupakan salah satu terminal bandara terbesar di dunia."
      }
    },
    {
      id: "voc-convenient",
      hanzi: "方便",
      pinyin: "fāngbiàn",
      tones: "Nada 1 + 4",
      indonesian: "Praktis / Nyaman / Mudah",
      pos: "Adjektiva (Kata Sifat)",
      hskLevel: "HSK 2",
      srsInterval: "SRS Interval 3 (7 Hari)",
      isBookmarked: false,
      radicals: [
        { char: "方", pinyin: "fāng", meaning: "Arah / Kotak" },
        { char: "亻", pinyin: "rén", meaning: "Orang" }
      ],
      example: {
        hanzi: "在上海坐地铁非常方便。",
        pinyin: "Zài Shànghǎi zuò dìtiě fēicháng fāngbiàn.",
        indonesian: "Naik MRT di Shanghai sangat praktis dan nyaman."
      },
      cultureNote: {
        title: "方便面 (Fāngbiànmiàn)",
        text: "Mie instan dalam bahasa Mandarin disebut 方便面 (fāngbiànmiàn) karena penyajiannya yang sangat praktis dan cepat."
      }
    },
    {
      id: "voc-li-distance",
      hanzi: "离",
      pinyin: "lí",
      tones: "Nada 2",
      indonesian: "Dari / Berjarak (Penunjuk jarak)",
      pos: "Preposisi (Kata Depan)",
      hskLevel: "HSK 2",
      srsInterval: "SRS Interval 2 (3 Hari)",
      isBookmarked: true,
      radicals: [
        { char: "亠", pinyin: "tóu", meaning: "Atap" },
        { char: "凶", pinyin: "xiōng", meaning: "Tanda silang" }
      ],
      example: {
        hanzi: "我家离学校不远。",
        pinyin: "Wǒ jiā lí xuéxiào bù yuǎn.",
        indonesian: "Rumah saya tidak jauh dari sekolah."
      },
      cultureNote: {
        title: "Pola Struktur Jarak 离",
        text: "Rumus baku: Tempat A + 离 + Tempat B + 很远 (jauh) / 很近 (dekat)."
      }
    },
    {
      id: "voc-compare-bi",
      hanzi: "比",
      pinyin: "bǐ",
      tones: "Nada 3",
      indonesian: "Daripada / Dibandingkan (Komparasi)",
      pos: "Preposisi Komparatif",
      hskLevel: "HSK 2",
      srsInterval: "SRS Interval 3 (7 Hari)",
      isBookmarked: true,
      radicals: [
        { char: "匕", pinyin: "bǐ", meaning: "Sendok / Membandingkan" }
      ],
      example: {
        hanzi: "今天比昨天冷一点儿。",
        pinyin: "Jīntiān bǐ zuótiān lěng yìdiǎnr.",
        indonesian: "Hari ini lebih dingin sedikit dibandingkan kemarin."
      },
      cultureNote: {
        title: "Struktur Komparatif 比 (bǐ)",
        text: "Karakter 比 berasal dari gambar dua orang yang berdiri bersebelahan untuk dibandingkan tingginya."
      }
    },
    {
      id: "voc-travel",
      hanzi: "旅游",
      pinyin: "lǚyóu",
      tones: "Nada 3 + 2",
      indonesian: "Wisata / Traveling / Bepergian",
      pos: "Verba / Nomina",
      hskLevel: "HSK 2",
      srsInterval: "SRS Interval 1 (1 Hari)",
      isBookmarked: false,
      radicals: [
        { char: "方", pinyin: "fāng", meaning: "Bendera / Arah" },
        { char: "氵", pinyin: "shuǐ", meaning: "Air" }
      ],
      example: {
        hanzi: "我们打算去北京旅游。",
        pinyin: "Wǒmen dǎsuàn qù Běijīng lǚyóu.",
        indonesian: "Kami berencana pergi traveling ke Beijing."
      },
      cultureNote: {
        title: "Golden Week di Tiongkok",
        text: "Awal Oktober dikenal sebagai Pekan Emas (黄金周), saat puluhan juta orang di Tiongkok melakukan 旅游 ke berbagai destinasi wisata."
      }
    },
    {
      id: "voc-prepare",
      hanzi: "准备",
      pinyin: "zhǔnbèi",
      tones: "Nada 3 + 4",
      indonesian: "Mempersiapkan / Menyiapkan",
      pos: "Verba (Kata Kerja)",
      hskLevel: "HSK 2",
      srsInterval: "SRS Interval 2 (3 Hari)",
      isBookmarked: false,
      radicals: [
        { char: "冫", pinyin: "bīng", meaning: "Es" },
        { char: "夂", pinyin: "zhǐ", meaning: "Langkah" }
      ],
      example: {
        hanzi: "你准备好行李了吗？",
        pinyin: "Nǐ zhǔnbèi hǎo xíngli le ma?",
        indonesian: "Apakah kamu sudah menyiapkan koper/barang bawaanmu?"
      },
      cultureNote: {
        title: "Persiapan Perjalanan Kereta",
        text: "Penumpang kereta cepat di Tiongkok wajib membawa kartu identitas atau paspor asli saat melewati gerbang pemindai tiket."
      }
    }
  ],

  "HSK 3": [
    {
      id: "voc-decide",
      hanzi: "决定",
      pinyin: "juédìng",
      tones: "Nada 2 + 4",
      indonesian: "Memutuskan / Mengambil keputusan",
      pos: "Verba / Nomina",
      hskLevel: "HSK 3",
      srsInterval: "SRS Interval 2 (3 Hari)",
      isBookmarked: true,
      radicals: [
        { char: "氵", pinyin: "shuǐ", meaning: "Air" },
        { char: "宀", pinyin: "mián", meaning: "Atap" }
      ],
      example: {
        hanzi: "经过讨论，我们决定接受这个新项目。",
        pinyin: "Jīngguò tǎolùn, wǒmen juédìng jiēshòu zhège xīn xiàngmù.",
        indonesian: "Setelah berdiskusi, kami memutuskan untuk menerima proyek baru ini."
      },
      cultureNote: {
        title: "Budaya Pengambilan Keputusan Kerja",
        text: "Dalam dunia bisnis profesional Tiongkok, keputusan penting biasanya diambil melalui musyawarah tim yang cermat sebelum disahkan pimpinan."
      }
    },
    {
      id: "voc-solve",
      hanzi: "解决",
      pinyin: "jiějué",
      tones: "Nada 3 + 2",
      indonesian: "Menyelesaikan (Masalah / Kendala)",
      pos: "Verba (Kata Kerja)",
      hskLevel: "HSK 3",
      srsInterval: "SRS Interval 3 (7 Hari)",
      isBookmarked: true,
      radicals: [
        { char: "角", pinyin: "jiǎo", meaning: "Tanduk / Sudut" },
        { char: "氵", pinyin: "shuǐ", meaning: "Air" }
      ],
      example: {
        hanzi: "请大家一起想办法解决这个问题。",
        pinyin: "Qǐng dàjiā yìqǐ xiǎng bànfǎ jiějué zhège wèntí.",
        indonesian: "Mari bersama-sama mencari cara untuk menyelesaikan masalah ini."
      },
      cultureNote: {
        title: "Istilah 解决问题",
        text: "Kemampuan memecahkan masalah (解决问题的能力) adalah keterampilan yang paling dicari dalam dunia kerja profesional modern."
      }
    },
    {
      id: "voc-believe",
      hanzi: "相信",
      pinyin: "xiāngxìn",
      tones: "Nada 1 + 4",
      indonesian: "Percaya / Yakin",
      pos: "Verba (Kata Kerja)",
      hskLevel: "HSK 3",
      srsInterval: "SRS Interval 2 (3 Hari)",
      isBookmarked: false,
      radicals: [
        { char: "目", pinyin: "mù", meaning: "Mata" },
        { char: "亻", pinyin: "rén", meaning: "Orang" }
      ],
      example: {
        hanzi: "我相信通过努力，我们一定会成功。",
        pinyin: "Wǒ xiāngxìn tōngguò nǔlì, wǒmen yídìng huì chénggōng.",
        indonesian: "Saya percaya lewat kerja keras, kita pasti akan berhasil."
      },
      cultureNote: {
        title: "Arti Filosofis 相信",
        text: "Karakter 信 terdiri dari 人 (orang) dan 言 (kata-kata), yang melambangkan bahwa kata-kata seseorang harus dapat dipercaya."
      }
    },
    {
      id: "voc-ba-particle",
      hanzi: "把",
      pinyin: "bǎ",
      tones: "Nada 3",
      indonesian: "Partikel Pemindah Objek (Kalimat 把)",
      pos: "Partikel Gramatikal",
      hskLevel: "HSK 3",
      srsInterval: "SRS Interval 3 (7 Hari)",
      isBookmarked: true,
      radicals: [
        { char: "扌", pinyin: "shǒu", meaning: "Tangan" },
        { char: "巴", pinyin: "bā", meaning: "Menempel" }
      ],
      example: {
        hanzi: "请把这份文件打印出来。",
        pinyin: "Qǐng bǎ zhè fèn wénjiàn dǎyìn chūlái.",
        indonesian: "Tolong cetakkan dokumen ini."
      },
      cultureNote: {
        title: "Keistimewaan Pola Kalimat 把",
        text: "Kalimat 把 adalah pola tata bahasa paling penting di HSK 3 untuk menekankan perubahan atau akibat aksi terhadap suatu objek tertentu."
      }
    },
    {
      id: "voc-habit",
      hanzi: "习惯",
      pinyin: "xíguàn",
      tones: "Nada 2 + 4",
      indonesian: "Kebiasaan / Terbiasa",
      pos: "Nomina / Verba",
      hskLevel: "HSK 3",
      srsInterval: "SRS Interval 1 (1 Hari)",
      isBookmarked: false,
      radicals: [
        { char: "羽", pinyin: "yǔ", meaning: "Bulu / Sayap" },
        { char: "忄", pinyin: "xīn", meaning: "Hati" }
      ],
      example: {
        hanzi: "我已经习惯了早起跑步。",
        pinyin: "Wǒ yǐjīng xíguàn le zǎoqǐ pǎobù.",
        indonesian: "Saya sudah terbiasa bangun pagi untuk jogging."
      },
      cultureNote: {
        title: "Karakter 习 (Mempraktikkan)",
        text: "Karakter 习 menggambarkan burung muda yang berulang kali mengepakkan sayap hingga terbiasa terbang mandiri."
      }
    }
  ]
};

// ==========================================
// 3. GRAMMAR STRUCTURE PER LEVEL
// ==========================================
export const GRAMMAR_BY_LEVEL = {
  "HSK 1": {
    moduleId: "mod-1-3",
    hskLevel: "HSK 1",
    title: "Menanyakan Harga: 多少钱 (duōshao qián)",
    badge: "Pola Utama",
    subBadge: "Pola Interogatif",
    description: "Struktur baku yang esensial untuk berbelanja, menawar, atau mengetahui nominal pembayaran di negara berbahasa Mandarin.",
    formula: {
      pattern: "[Subjek / Benda] + [多少钱] + ([Satuan])?",
      example: "苹果 + 多少钱 + 一斤？",
      meaning: "'Apel (berapa harganya) per satu jin?'"
    },
    crucialDifference: {
      title: "Pembeda Krusial: 几 (jǐ) vs 多少 (duōshao)",
      col1: {
        term: "几 (jǐ)",
        desc: "Khusus estimasi jumlah kecil (< 10) dan wajib diikuti kata bantu bilangan (measure word)."
      },
      col2: {
        term: "多少 (duōshao)",
        desc: "Digunakan untuk jumlah bebas / tak terhingga dan nominal harga mata uang tanpa batas."
      }
    },
    commonMistakes: {
      title: "KESALAHAN UMUM PEMBELAJAR",
      wrong: "多少苹果钱？ (Duōshao píngguǒ qián?)",
      correct: "苹果多少钱？ (Píngguǒ duōshao qián?)",
      note: "Catatan Kunci: Kata tanya 多少钱 tidak boleh menyela di tengah kata benda majemuk. Tempatkan kata tanya di akhir frasa benda."
    },
    miniPractice: {
      instruction: "Susun kata-kata berikut agar bermakna: 'Berapa harga satu jin apel?'",
      targetOrder: ["苹果", "多少钱", "一斤？"],
      chips: [
        { id: "c1", text: "苹果", pinyin: "píngguǒ" },
        { id: "c2", text: "一斤", pinyin: "yì jīn" },
        { id: "c3", text: "多少钱", pinyin: "duōshao qián" }
      ]
    }
  },

  "HSK 2": {
    moduleId: "mod-2-1",
    hskLevel: "HSK 2",
    title: "Kalimat Perbandingan: A 比 B + Kata Sifat",
    badge: "Komparatif Baku",
    subBadge: "Pola Komparasi HSK 2",
    description: "Struktur untuk membandingkan dua orang, benda, atau kondisi cuaca (misal: lebih tinggi, lebih dingin, lebih cepat).",
    formula: {
      pattern: "[Subjek A] + [比] + [Objek B] + [Kata Sifat] + ([一点儿 / 得多])",
      example: "高铁 + 比 + 飞机 + 便宜得多。",
      meaning: "'Kereta cepat jauh lebih murah dibandingkan pesawat terbang.'"
    },
    crucialDifference: {
      title: "Pembeda Krusial: 比 vs 没有 (Negasi Komparatif)",
      col1: {
        term: "A 比 B + Sifat",
        desc: "Menyatakan A 'lebih...' daripada B (positif komparatif)."
      },
      col2: {
        term: "A 没有 B + Sifat",
        desc: "Bentuk sangkalan: A 'tidak se-...' B. Jangan menggunakan '不比' kecuali membantah."
      }
    },
    commonMistakes: {
      title: "KESALAHAN UMUM PEMBELAJAR HSK 2",
      wrong: "我比他很冷。 (Wǒ bǐ tā hěn lěng.)",
      correct: "我比他更冷 / 冷一点儿。 (Wǒ bǐ tā gèng lěng.)",
      note: "Catatan Kunci: Pada pola kalimat 比, TIDAK BOLEH memasukkan kata penguat 很 (hěn) sebelum kata sifat!"
    },
    miniPractice: {
      instruction: "Susun frasa agar bermakna: 'Hari ini lebih dingin daripada kemarin':",
      targetOrder: ["今天", "比", "昨天", "冷"],
      chips: [
        { id: "c21", text: "今天", pinyin: "jīntiān" },
        { id: "c22", text: "比", pinyin: "bǐ" },
        { id: "c23", text: "昨天", pinyin: "zuótiān" },
        { id: "c24", text: "冷", pinyin: "lěng" }
      ]
    }
  },

  "HSK 3": {
    moduleId: "mod-3-1",
    hskLevel: "HSK 3",
    title: "Pola Kalimat 把 (bǎ): Subjek + 把 + Objek + Kata Kerja + Hasil",
    badge: "Pola Kalimat Disposisi",
    subBadge: "Tata Bahasa Kunci HSK 3",
    description: "Digunakan ketika suatu tindakan mempengaruhi objek tertentu sehingga posisi, keadaan, atau kepemilikannya berubah.",
    formula: {
      pattern: "[Subjek] + [把] + [Objek Definit] + [Kata Kerja] + [Pelengkap Hasil/Arah]",
      example: "我 + 把 + 文件 + 发给 + 经理了。",
      meaning: "'Saya telah mengirimkan dokumen tersebut kepada manajer.'"
    },
    crucialDifference: {
      title: "Pembeda Krusial: Kapan Harus Menggunakan 把?",
      col1: {
        term: "Wajib Pakai 把",
        desc: "Ketika objek dipindahkan atau mengalami perubahan akibat tindakan (misal: memindahkan meja, mencetak berkas)."
      },
      col2: {
        term: "Dilarang Pakai 把",
        desc: "Untuk kata kerja persepsi atau perasaan seperti 喜欢 (suka), 知道 (tahu), 看见 (melihat tanpa hasil)."
      }
    },
    commonMistakes: {
      title: "KESALAHAN UMUM PEMBELAJAR HSK 3",
      wrong: "我把作业做。 (Wǒ bǎ zuòyè zuò.)",
      correct: "我把作业做完了。 (Wǒ bǎ zuòyè zuò wán le.)",
      note: "Catatan Kunci: Kata kerja dalam kalimat 把 tidak boleh berdiri sendiri; WAJIB diikuti pelengkap hasil (seperti 完, 好, 在) atau partikel 了."
    },
    miniPractice: {
      instruction: "Susun kalimat agar bermakna: 'Tolong matikan komputer itu':",
      targetOrder: ["请", "把", "电脑", "关上"],
      chips: [
        { id: "c31", text: "请", pinyin: "qǐng" },
        { id: "c32", text: "把", pinyin: "bǎ" },
        { id: "c33", text: "电脑", pinyin: "diànnǎo" },
        { id: "c34", text: "关上", pinyin: "guānshang" }
      ]
    }
  }
};

// ==========================================
// 4. READING STORIES PER LEVEL
// ==========================================
export const READING_STORIES_BY_LEVEL = {
  "HSK 1": {
    id: "reading-hsk1",
    hskLevel: "HSK 1",
    titleIndo: "Di Toko Buah Paman Wang",
    titleHanzi: "在王叔叔的水果店",
    levelBadge: "HSK 1",
    typeBadge: "CERITA PENDEK",
    unitLabel: "UNIT 3.4 · BACAAN SATU PARAGRAF",
    audioLength: "01:14",
    backgroundLore: {
      title: "Latar Cerita (背景)",
      content: "David mengunjungi toko buah langganan Paman Wang yang menjual aneka buah lokal di sudut kota Shanghai. Simak percakapan ramah dan penggunaan kata satuan serta hitungan kuai (块)."
    },
    sentences: [
      {
        id: "s1",
        tokens: [
          { hanzi: "今天", pinyin: "Jīntiān", highlight: false },
          { hanzi: "天气", pinyin: "tiānqì", highlight: false },
          { hanzi: "很好", pinyin: "hěn hǎo", highlight: false },
          { hanzi: "。", pinyin: "", isPunctuation: true }
        ]
      },
      {
        id: "s2",
        tokens: [
          { hanzi: "王叔叔", pinyin: "Wáng shūshu", highlight: false },
          { hanzi: "的", pinyin: "de", highlight: false },
          { hanzi: "水果店", pinyin: "shuǐguǒdiàn", highlight: false },
          { hanzi: "里", pinyin: "lǐ", highlight: false },
          { hanzi: "有", pinyin: "yǒu", highlight: false },
          { hanzi: "很多", pinyin: "hěnduō", highlight: false },
          { hanzi: "水果", pinyin: "shuǐguǒ", highlight: false },
          { hanzi: "，", pinyin: "", isPunctuation: true }
        ]
      },
      {
        id: "s3",
        tokens: [
          { hanzi: "有", pinyin: "yǒu", highlight: false },
          { hanzi: "苹果", pinyin: "píngguǒ", highlight: true, highlightType: "vocab", meaning: "Apel" },
          { hanzi: "、", pinyin: "", isPunctuation: true },
          { hanzi: "香蕉", pinyin: "xiāngjiāo", highlight: true, highlightType: "vocab", meaning: "Pisang" },
          { hanzi: "和", pinyin: "hé", highlight: false },
          { hanzi: "西瓜", pinyin: "xīguā", highlight: true, highlightType: "vocab", meaning: "Semangka" },
          { hanzi: "。", pinyin: "", isPunctuation: true }
        ]
      },
      {
        id: "s4",
        tokens: [
          { hanzi: "大卫", pinyin: "Dàwèi", highlight: false },
          { hanzi: "问", pinyin: "wèn", highlight: false },
          { hanzi: "：“", pinyin: "", isPunctuation: true },
          { hanzi: "王叔叔", pinyin: "Wáng shūshu", highlight: false },
          { hanzi: "，", pinyin: "", isPunctuation: true },
          { hanzi: "这个", pinyin: "zhège", highlight: false },
          { hanzi: "红", pinyin: "hóng", highlight: false },
          { hanzi: "苹果", pinyin: "píngguǒ", highlight: true, highlightType: "vocab", meaning: "Apel" },
          { hanzi: "多少钱", pinyin: "duōshao qián", highlight: true, highlightType: "grammar", meaning: "Berapa harga?" },
          { hanzi: "一斤", pinyin: "yì jīn", highlight: true, highlightType: "measure", meaning: "Satu jin (500g)" },
          { hanzi: "？”", pinyin: "", isPunctuation: true }
        ]
      },
      {
        id: "s5",
        tokens: [
          { hanzi: "王叔叔", pinyin: "Wáng shūshu", highlight: false },
          { hanzi: "笑着", pinyin: "xiàozhe", highlight: false },
          { hanzi: "说", pinyin: "shuō", highlight: false },
          { hanzi: "：“", pinyin: "", isPunctuation: true },
          { hanzi: "三块", pinyin: "sān kuài", highlight: true, highlightType: "measure", meaning: "3 Yuan / Kuai" },
          { hanzi: "一斤", pinyin: "yì jīn", highlight: false },
          { hanzi: "，", pinyin: "", isPunctuation: true },
          { hanzi: "很甜", pinyin: "hěn tián", highlight: false },
          { hanzi: "！”", pinyin: "", isPunctuation: true }
        ]
      },
      {
        id: "s6",
        tokens: [
          { hanzi: "大卫", pinyin: "Dàwèi", highlight: false },
          { hanzi: "买", pinyin: "mǎi", highlight: true, highlightType: "vocab", meaning: "Membeli" },
          { hanzi: "了", pinyin: "le", highlight: false },
          { hanzi: "三斤", pinyin: "sān jīn", highlight: true, highlightType: "measure", meaning: "3 jin (1.5 kg)" },
          { hanzi: "苹果", pinyin: "píngguǒ", highlight: false },
          { hanzi: "，", pinyin: "", isPunctuation: true },
          { hanzi: "一共", pinyin: "yígòng", highlight: true, highlightType: "grammar", meaning: "Total / Semuanya" },
          { hanzi: "九块", pinyin: "jiǔ kuài", highlight: true, highlightType: "measure", meaning: "9 kuai" },
          { hanzi: "，", pinyin: "", isPunctuation: true },
          { hanzi: "他", pinyin: "tā", highlight: false },
          { hanzi: "很", pinyin: "hěn", highlight: false },
          { hanzi: "高兴", pinyin: "gāoxìng", highlight: false },
          { hanzi: "。", pinyin: "", isPunctuation: true }
        ]
      }
    ],
    fullTextHanzi: "今天天气很好。王叔叔的水果店里有很多水果，有苹果、香蕉和西瓜。大卫问：“王叔叔，这个红苹果多少钱一斤？”王叔叔笑着说：“三块一斤，很甜！”大卫买了三斤苹果，一共九块，他很高兴。",
    fullTranslationIndo: "Hari ini cuaca sangat bagus. Di dalam toko buah Paman Wang ada banyak buah-buahan yang masih segar: ada apel, pisang, dan semangka. David pergi membeli apel. David bertanya: 'Paman Wang, berapa harga apel merah ini per setengah kilogram (satu jin)?' Paman Wang tersenyum dan menjawab: 'Tiga yuan per setengah kilo, sangat manis!' David membeli tiga jin apel, totalnya sembilan yuan. Dia merasa sangat senang.",
    culturalFootnote: "Catatan Budaya: 1斤 (yī jīn) di Tiongkok daratan setara dengan 500 gram (setengah kilogram). Koin 1块 adalah sebutan informal dari 1元 (yuán).",
    comprehensionQuiz: [
      {
        id: "cq-1",
        type: "PEMAHAMAN",
        question: "大卫买了什么水果？",
        questionSub: "Buah apa yang dibeli David?",
        options: [
          { id: "opt-1", hanzi: "香蕉", pinyin: "xiāngjiāo", meaning: "Pisang" },
          { id: "opt-2", hanzi: "苹果", pinyin: "píngguǒ", meaning: "Apel", isCorrect: true },
          { id: "opt-3", hanzi: "西瓜", pinyin: "xīguā", meaning: "Semangka" },
          { id: "opt-4", hanzi: "橘子", pinyin: "júzi", meaning: "Jeruk" }
        ],
        explanation: "Di dalam teks disebutkan: '大卫买了三斤苹果' (David membeli tiga jin apel)."
      },
      {
        id: "cq-2",
        type: "MENYIMAK",
        badge: "Audio Spesifik",
        question: "Dengarkan klip singkat lalu tentukan total uang yang dibayar David:",
        audioClipText: "大卫买了三斤苹果，一共九块钱。",
        options: [
          { id: "opt-a", text: "3 Kuai (三块)" },
          { id: "opt-b", text: "6 Kuai (六块)" },
          { id: "opt-c", text: "9 Kuai (九块)", isCorrect: true },
          { id: "opt-d", text: "12 Kuai (十二块)" }
        ],
        explanation: "Perhitungan: 3 jin x 3 kuai = 9 kuai (九块)."
      }
    ],
    quickGrammarNote: {
      title: "Catatan Tata Bahasa Cepat",
      pattern: "Pola Kata Tanya Harga: [Benda] + 多少钱 + [Satuan]",
      example: "Contoh: 苹果多少钱一斤？ Musim mangga segar biasanya hanya 5 yuan per jin di pasar tradisional Tiongkok."
    }
  },

  "HSK 2": {
    id: "reading-hsk2",
    hskLevel: "HSK 2",
    titleIndo: "Naik Kereta Cepat ke Beijing",
    titleHanzi: "坐高铁去北京",
    levelBadge: "HSK 2",
    typeBadge: "CERITA PENDEK",
    unitLabel: "UNIT 1.4 · BACAAN SATU PARAGRAF",
    audioLength: "01:25",
    backgroundLore: {
      title: "Latar Cerita (背景)",
      content: "David dan temannya hendak berlibur ke Beijing. Mereka memilih naik kereta cepat (高铁) karena lebih nyaman dan tepat waktu dibandingkan pesawat terbang."
    },
    sentences: [
      {
        id: "s2-1",
        tokens: [
          { hanzi: "这个", pinyin: "Zhège", highlight: false },
          { hanzi: "周末", pinyin: "zhōumò", highlight: false },
          { hanzi: "北京", pinyin: "Běijīng", highlight: false },
          { hanzi: "是", pinyin: "shì", highlight: false },
          { hanzi: "晴天", pinyin: "qíngtiān", highlight: true, highlightType: "vocab", meaning: "Cuaca cerah" },
          { hanzi: "。", pinyin: "", isPunctuation: true }
        ]
      },
      {
        id: "s2-2",
        tokens: [
          { hanzi: "我们", pinyin: "Wǒmen", highlight: false },
          { hanzi: "决定", pinyin: "juédìng", highlight: false },
          { hanzi: "去", pinyin: "qù", highlight: false },
          { hanzi: "旅游", pinyin: "lǚyóu", highlight: true, highlightType: "vocab", meaning: "Wisata" },
          { hanzi: "，", pinyin: "", isPunctuation: true },
          { hanzi: "而且", pinyin: "érqiě", highlight: false },
          { hanzi: "坐", pinyin: "zuò", highlight: false },
          { hanzi: "高铁", pinyin: "gāotiě", highlight: true, highlightType: "vocab", meaning: "Kereta Cepat" },
          { hanzi: "比", pinyin: "bǐ", highlight: true, highlightType: "grammar", meaning: "Daripada (Komparatif)" },
          { hanzi: "坐", pinyin: "zuò", highlight: false },
          { hanzi: "飞机", pinyin: "fēijī", highlight: false },
          { hanzi: "更", pinyin: "gèng", highlight: false },
          { hanzi: "方便", pinyin: "fāngbiàn", highlight: true, highlightType: "vocab", meaning: "Praktis" },
          { hanzi: "。", pinyin: "", isPunctuation: true }
        ]
      },
      {
        id: "s2-3",
        tokens: [
          { hanzi: "火车站", pinyin: "Huǒchēzhàn", highlight: false },
          { hanzi: "离", pinyin: "lí", highlight: true, highlightType: "grammar", meaning: "Jarak dari" },
          { hanzi: "我家", pinyin: "wǒ jiā", highlight: false },
          { hanzi: "很近", pinyin: "hěn jìn", highlight: true, highlightType: "measure", meaning: "Sangat dekat" },
          { hanzi: "，", pinyin: "", isPunctuation: true },
          { hanzi: "只要", pinyin: "zhǐyào", highlight: false },
          { hanzi: "十分钟", pinyin: "shí fēnzhōng", highlight: true, highlightType: "measure", meaning: "10 menit" },
          { hanzi: "。", pinyin: "", isPunctuation: true }
        ]
      },
      {
        id: "s2-4",
        tokens: [
          { hanzi: "车票", pinyin: "Chēpiào", highlight: false },
          { hanzi: "比", pinyin: "bǐ", highlight: true, highlightType: "grammar", meaning: "Dibanding" },
          { hanzi: "机票", pinyin: "jīpiào", highlight: false },
          { hanzi: "便宜", pinyin: "piányi", highlight: true, highlightType: "vocab", meaning: "Murah" },
          { hanzi: "很多", pinyin: "hěnduō", highlight: false },
          { hanzi: "，", pinyin: "", isPunctuation: true },
          { hanzi: "我们", pinyin: "wǒmen", highlight: false },
          { hanzi: "准备", pinyin: "zhǔnbèi", highlight: true, highlightType: "vocab", meaning: "Mempersiapkan" },
          { hanzi: "在", pinyin: "zài", highlight: false },
          { hanzi: "北京", pinyin: "Běijīng", highlight: false },
          { hanzi: "玩", pinyin: "wán", highlight: false },
          { hanzi: "三天", pinyin: "sān tiān", highlight: false },
          { hanzi: "。", pinyin: "", isPunctuation: true }
        ]
      }
    ],
    fullTextHanzi: "这个周末北京是晴天。我们决定去旅游，而且坐高铁比坐飞机更方便。火车站离我家很近，只要十分钟。车票比机票便宜很多，我们准备在北京玩三天。",
    fullTranslationIndo: "Akhir pekan ini cuaca di Beijing sangat cerah. Kami memutuskan untuk traveling, dan naik kereta cepat (高铁) jauh lebih praktis daripada naik pesawat terbang. Stasiun kereta apinya berjarak sangat dekat dari rumah saya, hanya butuh 10 menit. Tiket kereta juga jauh lebih murah daripada tiket pesawat, dan kami bersiap jalan-jalan di Beijing selama tiga hari.",
    culturalFootnote: "Catatan Budaya: Jaringan High-Speed Railway (高铁) di Tiongkok adalah yang terpanjang di dunia dan terkenal sangat tepat waktu.",
    comprehensionQuiz: [
      {
        id: "cq2-1",
        type: "PEMAHAMAN",
        question: "为什么他们选择坐高铁去北京？",
        questionSub: "Mengapa mereka memilih naik kereta cepat (高铁) ke Beijing?",
        options: [
          { id: "opt2-1", text: "因为北京在下大雨 (Karena Beijing hujan lebat)" },
          { id: "opt2-2", text: "因为比坐飞机更方便，车票也更便宜", isCorrect: true },
          { id: "opt2-3", text: "因为他们买不到机票 (Karena kehabisan tiket pesawat)" },
          { id: "opt2-4", text: "因为他们讨厌坐火车 (Karena mereka benci kereta)" }
        ],
        explanation: "Teks menyatakan: '坐高铁比坐飞机更方便' dan '车票比机票便宜很多'."
      },
      {
        id: "cq2-2",
        type: "MENYIMAK",
        badge: "Audio Spesifik HSK 2",
        question: "Dengarkan klip dan tentukan berapa lama waktu perjalanan dari rumah ke stasiun:",
        audioClipText: "火车站离我家很近，只要十分钟。",
        options: [
          { id: "opt2-a", text: "5 Menit (五分钟)" },
          { id: "opt2-b", text: "10 Menit (十分钟)", isCorrect: true },
          { id: "opt2-c", text: "20 Menit (二十分钟)" },
          { id: "opt2-d", text: "1 Jam (一个小时)" }
        ],
        explanation: "Dalam audio disebutkan: '只要十分钟' (hanya 10 menit)."
      }
    ],
    quickGrammarNote: {
      title: "Catatan Tata Bahasa HSK 2",
      pattern: "Pola Komparatif: A + 比 + B + Kata Sifat",
      example: "Contoh: 坐高铁比坐飞机方便。 (Naik kereta cepat lebih praktis daripada naik pesawat)."
    }
  },

  "HSK 3": {
    id: "reading-hsk3",
    hskLevel: "HSK 3",
    titleIndo: "Pengalaman Bekerja di Shanghai",
    titleHanzi: "在上海工作的经验",
    levelBadge: "HSK 3",
    typeBadge: "CERITA PENDEK",
    unitLabel: "UNIT 1.4 · BACAAN TINGKAT MENENGAH",
    audioLength: "01:40",
    backgroundLore: {
      title: "Latar Cerita (背景)",
      content: "Budi menceritakan pengalamannya beradaptasi dengan ritme kerja cepat di sebuah perusahaan teknologi di Shanghai dan bagaimana ia belajar menggunakan kalimat 把 dalam berkomunikasi sehari-hari."
    },
    sentences: [
      {
        id: "s3-1",
        tokens: [
          { hanzi: "来", pinyin: "Lái", highlight: false },
          { hanzi: "上海", pinyin: "Shànghǎi", highlight: false },
          { hanzi: "工作", pinyin: "gōngzuò", highlight: false },
          { hanzi: "已经", pinyin: "yǐjīng", highlight: false },
          { hanzi: "半年", pinyin: "bàn nián", highlight: false },
          { hanzi: "了", pinyin: "le", highlight: false },
          { hanzi: "，", pinyin: "", isPunctuation: true },
          { hanzi: "我", pinyin: "wǒ", highlight: false },
          { hanzi: "发现", pinyin: "fāxiàn", highlight: true, highlightType: "vocab", meaning: "Menemukan" },
          { hanzi: "这里", pinyin: "zhèlǐ", highlight: false },
          { hanzi: "的", pinyin: "de", highlight: false },
          { hanzi: "生活", pinyin: "shēnghuó", highlight: false },
          { hanzi: "节奏", pinyin: "jiézòu", highlight: false },
          { hanzi: "非常", pinyin: "fēicháng", highlight: false },
          { hanzi: "快", pinyin: "kuài", highlight: false },
          { hanzi: "。", pinyin: "", isPunctuation: true }
        ]
      },
      {
        id: "s3-2",
        tokens: [
          { hanzi: "今天", pinyin: "Jīntiān", highlight: false },
          { hanzi: "早晨", pinyin: "zǎochén", highlight: false },
          { hanzi: "，", pinyin: "", isPunctuation: true },
          { hanzi: "经理", pinyin: "jīnglǐ", highlight: false },
          { hanzi: "要求", pinyin: "yāoqiú", highlight: false },
          { hanzi: "我们", pinyin: "wǒmen", highlight: false },
          { hanzi: "把", pinyin: "bǎ", highlight: true, highlightType: "grammar", meaning: "Partikel 把" },
          { hanzi: "新项目", pinyin: "xīn xiàngmù", highlight: false },
          { hanzi: "的", pinyin: "de", highlight: false },
          { hanzi: "方案", pinyin: "fāng'àn", highlight: false },
          { hanzi: "打印", pinyin: "dǎyìn", highlight: true, highlightType: "vocab", meaning: "Mencetak" },
          { hanzi: "出来", pinyin: "chūlái", highlight: false },
          { hanzi: "。", pinyin: "", isPunctuation: true }
        ]
      },
      {
        id: "s3-3",
        tokens: [
          { hanzi: "虽然", pinyin: "Suīrán", highlight: false },
          { hanzi: "工作", pinyin: "gōngzuò", highlight: false },
          { hanzi: "很忙", pinyin: "hěn máng", highlight: false },
          { hanzi: "，", pinyin: "", isPunctuation: true },
          { hanzi: "但", pinyin: "dàn", highlight: false },
          { hanzi: "同事们", pinyin: "tóngshìmen", highlight: false },
          { hanzi: "都", pinyin: "dōu", highlight: false },
          { hanzi: "很愿意", pinyin: "hěn yuànyì", highlight: false },
          { hanzi: "帮助", pinyin: "bāngzhù", highlight: false },
          { hanzi: "我", pinyin: "wǒ", highlight: false },
          { hanzi: "解决", pinyin: "jiějué", highlight: true, highlightType: "vocab", meaning: "Menyelesaikan" },
          { hanzi: "问题", pinyin: "wèntí", highlight: false },
          { hanzi: "。", pinyin: "", isPunctuation: true }
        ]
      },
      {
        id: "s3-4",
        tokens: [
          { hanzi: "我", pinyin: "Wǒ", highlight: false },
          { hanzi: "相信", pinyin: "xiāngxìn", highlight: true, highlightType: "vocab", meaning: "Percaya" },
          { hanzi: "只要", pinyin: "zhǐyào", highlight: false },
          { hanzi: "继续", pinyin: "jìxù", highlight: false },
          { hanzi: "努力", pinyin: "nǔlì", highlight: true, highlightType: "vocab", meaning: "Kerja keras" },
          { hanzi: "，", pinyin: "", isPunctuation: true },
          { hanzi: "我的", pinyin: "wǒ de", highlight: false },
          { hanzi: "中文", pinyin: "zhōngwén", highlight: false },
          { hanzi: "会", pinyin: "huì", highlight: false },
          { hanzi: "越说", pinyin: "yuè shuō", highlight: true, highlightType: "grammar", meaning: "Semakin berbicara" },
          { hanzi: "越流利", pinyin: "yuè liúlì", highlight: true, highlightType: "grammar", meaning: "Semakin fasih" },
          { hanzi: "！", pinyin: "", isPunctuation: true }
        ]
      }
    ],
    fullTextHanzi: "来上海工作已经半年了，我发现这里的生活节奏非常快。今天早晨，经理要求我们把新项目的方案打印出来。虽然工作很忙，但同事们都很愿意帮助我解决问题。我相信只要继续努力，我的中文会越说越流利！",
    fullTranslationIndo: "Sudah setengah tahun saya bekerja di Shanghai, dan saya mendapati bahwa ritme kehidupan di sini sangat cepat. Pagi ini, manajer meminta kami untuk mencetak berkas rencana proyek baru. Meskipun pekerjaannya sibuk, rekan kerja sangat bersedia membantu saya memecahkan masalah. Saya percaya asalkan terus bekerja keras, bahasa Mandarin saya akan semakin fasih!",
    culturalFootnote: "Catatan Budaya: Shanghai adalah pusat finansial internasional Tiongkok di mana profesionalisme dan adaptabilitas multibahasa sangat dihargai.",
    comprehensionQuiz: [
      {
        id: "cq3-1",
        type: "PEMAHAMAN",
        question: "今天早晨经理要求他们做什么？",
        questionSub: "Apa yang diminta manajer pagi ini?",
        options: [
          { id: "opt3-1", text: "把新项目的方案打印出来 (Mencetak rencana proyek baru)", isCorrect: true },
          { id: "opt3-2", text: "去火车站接客户 (Menjemput klien di stasiun)" },
          { id: "opt3-3", text: "取消下午的会议 (Membatalkan rapat sore)" },
          { id: "opt3-4", text: "买三斤苹果 (Membeli 3 jin apel)" }
        ],
        explanation: "Dalam kalimat dinyatakan: '经理要求我们把新项目的方案打印出来'."
      },
      {
        id: "cq3-2",
        type: "MENYIMAK",
        badge: "Audio HSK 3",
        question: "Dengarkan klip dan tentukan apa yang dipercayai oleh penulis:",
        audioClipText: "我相信只要继续努力，我的中文会越说越流利！",
        options: [
          { id: "opt3-a", text: "Kerja keras akan membuat bahasa Mandarinnya semakin fasih", isCorrect: true },
          { id: "opt3-b", text: "Ia ingin segera pindah dari Shanghai" },
          { id: "opt3-c", text: "Rekan kerjanya tidak ramah" },
          { id: "opt3-d", text: "Ia ingin mengganti profesinya" }
        ],
        explanation: "Penulis optimis: '我相信只要继续努力，我的中文会越说越流利！'"
      }
    ],
    quickGrammarNote: {
      title: "Catatan Tata Bahasa HSK 3",
      pattern: "Pola Korelatif: 越...越... (Semakin... semakin...)",
      example: "Contoh: 越说越流利 (Semakin berbicara, semakin lancar dan fasih)."
    }
  }
};

// ==========================================
// 5. QUIZ QUESTIONS PER LEVEL
// ==========================================
export const QUIZ_BY_LEVEL = {
  "HSK 1": {
    moduleId: "mod-1-3",
    title: "Evaluasi Modul 3: Belanja (Unit 1 - 4)",
    timeLimitSeconds: 600,
    xpAccumulated: 500,
    questions: [
      {
        id: "q1",
        number: 1,
        type: "sentence_arrangement",
        typeName: "SUSUN KALIMAT (SENTENCE ARRANGEMENT) & AUDIO",
        prompt: "Dengarkan audio klip native, lalu susun kata-kata berikut menjadi kalimat tanya yang benar sesuai tata bahasa:",
        audioText: "这个苹果多少钱一斤？",
        speakerOrigin: "Pelafalan Penutur Asli (Beijing Native) · KECEPATAN STANDAR · HSK 1 FORMAT",
        targetSlotsCount: 4,
        correctOrder: ["这个", "苹果", "多少钱", "一斤"],
        hasQuestionMark: true,
        wordBank: [
          { id: "wb1", hanzi: "多少钱", pinyin: "duōshao qián" },
          { id: "wb2", hanzi: "这个", pinyin: "zhège" },
          { id: "wb3", hanzi: "很好吃", pinyin: "hěn hǎochī", isDistractor: true },
          { id: "wb4", hanzi: "一斤", pinyin: "yì jīn" },
          { id: "wb5", hanzi: "苹果", pinyin: "píngguǒ" }
        ],
        grammarExplanation: {
          tutorVerified: true,
          ruleText: "Aturan Struktur Kalimat Tanya Harga: Kata tanya 多少钱 (berapa harganya) diletakkan setelah objek penunjuk 这个苹果 (apel ini) untuk menanyakan harga per satuan takaran 一斤 (500 gram/setengah kilogram).",
          formula: "[Subjek/Topik] + [多少钱] + [Satuan Takaran]?",
          example: "Contoh: 这个西瓜多少钱一个？"
        }
      },
      {
        id: "q2",
        number: 2,
        type: "match_pairs",
        typeName: "COCOKKAN HANZI & ARTI (PAIR MATCHING)",
        prompt: "Hubungkan antara pasangan kata kosakata berikut dengan artinya yang sesuai:",
        badge: "4 PASANGAN SESUAI",
        pairs: [
          { hanzi: "便宜", pinyin: "piányi", meaning: "Murah (Terjangkau)" },
          { hanzi: "贵", pinyin: "guì", meaning: "Mahal (Antonym 便宜)" },
          { hanzi: "买", pinyin: "mǎi (Nada 3)", meaning: "Membeli (Aktivitas belanja)" },
          { hanzi: "卖", pinyin: "mài (Nada 4)", meaning: "Menjual (Transaksi dagang)" }
        ],
        tipNote: "Tips Nada: 买 (mǎi) nada 3 turun naik berarti membeli, sedangkan 卖 (mài) nada 4 tegas ke bawah berarti menjual."
      },
      {
        id: "q3",
        number: 3,
        type: "match_pinyin",
        typeName: "COCOKKAN HANZI & PINYIN TEPAT",
        prompt: "Pilihlah pinyin dengan nada yang tepat untuk karakter berikut:",
        hanzi: "西瓜",
        meaningPrompt: "Semangka",
        options: [
          { id: "p1", text: "xīguǎ", explanation: "Salah nada pada suku kata kedua" },
          { id: "p2", text: "xīguā", isCorrect: true, explanation: "Tepat! Keduanya nada 1 tinggi datar." },
          { id: "p3", text: "xíguā", explanation: "Salah nada pada suku kata pertama" },
          { id: "p4", text: "xǐguà", explanation: "Nada tidak sesuai" }
        ]
      },
      {
        id: "q4",
        number: 4,
        type: "fill_blank",
        typeName: "MELENGKAPI KATA (FILL IN THE BLANKS)",
        prompt: "Pilihlah kata yang tepat untuk melengkapi kalimat belanja berikut:",
        sentencePrefix: "老板，一共",
        sentenceSuffix: "？我要用微信支付。",
        sentenceIndo: "Bos, semuanya berapa harganya? Saya mau bayar pakai WeChat.",
        options: [
          { id: "fb1", hanzi: "多少钱", pinyin: "duōshao qián", isCorrect: true },
          { id: "fb2", hanzi: "什么", pinyin: "shénme" },
          { id: "fb3", hanzi: "哪里", pinyin: "nǎlǐ" },
          { id: "fb4", hanzi: "几月", pinyin: "jǐ yuè" }
        ],
        explanation: "Untuk menanyakan total harga uang, gunakan frasa 一共多少钱？ (yígòng duōshao qián)."
      },
      {
        id: "q5",
        number: 5,
        type: "listening_mcq",
        typeName: "MENYIMAK & MEMILIH ARTI DARI AUDIO",
        prompt: "Dengarkan rekaman audio penutur asli berikut dan pilihlah arti bahasa Indonesia yang benar:",
        audioText: "太贵了，可以便宜一点儿吗？",
        speakerOrigin: "Penutur Asli Mandarin · Tingkat Kecepatan 1.0x",
        options: [
          { id: "l1", text: "Terlalu mahal, bolehkah lebih murah sedikit?", isCorrect: true },
          { id: "l2", text: "Sangat murah, saya mau beli dua jin." },
          { id: "l3", text: "Buah ini tidak manis, boleh saya ganti?" },
          { id: "l4", text: "Berapa banyak apel yang ingin Anda beli?" }
        ],
        explanation: "太贵了 = Terlalu mahal; 便宜一点儿 = lebih murah sedikit."
      },
      {
        id: "q6",
        number: 6,
        type: "cultural_knowledge",
        typeName: "WAWASAN BUDAYA & PENGUKURAN TIONGKOK",
        prompt: "Jika Anda membeli '两斤 (liǎng jīn)' buah di pasar kota Beijing, berapakah berat sebenarnya yang Anda dapatkan?",
        options: [
          { id: "ck1", text: "500 gram (setengah kilogram)" },
          { id: "ck2", text: "1.000 gram (1 kilogram)", isCorrect: true },
          { id: "ck3", text: "2.000 gram (2 kilogram)" },
          { id: "ck4", text: "200 gram" }
        ],
        explanation: "1 斤 (jīn) = 500 gram, sehingga 两斤 (2 jin) setara dengan 1.000 gram atau tepat 1 kilogram."
      }
    ]
  },

  "HSK 2": {
    moduleId: "mod-2-1",
    title: "Evaluasi Modul HSK 2: Traveling & Komparasi",
    timeLimitSeconds: 600,
    xpAccumulated: 600,
    questions: [
      {
        id: "q2-1",
        number: 1,
        type: "sentence_arrangement",
        typeName: "SUSUN KALIMAT KOMPARATIF 比",
        prompt: "Dengarkan audio, lalu susun keping kata menjadi kalimat komparasi yang benar:",
        audioText: "坐高铁比坐飞机方便。",
        speakerOrigin: "Pelafalan Penutur Asli · HSK 2 FORMAT",
        targetSlotsCount: 4,
        correctOrder: ["坐高铁", "比", "坐飞机", "方便"],
        wordBank: [
          { id: "w2-1", hanzi: "方便", pinyin: "fāngbiàn" },
          { id: "w2-2", hanzi: "比", pinyin: "bǐ" },
          { id: "w2-3", hanzi: "坐飞机", pinyin: "zuò fēijī" },
          { id: "w2-4", hanzi: "很远", pinyin: "hěn yuǎn", isDistractor: true },
          { id: "w2-5", hanzi: "坐高铁", pinyin: "zuò gāotiě" }
        ],
        grammarExplanation: {
          tutorVerified: true,
          ruleText: "Rumus Komparasi: [Subjek A] + [比] + [Objek B] + [Kata Sifat] -> 坐高铁比坐飞机方便。",
          formula: "A + 比 + B + Kata Sifat",
          example: "Contoh: 哥哥比弟弟高。 (Kakak lebih tinggi dari adik)."
        }
      },
      {
        id: "q2-2",
        number: 2,
        type: "match_pairs",
        typeName: "COCOKKAN KOSAKATA HSK 2 & ARTI",
        prompt: "Hubungkan kosakata seputar perjalanan berikut dengan artinya:",
        pairs: [
          { hanzi: "机场", pinyin: "jīchǎng", meaning: "Bandara" },
          { hanzi: "方便", pinyin: "fāngbiàn", meaning: "Praktis / Mudah" },
          { hanzi: "旅游", pinyin: "lǚyóu", meaning: "Wisata / Traveling" },
          { hanzi: "准备", pinyin: "zhǔnbèi", meaning: "Mempersiapkan" }
        ],
        tipNote: "Tips: 机场 (jīchǎng) terdiri dari 机 (mesin/pesawat) dan 场 (lapangan)."
      },
      {
        id: "q2-3",
        number: 3,
        type: "fill_blank",
        typeName: "STRUKTUR JARAK 离 (LÍ)",
        prompt: "Pilihlah kata depan yang tepat untuk menyatakan jarak:",
        sentencePrefix: "火车站",
        sentenceSuffix: "我家很近，只要十分钟。",
        sentenceIndo: "Stasiun kereta berjarak sangat dekat dari rumah saya, hanya butuh 10 menit.",
        options: [
          { id: "f2-1", hanzi: "离", pinyin: "lí", isCorrect: true },
          { id: "f2-2", hanzi: "在", pinyin: "zài" },
          { id: "f2-3", hanzi: "从", pinyin: "cóng" },
          { id: "f2-4", hanzi: "对", pinyin: "duì" }
        ],
        explanation: "Pola baku menyatakan jarak antara dua tempat: Tempat A + 离 + Tempat B + 近/远."
      },
      {
        id: "q2-4",
        number: 4,
        type: "listening_mcq",
        typeName: "MENYIMAK INFORMASI HSK 2",
        prompt: "Dengarkan rekaman berikut dan tentukan bagaimana cuaca di Beijing akhir pekan ini:",
        audioText: "这个周末北京是晴天，非常适合出去旅游。",
        options: [
          { id: "l2-1", text: "Cuaca cerah, sangat cocok untuk berwisata", isCorrect: true },
          { id: "l2-2", text: "Hujan salju lebat, jalanan licin" },
          { id: "l2-3", text: "Berangin kencang dan dingin" },
          { id: "l2-4", text: "Cuaca buruk sehingga penerbangan dibatalkan" }
        ],
        explanation: "Karakter 晴天 (qíngtiān) berarti cuaca cerah."
      }
    ]
  },

  "HSK 3": {
    moduleId: "mod-3-1",
    title: "Evaluasi Modul HSK 3: Karir & Pola 把",
    timeLimitSeconds: 600,
    xpAccumulated: 750,
    questions: [
      {
        id: "q3-1",
        number: 1,
        type: "sentence_arrangement",
        typeName: "SUSUN KALIMAT POLA 把 (BǍ)",
        prompt: "Susun kepingan kata berikut menjadi kalimat pola 把 yang sempurna:",
        audioText: "请把这份文件打印出来。",
        speakerOrigin: "Penutur Asli Beijing · HSK 3 FORMAT",
        targetSlotsCount: 4,
        correctOrder: ["请", "把", "这份文件", "打印出来"],
        wordBank: [
          { id: "w3-1", hanzi: "打印出来", pinyin: "dǎyìn chūlái" },
          { id: "w3-2", hanzi: "把", pinyin: "bǎ" },
          { id: "w3-3", hanzi: "这份文件", pinyin: "zhè fèn wénjiàn" },
          { id: "w3-4", hanzi: "喜欢", pinyin: "xǐhuan", isDistractor: true },
          { id: "w3-5", hanzi: "请", pinyin: "qǐng" }
        ],
        grammarExplanation: {
          tutorVerified: true,
          ruleText: "Rumus Kalimat 把: Subjek + 把 + Objek + Kata Kerja + Pelengkap Hasil -> 请把这份文件打印出来。",
          formula: "Subjek + 把 + Objek + Kata Kerja + Hasil",
          example: "Contoh: 我把咖啡喝完了。 (Saya telah menghabiskan kopinya)."
        }
      },
      {
        id: "q3-2",
        number: 2,
        type: "match_pairs",
        typeName: "COCOKKAN KOSAKATA HSK 3 & ARTI",
        prompt: "Hubungkan kata kerja profesional HSK 3 dengan artinya:",
        pairs: [
          { hanzi: "决定", pinyin: "juédìng", meaning: "Memutuskan" },
          { hanzi: "解决", pinyin: "jiějué", meaning: "Menyelesaikan Masalah" },
          { hanzi: "相信", pinyin: "xiāngxìn", meaning: "Percaya / Yakin" },
          { hanzi: "习惯", pinyin: "xíguàn", meaning: "Kebiasaan / Terbiasa" }
        ],
        tipNote: "Tips: 解决问题 adalah kolokasi yang sangat sering muncul pada ujian HSK 3."
      },
      {
        id: "q3-3",
        number: 3,
        type: "fill_blank",
        typeName: "POLA KORELATIF 越...越...",
        prompt: "Lengkapi kalimat dengan kata penghubung yang tepat:",
        sentencePrefix: "只要坚持练习，你的汉语会",
        sentenceSuffix: "说越流利。",
        sentenceIndo: "Asalkan konsisten berlatih, bahasa Mandarinmu akan semakin lancar.",
        options: [
          { id: "f3-1", hanzi: "越", pinyin: "yuè", isCorrect: true },
          { id: "f3-2", hanzi: "很", pinyin: "hěn" },
          { id: "f3-3", hanzi: "太", pinyin: "tài" },
          { id: "f3-4", hanzi: "更", pinyin: "gèng" }
        ],
        explanation: "Pola 越 A 越 B berarti 'semakin A semakin B'."
      },
      {
        id: "q3-4",
        number: 4,
        type: "reading_comprehension",
        typeName: "PEMAHAMAN BACAAN TINGKAT HSK 3",
        prompt: "Bacalah kutipan dan pilih kesimpulan yang benar:",
        passage: "虽然新公司的工作节奏很快，但同事们都很热情，经常耐心地帮助我解决业务上的各种问题。",
        options: [
          { id: "rc3-1", text: "Rekan kerja di kantor baru sangat ramah dan suka membantu", isCorrect: true },
          { id: "rc3-2", text: "Penulis merasa tidak cocok bekerja di Shanghai" },
          { id: "rc3-3", text: "Perusahaan baru sepi dan tidak ada pekerjaan" },
          { id: "rc3-4", text: "Penulis memutuskan untuk berhenti bekerja" }
        ],
        explanation: "Teks menyatakan: '同事们都很热情，经常耐心地帮助我解决业务上的各种问题'."
      }
    ]
  }
};

// ==========================================
// 6. HELPER SELECTORS BY LEVEL
// ==========================================
export function getModulesByLevel(level = "HSK 1") {
  return MODULES_BY_LEVEL[level] || MODULES_BY_LEVEL["HSK 1"];
}

export function getVocabulariesByLevel(level = "HSK 1") {
  return VOCABULARY_BY_LEVEL[level] || VOCABULARY_BY_LEVEL["HSK 1"];
}

export function getGrammarByLevel(level = "HSK 1") {
  return GRAMMAR_BY_LEVEL[level] || GRAMMAR_BY_LEVEL["HSK 1"];
}

export function getReadingStoryByLevel(level = "HSK 1") {
  return READING_STORIES_BY_LEVEL[level] || READING_STORIES_BY_LEVEL["HSK 1"];
}

export function getQuizByLevel(level = "HSK 1") {
  return QUIZ_BY_LEVEL[level] || QUIZ_BY_LEVEL["HSK 1"];
}

// Conversation data remains accessible for practical daily communication
export { DAILY_CONVERSATIONS } from './conversationsData.js';
