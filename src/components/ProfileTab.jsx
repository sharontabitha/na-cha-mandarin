import React, { useState, useRef } from 'react';
import { 
  User, 
  Award, 
  Flame, 
  Zap, 
  BookOpen, 
  CheckCircle2, 
  Settings, 
  Volume2, 
  Check, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  RotateCcw, 
  Sliders, 
  Compass,
  Camera,
  Upload,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { HSK_LEVELS_META, USER_PROFILE } from '../data/learningData';
import { CUTE_ANIMAL_MASCOTS, DEFAULT_MASCOT_AVATAR } from '../data/avatarsData';
import Mascot from './Mascot';
import { audioService } from '../services/speechService';

export default function ProfileTab({ 
  currentLevel, 
  setLevel, 
  userStats, 
  setUserStats,
  userProfile = USER_PROFILE,
  onUpdateProfile,
  onStartFlashcards,
  onOpenBookmarks
}) {
  const [userName, setUserName] = useState(userProfile?.name || USER_PROFILE.name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [dailyGoalXP, setDailyGoalXP] = useState(userStats.dailyGoalXP);
  const [targetMinutes, setTargetMinutes] = useState(userStats.targetMinutes);
  const [savedToast, setSavedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Pengaturan Berhasil Disimpan!");

  // Avatar customization modal state
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile?.avatar || USER_PROFILE.avatar);
  const fileInputRef = useRef(null);

  const handleSelectLevel = (lvlId) => {
    audioService.playSuccessSound();
    setLevel(lvlId);
    showSavedNotification("Level HSK Berhasil Dipilih!");
  };

  const handleSaveSettings = () => {
    setUserStats(prev => ({
      ...prev,
      dailyGoalXP,
      targetMinutes
    }));
    if (onUpdateProfile) {
      onUpdateProfile({ name: userName });
    }
    setIsEditingName(false);
    audioService.playSuccessSound();
    showSavedNotification("Pengaturan & Nama Berhasil Disimpan!");
  };

  const showSavedNotification = (msg = "Pengaturan Berhasil Disimpan!") => {
    setToastMessage(msg);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar terlalu besar (maksimal 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (result) {
        setSelectedAvatar(result);
        audioService.playTapSound();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmAvatar = () => {
    if (onUpdateProfile && selectedAvatar) {
      onUpdateProfile({ avatar: selectedAvatar });
    }
    setIsAvatarModalOpen(false);
    audioService.playSuccessSound();
    showSavedNotification("Foto Profil Berhasil Diperbarui! 🎉");
  };

  const activeLevelMeta = HSK_LEVELS_META[currentLevel] || HSK_LEVELS_META["HSK 1"];
  const currentAvatar = userProfile?.avatar || USER_PROFILE.avatar;

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#784e2a] text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 animate-bounce border border-[#5c391d]">
          <CheckCircle2 className="w-4 h-4 text-[#fcd34d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Profile Banner with Interactive Photo & Mascot */}
      <div className="bg-gradient-to-r from-[#f5ece1] via-[#fffdfa] to-[#ead7c4]/60 rounded-3xl p-6 sm:p-8 border border-[#ebdccb] shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
            {/* Interactive User Avatar with Change Photo Trigger */}
            <div className="relative group">
              <div 
                onClick={() => {
                  setSelectedAvatar(currentAvatar);
                  setIsAvatarModalOpen(true);
                  audioService.playTapSound();
                }}
                className="w-24 h-24 rounded-3xl bg-[#f5ece1] border-2 border-[#dcc1a4] overflow-hidden shadow-sm cursor-pointer group-hover:border-[#784e2a] transition-all relative"
                title="Klik untuk mengganti foto profil"
              >
                <img
                  src={currentAvatar}
                  alt={userName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#3d2411]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold p-1">
                  <Camera className="w-5 h-5 drop-shadow mb-0.5" />
                  <span>Ubah Foto</span>
                </div>
              </div>

              {/* Camera Icon Button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedAvatar(currentAvatar);
                  setIsAvatarModalOpen(true);
                  audioService.playTapSound();
                }}
                className="absolute -bottom-2 -right-2 p-2 rounded-2xl bg-[#784e2a] hover:bg-[#5c391d] text-white shadow-md transition flex items-center justify-center group-hover:scale-110"
                title="Ganti Foto Profil"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start space-x-2 flex-wrap">
                {isEditingName ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="text-lg font-bold px-2 py-1 border border-[#ebdccb] rounded-xl focus:outline-none focus:border-[#784e2a] bg-white text-[#3d2411]"
                    />
                    <button
                      onClick={handleSaveSettings}
                      className="px-2.5 py-1 bg-[#784e2a] text-white text-xs font-bold rounded-xl shadow-xs"
                    >
                      Simpan
                    </button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-black text-[#3d2411] tracking-tight">
                      {userName}
                    </h1>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-xs text-[#8c6849] hover:text-[#3d2411] underline font-medium"
                    >
                      Ubah Nama
                    </button>
                    <span className="text-[#dcc1a4]">·</span>
                    <button
                      onClick={() => {
                        setSelectedAvatar(currentAvatar);
                        setIsAvatarModalOpen(true);
                        audioService.playTapSound();
                      }}
                      className="text-xs text-[#784e2a] hover:text-[#3d2411] font-bold flex items-center space-x-1"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Ganti Foto</span>
                    </button>
                  </>
                )}
              </div>
              <p className="text-xs text-[#784e2a] font-medium">
                Siswa Na Cha (奶茶) · Target: Menuntaskan Kurikulum Mandarin
              </p>
              
              {/* Active Level Pill */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#784e2a] text-white flex items-center space-x-1.5 shadow-2xs">
                  <span>🧋 Level Aktif:</span>
                  <strong className="text-[#fcd34d]">{activeLevelMeta.name}</strong>
                </span>
                <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-white border border-[#ebdccb] text-[#5c391d]">
                  Target: {activeLevelMeta.targetWords} Kosakata
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute -bottom-6 -right-4 text-9xl font-black text-[#784e2a]/5 select-none pointer-events-none font-chinese">
          茶
        </div>
      </div>

      {/* SECTION 1: PENGATURAN LEVEL HSK */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-4 bg-[#784e2a] rounded-sm"></span>
              <h2 className="text-lg font-black text-[#3d2411] tracking-tight">
                Pilih &amp; Atur Tingkat HSK (HSK Level Selector)
              </h2>
            </div>
            <p className="text-xs text-[#784e2a] mt-0.5">
              Level yang Anda pilih di sini akan menyaring materi di seluruh modul, kosakata, tata bahasa, dan kuis.
            </p>
          </div>
        </div>

        {/* 3 HSK Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Object.values(HSK_LEVELS_META).map((lvl) => {
            const isSelected = currentLevel === lvl.id;
            const progress = USER_PROFILE.hskProgress[lvl.id] || { masteredWords: 0, completionPercent: 0 };

            return (
              <div
                key={lvl.id}
                onClick={() => handleSelectLevel(lvl.id)}
                className={`rounded-3xl p-6 border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#fffdfa] border-[#784e2a] ring-4 ring-[#ebdccb] shadow-md'
                    : 'bg-[#fffdfa] border-[#ebdccb] hover:border-[#94663b] hover:shadow-2xs'
                }`}
              >
                {/* Active Badge */}
                {isSelected && (
                  <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#784e2a] text-white text-[11px] font-extrabold shadow-xs flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#fcd34d]" />
                    <span>LEVEL SEDANG AKTIF</span>
                  </span>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-chinese text-[#8c6849]">
                      {lvl.chineseName}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#f5ece1] text-[#5c391d] border border-[#dcc1a4]">
                      {lvl.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-[#3d2411]">
                      {lvl.name}
                    </h3>
                    <p className="text-xs text-[#784e2a] mt-1 leading-relaxed">
                      {lvl.description}
                    </p>
                  </div>

                  <div className="bg-[#faf6f0] p-3 rounded-2xl border border-[#ebdccb] space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[#5c391d]">
                      <span>Target Kosakata:</span>
                      <strong className="text-[#3d2411] font-bold">{lvl.targetWords} Kata</strong>
                    </div>
                    <div className="flex items-center justify-between text-[#5c391d]">
                      <span>Poin Tata Bahasa:</span>
                      <strong className="text-[#3d2411] font-bold">{lvl.grammarPoints} Pola</strong>
                    </div>

                    {/* Level Progress bar */}
                    <div className="space-y-1 pt-1 border-t border-[#ebdccb]">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#8c6849]">Progres Dikuasai:</span>
                        <span className="font-bold text-[#784e2a]">{progress.completionPercent}%</span>
                      </div>
                      <div className="w-full bg-[#ebdccb] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#784e2a] h-full rounded-full transition-all duration-300"
                          style={{ width: `${progress.completionPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selection Action Button */}
                <div className="pt-4 mt-4 border-t border-[#f5ece1]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectLevel(lvl.id);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                      isSelected
                        ? 'bg-[#784e2a] text-white shadow-xs'
                        : 'bg-[#f5ece1] text-[#5c391d] hover:bg-[#ead7c4]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4 text-[#fcd34d]" />
                        <span>Level Aktif Terpilih</span>
                      </>
                    ) : (
                      <>
                        <span>Pilih Level Ini</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: TARGET BELAJAR HARIAN & PREFERENSI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#fffdfa] rounded-3xl p-6 border border-[#ebdccb] shadow-xs space-y-5">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-[#784e2a]" />
            <h3 className="text-base font-bold text-[#3d2411]">
              Pengaturan Target Harian
            </h3>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-[#5c391d]">Target XP Harian:</span>
              <strong className="text-[#784e2a] font-bold">{dailyGoalXP} XP</strong>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              step="10"
              value={dailyGoalXP}
              onChange={(e) => setDailyGoalXP(Number(e.target.value))}
              className="w-full accent-[#784e2a] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8c6849]">
              <span>Santai (20 XP)</span>
              <span>Standar (50 XP)</span>
              <span>Intensif (150 XP)</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#f5ece1]">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-[#5c391d]">Target Waktu Belajar:</span>
              <strong className="text-[#784e2a] font-bold">{targetMinutes} Menit / Hari</strong>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={targetMinutes}
              onChange={(e) => setTargetMinutes(Number(e.target.value))}
              className="w-full accent-[#784e2a] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8c6849]">
              <span>5 menit</span>
              <span>15 menit</span>
              <span>60 menit</span>
            </div>
          </div>

          <button
            onClick={handleSaveSettings}
            className="w-full py-2.5 rounded-2xl bg-[#784e2a] hover:bg-[#5c391d] text-white text-xs font-bold shadow-xs transition"
          >
            Simpan Target Harian
          </button>
        </div>

        {/* Mascot Message */}
        <div className="bg-gradient-to-br from-[#faf6f0] via-[#f5ece1] to-[#ead7c4]/60 rounded-3xl p-6 border border-[#ebdccb] shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-start space-x-4">
            <div className="shrink-0 bg-white p-2 rounded-2xl border border-[#ebdccb] shadow-2xs">
              <Mascot size={64} mood="happy" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5c391d] bg-[#ead7c4] px-2 py-0.5 rounded-lg border border-[#dcc1a4]">
                PESAN DARI NA CHA MASKOT 🧋
              </span>
              <h4 className="text-sm font-bold text-[#3d2411]">
                "Belajar Mandarin Semanis Menikmati Milk Tea!"
              </h4>
              <p className="text-xs text-[#5c391d] leading-relaxed mt-1">
                Gunakan navigasi icon di atas untuk berpindah cepat antara latihan kosakata, ruang baca 1 paragraf, dan arena evaluasi kuis!
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#ebdccb]">
            <button
              onClick={() => {
                audioService.playTapSound();
                if (onStartFlashcards) onStartFlashcards();
              }}
              className="w-full p-3 bg-white hover:bg-[#fffdfa] rounded-2xl border border-[#ebdccb] hover:border-[#784e2a] text-xs text-[#5c391d] flex items-center justify-between cursor-pointer transition shadow-2xs group"
            >
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-[#784e2a] group-hover:rotate-180 transition-transform duration-500" />
                <span className="font-semibold">Latihan Kosakata SRS ({currentLevel})</span>
              </div>
              <span className="font-bold text-[#784e2a] group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                <span>Buka Deck Flashcards</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>

            {onOpenBookmarks && (
              <button
                onClick={() => {
                  audioService.playTapSound();
                  onOpenBookmarks();
                }}
                className="w-full p-2.5 bg-[#faf6f0] hover:bg-[#f5ece1] rounded-2xl border border-[#ebdccb] text-xs text-[#784e2a] font-bold flex items-center justify-center space-x-2 transition"
              >
                <span>Lihat Kosakata Tersimpan (Bookmark) →</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3: TENTANG APLIKASI (About Na Cha) */}
      <div className="bg-[#fffdfa] rounded-3xl p-6 sm:p-7 border border-[#ebdccb] shadow-xs space-y-5 animate-fadeIn">
        <div className="flex items-center justify-between pb-3 border-b border-[#f5ece1]">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-4 bg-[#784e2a] rounded-sm"></span>
            <h3 className="text-base font-bold text-[#3d2411]">
              Tentang Na Cha (关于奶茶)
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#f5ece1] text-[#784e2a] border border-[#ebdccb]">
            v1.0.0 · Production Ready
          </span>
        </div>

        {/* TOMBOL INTERAKTIF CHALLENGE: ALERT NIM & JUDUL TUGAS AKHIR */}
        <button
          type="button"
          onClick={() => {
            audioService.playSuccessSound();
            alert("🎓 INFORMASI MAHASISWA & TUGAS AKHIR\n\nNIM: 21120124120016\nJudul: na-cha: aplikasi belajar bahasa mandarin");
          }}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#784e2a] to-[#5c391d] hover:from-[#5c391d] hover:to-[#3d2411] text-white font-bold text-xs sm:text-sm shadow-md active:scale-98 transition-all flex items-center justify-center space-x-2.5 cursor-pointer border border-[#ebdccb]"
        >
          <span className="text-base">🎓</span>
          <span>Lihat NIM &amp; Judul Tugas Akhir Mahasiswa</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Sisi Kiri: Profil & Visi Aplikasi */}
          <div className="space-y-3 bg-[#faf6f0] p-4 sm:p-5 rounded-2xl border border-[#ebdccb] flex flex-col justify-between">
            <div className="space-y-2">
              <h4 className="font-bold text-[#784e2a] text-sm flex items-center space-x-1.5">
                <span>🧋 Media Pembelajaran Mandarin Interaktif</span>
              </h4>
              <p className="text-[#5c391d] leading-relaxed">
                <strong>Na Cha (奶茶)</strong> hadir untuk menemani perjalanan belajar bahasa Mandarin tingkat dasar hingga menengah (HSK 1–3) dengan suasana yang santai, hangat, dan interaktif seperti menikmati secangkir boba milk tea.
              </p>
            </div>
            
            <div className="pt-3 border-t border-[#ebdccb] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#8c6849]">Sasaran Belajar:</span>
                <strong className="text-[#3d2411]">Kosakata, Tata Bahasa &amp; Percakapan HSK 1–3</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8c6849]">Metode Belajar:</span>
                <strong className="text-[#3d2411]">Spaced Repetition &amp; Konteks Nyata</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8c6849]">Aksesibilitas:</span>
                <strong className="text-[#166534]">Dukungan Penuh Mobile &amp; Offline</strong>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Fitur Utama Aplikasi */}
          <div className="space-y-3 bg-[#faf6f0] p-4 sm:p-5 rounded-2xl border border-[#ebdccb]">
            <h4 className="font-bold text-[#784e2a] text-sm flex items-center space-x-1.5">
              <span>✨ Fitur &amp; Keunggulan</span>
            </h4>
            
            <ul className="space-y-2 text-[#5c391d]">
              <li className="flex items-start space-x-2">
                <span className="text-[#784e2a] font-bold">🍵</span>
                <span><strong>Mi Zi Ge &amp; Audio Pelafalan:</strong> Eksplorasi karakter Hanzi lengkap dengan radikal, arti, dan audio penutur asli.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#784e2a] font-bold">💬</span>
                <span><strong>Simulasi Percakapan:</strong> Latihan dialog dunia nyata di kafe boba, pasar, transportasi umum, dan perkenalan.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#784e2a] font-bold">📖</span>
                <span><strong>Ruang Baca &amp; Cerita:</strong> Cerita pendek interaktif dengan terjemahan per kalimat dan anotasi pinyin.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[#784e2a] font-bold">🎯</span>
                <span><strong>Kuis Adaptif:</strong> Evaluasi pemahaman dengan latihan soal pilihan ganda berbatas waktu dan pembahasan instan.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* AVATAR CUSTOMIZATION MODAL */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3d2411]/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#fffdfa] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-[#ebdccb] flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#f5ece1] flex items-center justify-between bg-[#faf6f0]">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-[#784e2a]" />
                <h3 className="text-sm font-extrabold text-[#3d2411]">
                  Pilih atau Unggah Foto Profil
                </h3>
              </div>
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="p-1.5 rounded-xl text-[#8c6849] hover:text-[#3d2411] hover:bg-[#f5ece1] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-5 flex-1">
              {/* Selected Preview Box */}
              <div className="flex flex-col items-center justify-center space-y-2 p-4 bg-gradient-to-b from-[#faf6f0] to-[#f5ece1]/40 rounded-2xl border border-[#ebdccb]">
                <div className="relative">
                  <img
                    src={selectedAvatar}
                    alt="Pratinjau Foto"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-[#784e2a] shadow-md"
                  />
                  <span className="absolute bottom-0 right-0 p-1 bg-[#15803d] rounded-full text-white shadow-xs">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                </div>
                <span className="text-xs font-bold text-[#5c391d]">
                  Pratinjau Foto Profil Terpilih
                </span>
              </div>

              {/* Upload Custom File from Device */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-[#784e2a] bg-[#faf6f0] hover:bg-[#f5ece1] text-[#784e2a] font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer group shadow-2xs"
                >
                  <Upload className="w-4 h-4 text-[#784e2a] group-hover:-translate-y-0.5 transition-transform" />
                  <span>📁 Unggah Foto Dari Komputer / HP (Maks. 5MB)</span>
                </button>
                <p className="text-[10px] text-[#8c6849] text-center mt-1">
                  Format didukung: JPG, PNG, WEBP, GIF. Foto otomatis tersimpan di perangkat Anda.
                </p>
              </div>

              {/* Preset Gallery - 8 Maskot Hewan & Boba Lucu */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#3d2411]">
                    Pilih Maskot Hewan &amp; Boba Lucu:
                  </span>
                  <span className="text-[10px] font-semibold text-[#8c6849]">
                    {CUTE_ANIMAL_MASCOTS.length} Maskot
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  {CUTE_ANIMAL_MASCOTS.map((avatar) => {
                    const isSelected = selectedAvatar === avatar.url;
                    return (
                      <button
                        key={avatar.id}
                        type="button"
                        onClick={() => {
                          setSelectedAvatar(avatar.url);
                          audioService.playTapSound();
                        }}
                        className={`group p-2 rounded-2xl border transition flex flex-col items-center space-y-1 relative ${
                          isSelected
                            ? 'bg-[#fef3c7] border-[#784e2a] ring-2 ring-[#ebdccb] shadow-xs'
                            : 'bg-white border-[#ebdccb] hover:border-[#94663b] hover:bg-[#faf6f0]'
                        }`}
                      >
                        <div className="w-14 h-14 rounded-2xl overflow-hidden relative flex items-center justify-center bg-[#faf6f0]">
                          <img
                            src={avatar.url}
                            alt={avatar.name}
                            className="w-full h-full object-contain p-0.5 group-hover:scale-110 transition-transform"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-[#784e2a]/40 rounded-2xl flex items-center justify-center">
                              <Check className="w-5 h-5 text-white drop-shadow" />
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-[#5c391d] truncate max-w-full block">
                          {avatar.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-[#faf6f0] border-t border-[#f5ece1] flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsAvatarModalOpen(false)}
                className="flex-1 py-2.5 rounded-2xl bg-white border border-[#ebdccb] text-[#5c391d] hover:bg-[#f5ece1] text-xs font-bold transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmAvatar}
                className="flex-1 py-2.5 rounded-2xl bg-[#784e2a] hover:bg-[#5c391d] text-white text-xs font-bold transition shadow-xs flex items-center justify-center space-x-1.5"
              >
                <Check className="w-4 h-4 text-[#fcd34d]" />
                <span>Simpan Foto Profil</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
