// Daily conversations dataset for 9 realistic scenarios
export const DAILY_CONVERSATIONS = [
  {
    id: "conv-shopping",
    category: "Shopping",
    titleIndo: "Berbelanja & Tawar Menawar",
    titleHanzi: "在水果店买水果",
    scene: "Pasar Tradisional & Toko Buah",
    dialogues: [
      { speaker: "David", avatar: "👨", hanzi: "你好！请问这个西瓜多少钱一斤？", pinyin: "Nǐ hǎo! Qǐngwèn zhège xīguā duōshao qián yì jīn?", indonesian: "Halo! Permisi berapa harga semangka ini per satu jin (500g)?" },
      { speaker: "Penjual", avatar: "👴", hanzi: "两块五一斤，这个瓜非常甜！", pinyin: "Liǎng kuài wǔ yì jīn, zhège guā fēicháng tián!", indonesian: "Dua kuai lima puluh sen per jin, semangka ini sangat manis!" },
      { speaker: "David", avatar: "👨", hanzi: "太贵了，两块一斤可以吗？", pinyin: "Tài guì le, liǎng kuài yì jīn kěyǐ ma?", indonesian: "Terlalu mahal, apakah boleh dua kuai per jin?" },
      { speaker: "Penjual", avatar: "👴", hanzi: "好吧，买一个大瓜就给你两块。", pinyin: "Hǎo ba, mǎi yí gè dà guā jiù gěi nǐ liǎng kuài.", indonesian: "Baiklah, jika beli satu yang besar saya beri dua kuai." },
      { speaker: "David", avatar: "👨", hanzi: "好的，我要这个，谢谢！", pinyin: "Hǎo de, wǒ yào zhège, xièxie!", indonesian: "Bagus, saya mau yang ini, terima kasih!" }
    ]
  },
  {
    id: "conv-greeting",
    category: "Greetings",
    titleIndo: "Salam & Berkenalan Pertama Kali",
    titleHanzi: "初次见面问候",
    scene: "Lobi Hotel / Pertemuan",
    dialogues: [
      { speaker: "Budi", avatar: "🧑", hanzi: "你好！很高兴认识你。", pinyin: "Nǐ hǎo! Hěn gāoxìng rènshi nǐ.", indonesian: "Halo! Senang sekali bisa berkenalan dengan Anda." },
      { speaker: "Li Mei", avatar: "👩", hanzi: "你好！我也很高兴认识你。你叫什么名字？", pinyin: "Nǐ hǎo! Wǒ yě hěn gāoxìng rènshi nǐ. Nǐ jiào shénme míngzi?", indonesian: "Halo! Saya juga sangat senang bertemu Anda. Siapa nama Anda?" },
      { speaker: "Budi", avatar: "🧑", hanzi: "我叫布迪，我是印尼人。", pinyin: "Wǒ jiào Bùdí, wǒ shì Yìnní rén.", indonesian: "Nama saya Budi, saya orang Indonesia." },
      { speaker: "Li Mei", avatar: "👩", hanzi: "欢迎来到北京！", pinyin: "Huānyíng lái dào Běijīng!", indonesian: "Selamat datang di Beijing!" }
    ]
  },
  {
    id: "conv-selfintro",
    category: "Self Introduction",
    titleIndo: "Perkenalan Diri di Depan Kelas",
    titleHanzi: "自我介绍",
    scene: "Ruang Kelas Mandarin",
    dialogues: [
      { speaker: "Budi", avatar: "🧑", hanzi: "大家好！我来介绍一下我自己。", pinyin: "Dàjiā hǎo! Wǒ lái jièshào yíxià wǒ zìjǐ.", indonesian: "Halo semuanya! Izinkan saya memperkenalkan diri." },
      { speaker: "Budi", avatar: "🧑", hanzi: "我叫布迪，今年二十二岁，在雅加达工作。", pinyin: "Wǒ jiào Bùdí, jīnnián èrshí'èr suì, zài Yǎjiādá gōngzuò.", indonesian: "Nama saya Budi, tahun ini berumur 22 tahun, bekerja di Jakarta." },
      { speaker: "Guru Wang", avatar: "👨‍🏫", hanzi: "很好！你的中文发音很标准。", pinyin: "Hěn hǎo! Nǐ de zhōngwén fāyīn hěn biāozhǔn.", indonesian: "Bagus sekali! Pelafalan bahasa Mandarinmu sangat standar." }
    ]
  },
  {
    id: "conv-restaurant",
    category: "Restaurant",
    titleIndo: "Memesan Makanan di Restoran",
    titleHanzi: "在餐厅点菜",
    scene: "Kedai Mie Tradisional",
    dialogues: [
      { speaker: "Pelayan", avatar: "🤵", hanzi: "欢迎光临！请问几位？", pinyin: "Huānyíng guānglín! Qǐngwèn jǐ wèi?", indonesian: "Selamat datang! Untuk berapa orang?" },
      { speaker: "Budi", avatar: "🧑", hanzi: "两位。请给我们菜单。", pinyin: "Liǎng wèi. Qǐng gěi wǒmen càidān.", indonesian: "Dua orang. Tolong berikan kami buku menu." },
      { speaker: "Budi", avatar: "🧑", hanzi: "我们要一碗牛肉面和一杯冰水。", pinyin: "Wǒmen yào yì wǎn niúròumiàn hé yì bēi bīng shuǐ.", indonesian: "Kami mau semangkok mie daging sapi dan segelas air es." },
      { speaker: "Pelayan", avatar: "🤵", hanzi: "好的，请稍等！", pinyin: "Hǎo de, qǐng shāo děng!", indonesian: "Baik, mohon tunggu sebentar!" }
    ]
  },
  {
    id: "conv-travel",
    category: "Travel",
    titleIndo: "Berwisata & Naik Taksi",
    titleHanzi: "坐出租车去外滩",
    scene: "Taksi di Kota Shanghai",
    dialogues: [
      { speaker: "Budi", avatar: "🧑", hanzi: "师傅，去外滩多少钱？", pinyin: "Shīfu, qù Wàitān duōshao qián?", indonesian: "Pak supir, ke The Bund (Waitan) berapa harganya?" },
      { speaker: "Supir", avatar: "🚕", hanzi: "我们打表，大概三十块左右。", pinyin: "Wǒmen dǎbiǎo, dàgài sānshí kuài zuǒyòu.", indonesian: "Kita pakai argo meter, kira-kira 30 yuan." },
      { speaker: "Budi", avatar: "🧑", hanzi: "好的，请带我去，谢谢！", pinyin: "Hǎo de, qǐng dài wǒ qù, xièxie!", indonesian: "Baik, tolong antarkan saya, terima kasih!" }
    ]
  },
  {
    id: "conv-university",
    category: "University",
    titleIndo: "Kehidupan Kampus & Perpustakaan",
    titleHanzi: "在大学图书馆",
    scene: "Perpustakaan Universitas",
    dialogues: [
      { speaker: "Budi", avatar: "🧑", hanzi: "请问，图书馆几点关门？", pinyin: "Qǐngwèn, túshūguǎn jǐ diǎn guānmén?", indonesian: "Permisi, jam berapa perpustakaan tutup?" },
      { speaker: "Staf", avatar: "👩‍💼", hanzi: "晚上九点半。借书需要出示学生卡。", pinyin: "Wǎnshang jiǔ diǎn bàn. Jiè shū xūyào chūshì xuésheng kǎ.", indonesian: "Malam pukul 21:30. Meminjam buku memerlukan kartu mahasiswa." },
      { speaker: "Budi", avatar: "🧑", hanzi: "明白，谢谢老师！", pinyin: "Míngbai, xièxie lǎoshī!", indonesian: "Mengerti, terima kasih guru!" }
    ]
  },
  {
    id: "conv-family",
    category: "Family",
    titleIndo: "Mengenalkan Anggota Keluarga",
    titleHanzi: "聊家庭成员",
    scene: "Sambil Melihat Album Foto",
    dialogues: [
      { speaker: "Li Mei", avatar: "👩", hanzi: "你家有几口人？", pinyin: "Nǐ jiā yǒu jǐ kǒu rén?", indonesian: "Ada berapa orang di keluargamu?" },
      { speaker: "Budi", avatar: "🧑", hanzi: "我家有四口人：爸爸、妈妈、一个妹妹和我。", pinyin: "Wǒ jiā yǒu sì kǒu rén: bàba, māma, yí gè mèimei hé wǒ.", indonesian: "Keluargaku ada 4 orang: ayah, ibu, seorang adik perempuan, dan saya." },
      { speaker: "Li Mei", avatar: "👩", hanzi: "你妹妹真可爱！", pinyin: "Nǐ mèimei zhēn kě'ài!", indonesian: "Adik perempuanmu sungguh manis!" }
    ]
  },
  {
    id: "conv-hobbies",
    category: "Hobbies",
    titleIndo: "Membicarakan Hobi & Olahraga",
    titleHanzi: "业余爱好",
    scene: "Taman Kota",
    dialogues: [
      { speaker: "David", avatar: "👨", hanzi: "周末你喜欢做什么？", pinyin: "Zhōumò nǐ xǐhuan zuò shénme?", indonesian: "Akhir pekan kamu suka melakukan apa?" },
      { speaker: "Budi", avatar: "🧑", hanzi: "我喜欢听中国音乐和踢足球。你呢？", pinyin: "Wǒ xǐhuan tīng Zhōngguó yīnyuè hé tī zúqiú. Nǐ ne?", indonesian: "Saya suka mendengarkan musik Tiongkok dan bermain sepak bola. Kalau kamu?" },
      { speaker: "David", avatar: "👨", hanzi: "我最喜欢打乒乓球！", pinyin: "Wǒ zuì xǐhuan dǎ pīngpāngqiú!", indonesian: "Saya paling suka bermain tenis meja!" }
    ]
  },
  {
    id: "conv-daily",
    category: "Daily Activities",
    titleIndo: "Aktivitas Sehari-hari",
    titleHanzi: "日常作息安排",
    scene: "Percakapan Pagi",
    dialogues: [
      { speaker: "Li Mei", avatar: "👩", hanzi: "你每天几点起床？", pinyin: "Nǐ měitiān jǐ diǎn qǐchuáng?", indonesian: "Setiap hari kamu bangun jam berapa?" },
      { speaker: "Budi", avatar: "🧑", hanzi: "我通常早上六点半起床，七点吃早饭。", pinyin: "Wǒ tōngcháng zǎoshang liù diǎn bàn qǐchuáng, qī diǎn chī zǎofàn.", indonesian: "Saya biasanya bangun pagi jam 06:30, jam 07:00 sarapan." },
      { speaker: "Li Mei", avatar: "👩", hanzi: "你生活作息真规律！", pinyin: "Nǐ shēnghuó zuòxī zhēn guīlǜ!", indonesian: "Pola hidupmu sungguh teratur!" }
    ]
  }
];
