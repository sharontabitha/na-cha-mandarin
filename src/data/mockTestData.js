// Mock Test Data Resmi HSK (Simulasi Ujian Komprehensif)
// Mencakup 4 Aspek Kemampuan Berbahasa:
// 1. Listening (听力 Tīnglì)
// 2. Reading (阅读 Yuèdú)
// 3. Writing (书写 Shūxiě)
// 4. Speaking (口语 Kǒuyǔ - Evaluasi Pelafalan & Nada Native)
// PENTING: Sesuai pedoman sistem, TIDAK ADA mikrofon / perekam suara (Strictly NO microphone / voice recording).

export const MOCK_TESTS_BY_LEVEL = {
  "HSK 1": {
    level: "HSK 1",
    title: "Simulasi Ujian Resmi HSK 1 Komprehensif",
    durationMinutes: 35,
    passScore: 180,
    maxScore: 300,
    sections: [
      {
        id: "listening",
        name: "Listening (听力)",
        icon: "Headphones",
        description: "Menyimak klip audio penutur asli Beijing & memilih jawaban tepat.",
        questions: [
          {
            id: "hsk1-l1",
            section: "listening",
            type: "audio_choice",
            typeName: "🎧 MENYIMAK (LISTENING COMPREHENSION)",
            prompt: "Dengarkan klip audio percakapan pendek berikut, lalu pilih arti yang dimaksud:",
            audioText: "请问，这个苹果多少钱一斤？",
            options: [
              { id: "opt-l1-a", text: "Menanyakan berapa harga satu jin apel ini", isCorrect: true },
              { id: "opt-l1-b", text: "Menanyakan di mana toko buah terdekat" },
              { id: "opt-l1-c", text: "Meminta apel yang paling manis" },
              { id: "opt-l1-d", text: "Menawarkan diskon untuk buah apel" }
            ],
            explanation: "Audio berbunyi: 'Qǐngwèn, zhège píngguǒ duōshao qián yì jīn?' yang berarti 'Permisi, berapa harga apel ini per satu jin (500g)?'."
          },
          {
            id: "hsk1-l2",
            section: "listening",
            type: "audio_choice",
            typeName: "🎧 MENYIMAK (LISTENING COMPREHENSION)",
            prompt: "Dengarkan audio respon berikut dan tentukan situasi yang tepat:",
            audioText: "太客气了，不客气！明天见！",
            options: [
              { id: "opt-l2-a", text: "Menjawab ucapan terima kasih lalu berpamitan 'Sampai jumpa besok'", isCorrect: true },
              { id: "opt-l2-b", text: "Menolak tawaran makanan secara sopan" },
              { id: "opt-l2-c", text: "Meminta maaf karena datang terlambat" },
              { id: "opt-l2-d", text: "Memesan minuman teh susu di kafe" }
            ],
            explanation: "不客气 (bú kèqi = sama-sama) dan 明天见 (míngtiān jiàn = sampai jumpa besok) adalah ungkapan salam perpisahan harian."
          }
        ]
      },
      {
        id: "reading",
        name: "Reading (阅读)",
        icon: "BookOpen",
        description: "Membaca teks Hanzi dan mencocokkan makna gramatikal.",
        questions: [
          {
            id: "hsk1-r1",
            section: "reading",
            type: "single_choice",
            typeName: "📖 MEMBACA (READING COMPREHENSION)",
            prompt: "Baca kalimat berikut dan tentukan pernyataan yang benar:\n\n'我明天下午三点去中国银行买东西。'",
            options: [
              { id: "opt-r1-a", text: "Penulis akan pergi ke Bank China besok jam 3 sore", isCorrect: true },
              { id: "opt-r1-b", text: "Penulis kemarin sudah pergi ke Bank China" },
              { id: "opt-r1-c", text: "Penulis bekerja di Bank China setiap jam 3" },
              { id: "opt-r1-d", text: "Penulis mengajak temannya ke Bank China hari ini" }
            ],
            explanation: "明天 (besok) + 下午三点 (jam 3 sore) + 去中国银行 (pergi ke Bank of China)."
          },
          {
            id: "hsk1-r2",
            section: "reading",
            type: "single_choice",
            typeName: "📖 MEMBACA (READING COMPREHENSION)",
            prompt: "Pilihlah kata rumpang yang paling tepat untuk melengkapi kalimat:\n\n'李老师是我们的中文老师，______ 非常喜欢她。'",
            options: [
              { id: "opt-r2-a", text: "我们 (wǒmen - kami / kita)", isCorrect: true },
              { id: "opt-r2-b", text: "什么时候 (shénme shíhou - kapan)" },
              { id: "opt-r2-c", text: "哪里 (nǎlǐ - mana)" },
              { id: "opt-r2-d", text: "多少 (duōshao - berapa)" }
            ],
            explanation: "Subjek jamak '我们' (kami/kita) paling logis berpasangan dengan '非常喜欢她' (sangat menyukai beliau)."
          }
        ]
      },
      {
        id: "writing",
        name: "Writing (书写)",
        icon: "PenTool",
        description: "Menyusun konstruksi tata bahasa Hanzi menjadi kalimat yang tepat.",
        questions: [
          {
            id: "hsk1-w1",
            section: "writing",
            type: "sentence_arrangement",
            typeName: "✍️ MENULIS (SENTENCE SYNTAX ARRANGEMENT)",
            prompt: "Susun kata-kata berikut menjadi struktur kalimat Mandarin yang benar:",
            targetSlotsCount: 4,
            correctOrder: ["她", "是", "我的", "中国朋友"],
            wordBank: [
              { id: "wb-w1-1", hanzi: "中国朋友", pinyin: "Zhōngguó péngyou" },
              { id: "wb-w1-2", hanzi: "她", pinyin: "tā" },
              { id: "wb-w1-3", hanzi: "我的", pinyin: "wǒ de" },
              { id: "wb-w1-4", hanzi: "是", pinyin: "shì" }
            ],
            explanation: "Rumus Kalimat Nominal: [Subjek: 她] + [Kopula: 是] + [Frasa Kepemilikan: 我的] + [Objek: 中国朋友]."
          },
          {
            id: "hsk1-w2",
            section: "writing",
            type: "sentence_arrangement",
            typeName: "✍️ MENULIS (SENTENCE SYNTAX ARRANGEMENT)",
            prompt: "Susun kata-kata penunjuk tempat berikut menjadi kalimat yang gramatikal:",
            targetSlotsCount: 4,
            correctOrder: ["爸爸", "在", "家", "看书"],
            wordBank: [
              { id: "wb-w2-1", hanzi: "看书", pinyin: "kàn shū" },
              { id: "wb-w2-2", hanzi: "在", pinyin: "zài" },
              { id: "wb-w2-3", hanzi: "爸爸", pinyin: "bàba" },
              { id: "wb-w2-4", hanzi: "家", pinyin: "jiā" }
            ],
            explanation: "Pola Lokasi Preposisi 在: [Subjek: 爸爸] + [在 + Tempat: 家] + [Aktivitas: 看书]."
          }
        ]
      },
      {
        id: "speaking",
        name: "Speaking (口语)",
        icon: "Mic",
        description: "Evaluasi penguasaan pelafalan, nada pitch (Nada 1-4), dan intonasi penutur asli.",
        questions: [
          {
            id: "hsk1-s1",
            section: "speaking",
            type: "tone_speaking",
            typeName: "🗣️ PELAFALAN & NADA (ORAL TONE EVALUATION)",
            prompt: "Dengarkan audio penutur asli mengucapkan karakter '奶茶' (nǎichá), lalu tentukan kombinasi kontur nada yang diucapkan:",
            audioText: "奶茶",
            options: [
              { id: "opt-s1-a", text: "Nada 3 Lengkung (nǎi) + Nada 2 Naik (chá)", isCorrect: true },
              { id: "opt-s1-b", text: "Nada 1 Datar (nāi) + Nada 4 Menukik (chà)" },
              { id: "opt-s1-c", text: "Nada 2 Naik (nái) + Nada 3 Lengkung (chǎ)" },
              { id: "opt-s1-d", text: "Nada 4 Menukik (nài) + Nada 1 Datar (chā)" }
            ],
            explanation: "Kata 奶茶 dilafalkan nǎichá: 奶 menggunakan Nada ke-3 (214) dan 茶 menggunakan Nada ke-2 (35)."
          },
          {
            id: "hsk1-s2",
            section: "speaking",
            type: "audio_choice",
            typeName: "🗣️ PELAFALAN & NADA (ORAL TONE EVALUATION)",
            prompt: "Dengarkan model kalimat lisan berikut. Manakah variasi pengucapan yang benar saat menanyakan kabar teman lama?",
            audioText: "好久不见，你最近好吗？",
            options: [
              { id: "opt-s2-a", text: "Hǎojiǔ bú jiàn, nǐ zuìjìn hǎo ma? (Intonasi ramah & bersahabat)", isCorrect: true },
              { id: "opt-s2-b", text: "Hǎo jiàn bú jiǔ, nǐ qù nǎlǐ ma? (Susunan nada terbalik)" },
              { id: "opt-s2-c", text: "Wǒ hěn hǎo, bù yào xièxie (Respons tanpa sapaan)" },
              { id: "opt-s2-d", text: "Duōshao qián yí gè (Pertanyaan harga tidak relevan)" }
            ],
            explanation: "Pengucapan '好久不见，你最近好吗？' (Sudah lama tidak bertemu, bagaimana kabarmu akhir-akhir ini?) adalah sapaan lisan standar HSK 1."
          }
        ]
      }
    ]
  },
  "HSK 2": {
    level: "HSK 2",
    title: "Simulasi Ujian Resmi HSK 2 Komprehensif",
    durationMinutes: 40,
    passScore: 180,
    maxScore: 300,
    sections: [
      {
        id: "listening",
        name: "Listening (听力)",
        icon: "Headphones",
        description: "Menyimak dialog situasional stasiun, bandara, dan cuaca.",
        questions: [
          {
            id: "hsk2-l1",
            section: "listening",
            type: "audio_choice",
            typeName: "🎧 MENYIMAK (LISTENING COMPREHENSION)",
            prompt: "Dengarkan percakapan stasiun kereta berikut dan pilih informasi yang benar:",
            audioText: "火车站离这里不远，走路十五分钟就到了。",
            options: [
              { id: "opt-2l1-a", text: "Stasiun kereta dekat, cukup jalan kaki 15 menit sudah sampai", isCorrect: true },
              { id: "opt-2l1-b", text: "Stasiun kereta sangat jauh, harus naik taksi satu jam" },
              { id: "opt-2l1-c", text: "Kereta api sudah berangkat lima belas menit yang lalu" },
              { id: "opt-2l1-d", text: "Tiket kereta sudah habis terjual" }
            ],
            explanation: "离这里不远 (tidak jauh dari sini) + 走路十五分钟 (jalan kaki 15 menit) + 就到了 (sudah sampai)."
          }
        ]
      },
      {
        id: "reading",
        name: "Reading (阅读)",
        icon: "BookOpen",
        description: "Membaca teks komparasi dan kondisi waktu.",
        questions: [
          {
            id: "hsk2-r1",
            section: "reading",
            type: "single_choice",
            typeName: "📖 MEMBACA (READING COMPREHENSION)",
            prompt: "Cermati kalimat berikut:\n\n'今天北京的天气比昨天更冷，出门的时候要多穿一件衣服。'\n\nApa saran yang diberikan?",
            options: [
              { id: "opt-2r1-a", text: "Mengenakan pakaian lebih tebal saat keluar rumah karena lebih dingin", isCorrect: true },
              { id: "opt-2r1-b", text: "Tidak perlu memakai jaket karena cuaca cerah" },
              { id: "opt-2r1-c", text: "Membeli tiket pesawat ke Beijing besok" },
              { id: "opt-2r1-d", text: "Menunggu musim panas sebelum keluar rumah" }
            ],
            explanation: "比昨天更冷 (lebih dingin dari kemarin) -> 多穿一件衣服 (pakai pakaian lebih tebal)."
          }
        ]
      },
      {
        id: "writing",
        name: "Writing (书写)",
        icon: "PenTool",
        description: "Menyusun kalimat komparasi 比 (bǐ).",
        questions: [
          {
            id: "hsk2-w1",
            section: "writing",
            type: "sentence_arrangement",
            typeName: "✍️ MENULIS (SENTENCE SYNTAX ARRANGEMENT)",
            prompt: "Susun struktur kalimat perbandingan 比 (bǐ) berikut:",
            targetSlotsCount: 4,
            correctOrder: ["哥哥", "比", "我", "高三公分"],
            wordBank: [
              { id: "wb-2w1-1", hanzi: "高三公分", pinyin: "gāo sān gōngfēn" },
              { id: "wb-2w1-2", hanzi: "哥哥", pinyin: "gēge" },
              { id: "wb-2w1-3", hanzi: "比", pinyin: "bǐ" },
              { id: "wb-2w1-4", hanzi: "我", pinyin: "wǒ" }
            ],
            explanation: "Struktur Komparatif: [A] + [比] + [B] + [Kata Sifat] + [Selisih Ukuran]."
          }
        ]
      },
      {
        id: "speaking",
        name: "Speaking (口语)",
        icon: "Mic",
        description: "Pengucapan intonasi komparasi dan sapaan.",
        questions: [
          {
            id: "hsk2-s1",
            section: "speaking",
            type: "audio_choice",
            typeName: "🗣️ PELAFALAN & NADA (ORAL TONE EVALUATION)",
            prompt: "Dengarkan kalimat berikut dan tentukan nada penekanan (stress) utama saat membandingkan:",
            audioText: "西瓜比苹果更甜！",
            options: [
              { id: "opt-2s1-a", text: "Penekanan pada kata 更 (gèng - lebih) dan 甜 (tián - manis)", isCorrect: true },
              { id: "opt-2s1-b", text: "Penekanan datar tanpa perubahan nada" },
              { id: "opt-2s1-c", text: "Penekanan hanya pada kata apel (苹果)" },
              { id: "opt-2s1-d", text: "Kalimat bernada interogatif/bertanya" }
            ],
            explanation: "Dalam kalimat komparatif '更甜', penutur asli menekankan adverbia derajat '更' (nada ke-4 menukik tegas)."
          }
        ]
      }
    ]
  },
  "HSK 3": {
    level: "HSK 3",
    title: "Simulasi Ujian Resmi HSK 3 Komprehensif",
    durationMinutes: 45,
    passScore: 180,
    maxScore: 300,
    sections: [
      {
        id: "listening",
        name: "Listening (听力)",
        icon: "Headphones",
        description: "Menyimak konteks rapat kantor dan rencana proyek.",
        questions: [
          {
            id: "hsk3-l1",
            section: "listening",
            type: "audio_choice",
            typeName: "🎧 MENYIMAK (LISTENING COMPREHENSION)",
            prompt: "Dengarkan audio instruksi manajer berikut:",
            audioText: "请大家把这份项目报告仔细阅读，下班前把修改意见发给我。",
            options: [
              { id: "opt-3l1-a", text: "Membaca laporan proyek secara saksama dan mengirim masukan revisi sebelum jam pulang kantor", isCorrect: true },
              { id: "opt-3l1-b", text: "Menolak proyek baru karena kekurangan waktu" },
              { id: "opt-3l1-c", text: "Menunda rapat proyek hingga minggu depan" },
              { id: "opt-3l1-d", text: "Memesan tiket kereta untuk dinas luar kota" }
            ],
            explanation: "把这份项目报告仔细阅读 (baca laporan dengan saksama) + 下班前把修改意见发给我 (kirim revisi sebelum pulang kerja)."
          }
        ]
      },
      {
        id: "reading",
        name: "Reading (阅读)",
        icon: "BookOpen",
        description: "Analisis struktur sebab-akibat dan tata bahasa 把.",
        questions: [
          {
            id: "hsk3-r1",
            section: "reading",
            type: "single_choice",
            typeName: "📖 MEMBACA (READING COMPREHENSION)",
            prompt: "Baca kalimat berikut:\n\n'只要你每天坚持练习，你的中文水平一定会越来越好。'\n\nApa kesimpulan kalimat tersebut?",
            options: [
              { id: "opt-3r1-a", text: "Konsistensi latihan setiap hari akan membuat kemampuan bahasa Mandarin semakin meningkat", isCorrect: true },
              { id: "opt-3r1-b", text: "Belajar bahasa Mandarin sangat sulit dan memakan waktu" },
              { id: "opt-3r1-c", text: "Tidak perlu latihan setiap hari jika sudah pintar" },
              { id: "opt-3r1-d", text: "Tingkat HSK 3 hanya bisa dipelajari di Tiongkok" }
            ],
            explanation: "Pola: 只要...就/一定... (Asalkan... pasti...) + 越来越好 (semakin lama semakin baik)."
          }
        ]
      },
      {
        id: "writing",
        name: "Writing (书写)",
        icon: "PenTool",
        description: "Menyusun struktur kalimat disposisi 把 (bǎ).",
        questions: [
          {
            id: "hsk3-w1",
            section: "writing",
            type: "sentence_arrangement",
            typeName: "✍️ MENULIS (SENTENCE SYNTAX ARRANGEMENT)",
            prompt: "Susun kata-kata berikut menjadi kalimat struktur disposisi 把 (bǎ) yang tepat:",
            targetSlotsCount: 5,
            correctOrder: ["请", "把", "窗户", "关", "上"],
            wordBank: [
              { id: "wb-3w1-1", hanzi: "窗户", pinyin: "chuānghu" },
              { id: "wb-3w1-2", hanzi: "请", pinyin: "qǐng" },
              { id: "wb-3w1-3", hanzi: "关", pinyin: "guān" },
              { id: "wb-3w1-4", hanzi: "把", pinyin: "bǎ" },
              { id: "wb-3w1-5", hanzi: "上", pinyin: "shang" }
            ],
            explanation: "Struktur Kalimat 把: [请] + [把] + [Objek: 窗户] + [Kata Kerja: 关] + [Pelengkap Hasil/Arah: 上]."
          }
        ]
      },
      {
        id: "speaking",
        name: "Speaking (口语)",
        icon: "Mic",
        description: "Penguasaan kalimat ekspresif & nada pasif/disposisi.",
        questions: [
          {
            id: "hsk3-s1",
            section: "speaking",
            type: "audio_choice",
            typeName: "🗣️ PELAFALAN & NADA (ORAL TONE EVALUATION)",
            prompt: "Dengarkan ungkapan semangat berikut dan pilih pelafalan intonasi yang tepat:",
            audioText: "我相信我们一定能解决这个问题！",
            options: [
              { id: "opt-3s1-a", text: "Wǒ xiāngxìn wǒmen yídìng néng jiějué zhège wèntí! (Intonasi percaya diri & meyakinkan)", isCorrect: true },
              { id: "opt-3s1-b", text: "Wǒ bú xiāngxìn wǒmen néng zuò (Intonasi ragu-ragu)" },
              { id: "opt-3s1-c", text: "Wèntí hěn nán jiějué (Intonasi keluhan pasif)" },
              { id: "opt-3s1-d", text: "Qǐng bǎ wèntí fā gěi tā (Instruksi administratif)" }
            ],
            explanation: "Kalimat '我相信我们一定能解决这个问题！' dilafalkan dengan intonasi tegas dan percaya diri (一定 = nada ke-2 + nada ke-4)."
          }
        ]
      }
    ]
  }
};

export function getMockTestByLevel(level = "HSK 1") {
  return MOCK_TESTS_BY_LEVEL[level] || MOCK_TESTS_BY_LEVEL["HSK 1"];
}

// Helper untuk mengecek apakah semua unit sudah diselesaikan
export function isLevelMockUnlocked(level = "HSK 1", completedUnitIds = []) {
  // Semua unit ID wajib per level
  const LEVEL_TOTAL_UNITS = {
    "HSK 1": ["u-1-1", "u-1-2", "u-2-1", "u-2-2", "u-3-1", "u-3-2", "u-4-1", "u-4-2"],
    "HSK 2": ["u-21-1", "u-21-2", "u-22-1", "u-22-2", "u-23-1", "u-23-2"],
    "HSK 3": ["u-31-1", "u-31-2", "u-32-1", "u-32-2", "u-33-1", "u-33-2"]
  };

  const required = LEVEL_TOTAL_UNITS[level] || LEVEL_TOTAL_UNITS["HSK 1"];
  const completedCount = required.filter(id => completedUnitIds.includes(id)).length;
  const isUnlocked = completedCount >= required.length;

  return {
    isUnlocked,
    completedCount,
    totalCount: required.length,
    percentage: Math.round((completedCount / required.length) * 100)
  };
}
