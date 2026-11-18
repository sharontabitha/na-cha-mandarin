import React from 'react';
import { 
  Play, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  RotateCw, 
  Target, 
  Flame, 
  BookOpen, 
  Layers, 
  Compass, 
  ChevronRight,
  TrendingUp,
  Volume2,
  Award
} from 'lucide-react';
import { getModulesByLevel, HSK_LEVELS_META, USER_PROFILE, getVocabulariesByLevel } from '../data/learningData';
import { isLevelMockUnlocked } from '../data/mockTestData';
import Mascot from './Mascot';

export default function HomeTab({ 
  currentLevel = "HSK 1",
  onSelectTab, 
  onStartFlashcards, 
  userStats,
  userProfile,
  completedUnits = [],
  onStartUnit = null
}) {
  const currentModules = getModulesByLevel(currentLevel);
  const currentVocabs = getVocabulariesByLevel(currentLevel);
  const activeLevelMeta = HSK_LEVELS_META[currentLevel] || HSK_LEVELS_META["HSK 1"];
  const levelProgress = USER_PROFILE.hskProgress[currentLevel] || { completionPercent: 50 };
  const mockUnlockInfo = isLevelMockUnlocked(currentLevel, completedUnits);

  const activeModule = currentModules.find(m => m.status === 'active') || currentModules[0];
  const [expandedModuleId, setExpandedModuleId] = React.useState(activeModule?.id);

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      {/* Top Banner & Today's Target Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome Card & Active Module */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#f5ece1] via-[#fffdfa] to-[#ead7c4]/50 rounded-3xl p-6 sm:p-7 border border-[#ebdccb] shadow-xs relative">
          {/* Subtle Decorative Hanzi watermark clipped to rounded border */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute right-4 bottom-2 text-9xl font-black text-[#784e2a]/5 select-none font-chinese">
              奶
            </div>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#faf6f0] text-[#5c391d] border border-[#dcc1a4]">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-[#b45309]" />
                  Na Cha (奶茶) Milk Tea Learning
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#784e2a] text-white">
                  {activeLevelMeta.name}
                </span>
              </div>

              <button
                onClick={() => onSelectTab('profile')}
                className="text-xs font-bold text-[#784e2a] hover:text-[#3d2411] underline"
              >
                Ganti Level HSK →
              </button>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#3d2411] tracking-tight">
                  Selamat belajar, {userProfile?.name || USER_PROFILE.name}! 👋
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-[#784e2a] max-w-xl leading-relaxed">
                  Belajar bahasa Mandarin kini semanis dan senikmat segelas milk tea segar! Materi dirancang ringkas dengan audio jernih dan bacaan terarah.
                </p>
              </div>

              {/* Cute Mascot Cheering with Left Speech Bubble */}
              <div className="hidden sm:block shrink-0 -mt-1">
                <Mascot size={72} mood="happy" showQuoteOnClick={true} bubblePosition="left" />
              </div>
            </div>

            {/* Current Active Module Box */}
            <div className="mt-4 bg-[#fffdfa]/95 backdrop-blur rounded-2xl p-4 sm:p-5 border border-[#ebdccb] shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#784e2a] bg-[#f5ece1] px-2 py-0.5 rounded-lg border border-[#ebdccb]">
                    Modul Aktif · {currentLevel}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#3d2411] mt-1">
                    {activeModule.title}
                  </h3>
                  <p className="text-xs text-[#784e2a] mt-0.5">
                    {activeModule.description}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#166534] bg-[#f0fdf4] px-2.5 py-1 rounded-xl border border-[#bbf7d0]">
                  {levelProgress.completionPercent}% Selesai
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#f5ece1] h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#94663b] to-[#784e2a] h-full rounded-full transition-all duration-300" 
                  style={{ width: `${levelProgress.completionPercent}%` }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="text-xs text-[#8c6849] flex items-center space-x-2">
                  <span>Modul {activeModule.hskLevel} siap dipelajari</span>
                </div>
                <button
                  onClick={() => onSelectTab('vocab-grammar')}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#784e2a] hover:bg-[#5c391d] text-white text-xs font-bold transition shadow-xs hover:shadow-md group"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Lanjutkan Belajar ({currentLevel})</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Target Widget */}
        <div className="bg-[#fffdfa] rounded-3xl p-6 border border-[#ebdccb] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#f5ece1]">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-[#784e2a]" />
                <h3 className="text-sm font-bold text-[#3d2411]">Target Hari Ini</h3>
              </div>
              <span className="text-xs font-semibold text-[#8c6849]">Na Cha Streak 🔥</span>
            </div>

            <div className="my-5 flex items-center justify-around">
              {/* Circular gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#f5ece1]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#784e2a]"
                    strokeDasharray="70, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-extrabold text-[#3d2411]">{userStats.currentDayXP}</span>
                  <span className="text-[10px] font-medium text-[#8c6849]">/ {userStats.dailyGoalXP} XP</span>
                </div>
              </div>

              {/* Stats details */}
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-[#8c6849] block">Waktu Belajar</span>
                  <span className="text-sm font-bold text-[#3d2411]">
                    {userStats.dailyMinutes} <span className="font-normal text-xs text-[#8c6849]">/ {userStats.targetMinutes} mnt</span>
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#8c6849] block">Konsistensi</span>
                  <span className="text-sm font-bold text-[#94663b] flex items-center space-x-1">
                    <Flame className="w-3.5 h-3.5 fill-[#b45309] text-[#b45309]" />
                    <span>{userStats.streakDays} Hari Beruntun</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#faf6f0] rounded-2xl p-3 border border-[#ebdccb] flex items-center justify-between text-xs">
            <span className="text-[#5c391d] font-semibold">SRS: {currentVocabs.length} Kartu Siap Review</span>
            <button
              onClick={onStartFlashcards}
              className="text-[#784e2a] font-bold hover:text-[#3d2411] flex items-center space-x-1"
            >
              <span>Ulas {currentLevel}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Spaced Repetition */}
        <div 
          onClick={onStartFlashcards}
          className="bg-[#fffdfa] rounded-3xl p-5 border border-[#ebdccb] hover:border-[#94663b] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5c391d] bg-[#f5ece1] px-2.5 py-0.5 rounded-full border border-[#dcc1a4]">
              SRS DECK ({currentLevel})
            </span>
            <RotateCw className="w-4 h-4 text-[#784e2a] group-hover:rotate-180 transition-transform duration-500" />
          </div>
          <h3 className="text-base font-bold text-[#3d2411] mt-3 group-hover:text-[#784e2a] transition-colors">
            Spaced Repetition Flashcards
          </h3>
          <p className="text-xs text-[#784e2a] mt-1 line-clamp-2">
            Sistem repetisi interval untuk kosakata {currentLevel} agar terekam kuat dalam memori jangka panjang.
          </p>
          <div className="mt-4 pt-3 border-t border-[#f5ece1] flex items-center justify-between text-xs font-bold text-[#784e2a]">
            <span>{currentVocabs.length} Kartu Terpilih</span>
            <span className="flex items-center group-hover:translate-x-1 transition-transform">
              Mulai Review Kilat →
            </span>
          </div>
        </div>

        {/* Card 2: Tantangan Kuis Harian */}
        <div 
          onClick={() => onSelectTab('quiz')}
          className="bg-[#fffdfa] rounded-3xl p-5 border border-[#ebdccb] hover:border-[#94663b] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78350f] bg-[#fef3c7] px-2.5 py-0.5 rounded-full border border-[#fde68a]">
              EVALUASI {currentLevel}
            </span>
            <Sparkles className="w-4 h-4 text-[#d97706]" />
          </div>
          <h3 className="text-base font-bold text-[#3d2411] mt-3 group-hover:text-[#784e2a] transition-colors">
            Tantangan Kuis &amp; Evaluasi
          </h3>
          <p className="text-xs text-[#784e2a] mt-1 line-clamp-2">
            Uji kemampuan {currentLevel}: Susun kalimat, mencocokkan Hanzi, melengkapi kata &amp; menyimak audio native.
          </p>
          <div className="mt-4 pt-3 border-t border-[#f5ece1] flex items-center justify-between text-xs font-bold text-[#784e2a]">
            <span>Ujian Berwaktu</span>
            <span className="flex items-center group-hover:translate-x-1 transition-transform">
              Buka Kuis {currentLevel} →
            </span>
          </div>
        </div>

        {/* Card 3: Percakapan Praktis */}
        <div 
          onClick={() => onSelectTab('conversation')}
          className="bg-[#fffdfa] rounded-3xl p-5 border border-[#ebdccb] hover:border-[#94663b] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1e3a8a] bg-[#eff6ff] px-2.5 py-0.5 rounded-full border border-[#bfdbfe]">
              9 TOPIK REALISTIS
            </span>
            <BookOpen className="w-4 h-4 text-[#2563eb]" />
          </div>
          <h3 className="text-base font-bold text-[#3d2411] mt-3 group-hover:text-[#784e2a] transition-colors">
            Percakapan Praktis Harian
          </h3>
          <p className="text-xs text-[#784e2a] mt-1 line-clamp-2">
            Simulasi dialog belanja, restoran, salam, taksi, kampus, hingga situasi kerja dengan audio Mandarin.
          </p>
          <div className="mt-4 pt-3 border-t border-[#f5ece1] flex items-center justify-between text-xs font-bold text-[#784e2a]">
            <span>Audio Native Mandarin</span>
            <span className="flex items-center group-hover:translate-x-1 transition-transform">
              Buka Percakapan →
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Learning Path (Left) & Knowledge Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Learning Path (学习路径) Filtered by Level */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-[#f5ece1] text-[#5c391d] border border-[#dcc1a4]">
                  KURIKULUM {currentLevel}
                </span>
                <h2 className="text-lg font-bold text-[#3d2411]">
                  Peta Jalur Belajar (学习路径)
                </h2>
              </div>
              <p className="text-xs text-[#784e2a] mt-0.5">
                Menampilkan daftar modul dan unit yang disaring khusus untuk tingkat <strong>{currentLevel}</strong>.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('profile')}
              className="text-xs font-bold text-[#784e2a] hover:text-[#3d2411]"
            >
              Ubah Tingkat HSK ⚙️
            </button>
          </div>

          {/* Module Nodes List */}
          <div className="space-y-4">
            {currentModules.map((module, idx) => {
              const isCompleted = module.status === 'completed';
              const isActive = module.status === 'active';
              const isLocked = module.status === 'locked';

              return (
                <div
                  key={module.id}
                  className={`rounded-3xl border transition-all ${
                    isActive
                      ? 'bg-[#fffdfa] border-[#94663b] ring-2 ring-[#ebdccb] shadow-sm'
                      : isCompleted
                      ? 'bg-[#fffdfa]/90 border-[#ebdccb]'
                      : 'bg-[#faf6f0]/70 border-[#ebdccb]/60 opacity-80'
                  }`}
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          isCompleted
                            ? 'bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]'
                            : isActive
                            ? 'bg-[#784e2a] text-white font-bold'
                            : 'bg-[#f5ece1] text-[#8c6849]'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 fill-[#f0fdf4]" />
                          ) : isLocked ? (
                            <Lock className="w-3.5 h-3.5" />
                          ) : (
                            <span className="text-xs">{idx + 1}</span>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[11px] font-bold text-[#8c6849] uppercase">
                              {module.hskLevel} · {module.totalWords} KATA
                            </span>
                            {isActive && (
                              <span className="text-[10px] font-bold text-[#784e2a] bg-[#f5ece1] px-2 py-0.5 rounded-full border border-[#ebdccb]">
                                SEDANG AKTIF
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-bold text-[#3d2411] mt-0.5">
                            {module.title}
                          </h3>
                          <p className="text-xs text-[#784e2a] mt-1 max-w-xl">
                            {module.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setExpandedModuleId(expandedModuleId === module.id ? null : module.id)}
                          className="text-xs font-semibold px-2.5 py-1 rounded-xl text-[#784e2a] hover:bg-[#f5ece1] transition"
                        >
                          {expandedModuleId === module.id ? 'Tutup Unit ▲' : `Lihat Unit (${module.units?.length || 0}) ▼`}
                        </button>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-xl ${
                          isCompleted
                            ? 'bg-[#f0fdf4] text-[#166534]'
                            : isActive
                            ? 'bg-[#f5ece1] text-[#784e2a] font-bold border border-[#ebdccb]'
                            : 'bg-[#faf6f0] text-[#8c6849]'
                        }`}>
                          {isCompleted ? 'Selesai' : isActive ? 'Aktif' : 'Tersedia'}
                        </span>
                      </div>
                    </div>

                    {/* Unit Breakdown (Collapsible to keep layout calm) */}
                    {module.units && expandedModuleId === module.id && (
                      <div className="mt-4 pt-4 border-t border-[#f5ece1] space-y-2 animate-fadeIn">
                        {module.units.map((unit) => {
                          const unitCompleted = completedUnits.includes(unit.id) || unit.status === 'completed';
                          const unitActive = unit.status === 'active' || (!unitCompleted && !completedUnits.includes(unit.id));

                          return (
                            <div
                              key={unit.id}
                              className={`p-3 rounded-2xl flex items-center justify-between text-xs transition ${
                                unitActive
                                  ? 'bg-[#f5ece1]/80 border border-[#dcc1a4] text-[#3d2411]'
                                  : unitCompleted
                                  ? 'bg-[#faf6f0] border border-[#ebdccb] text-[#5c391d]'
                                  : 'bg-[#faf6f0]/40 border border-[#ebdccb] text-[#8c6849]'
                              }`}
                            >
                              <div className="flex items-center space-x-2.5">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                                  unitCompleted
                                    ? 'bg-[#166534] text-white'
                                    : unitActive
                                    ? 'bg-[#784e2a] text-white font-bold'
                                    : 'bg-[#ead7c4] text-[#8c6849]'
                                }`}>
                                  {unitCompleted ? '✓' : unitActive ? '●' : '○'}
                                </div>
                                <span className={`font-semibold ${unitActive ? 'text-[#3d2411]' : 'text-[#5c391d]'}`}>
                                  {unit.title}
                                </span>
                              </div>

                              <button
                                onClick={() => {
                                  if (onStartUnit) {
                                    onStartUnit(unit);
                                  } else {
                                    onSelectTab('vocab-grammar');
                                  }
                                }}
                                className={`px-2.5 py-1 rounded-xl font-bold text-[11px] transition cursor-pointer active:scale-95 ${
                                  unitActive
                                    ? 'bg-[#784e2a] text-white hover:bg-[#5c391d]'
                                    : unitCompleted
                                    ? 'bg-[#ead7c4] text-[#3d2411] hover:bg-[#dcc1a4]'
                                    : 'bg-white border border-[#ebdccb] text-[#784e2a] hover:bg-[#f5ece1]'
                                }`}
                              >
                                {unitActive ? 'Buka Unit ➔' : unitCompleted ? 'Ulangi' : 'Buka'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CAPSTONE HSK MOCK TEST UNLOCK CARD */}
          <div className={`rounded-3xl p-6 border-2 transition-all ${
            mockUnlockInfo.isUnlocked
              ? 'bg-gradient-to-br from-[#fef3c7] via-[#fffdfa] to-[#fde68a]/40 border-[#d97706] shadow-md animate-fadeIn'
              : 'bg-[#faf6f0] border-[#ebdccb] opacity-95'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start space-x-3.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-xs ${
                  mockUnlockInfo.isUnlocked ? 'bg-[#784e2a] text-white' : 'bg-[#ead7c4] text-[#8c6849]'
                }`}>
                  {mockUnlockInfo.isUnlocked ? '🏆' : '🔒'}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${
                      mockUnlockInfo.isUnlocked
                        ? 'bg-[#dcfce7] text-[#15803d] border-[#bbf7d0]'
                        : 'bg-[#f5ece1] text-[#784e2a] border-[#ebdccb]'
                    }`}>
                      {mockUnlockInfo.isUnlocked ? 'MOCK TEST RESMI TERBUKA' : 'CAPSTONE MOCK TEST (TERKUNCI)'}
                    </span>
                    <span className="text-xs font-bold text-[#8c6849]">
                      {mockUnlockInfo.completedCount}/{mockUnlockInfo.totalCount} Unit ({mockUnlockInfo.percentage}%)
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#3d2411] mt-1">
                    Simulasi Ujian Resmi HSK {currentLevel} (Listening, Reading, Writing &amp; Speaking)
                  </h3>
                  <p className="text-xs text-[#784e2a] mt-0.5 max-w-xl">
                    {mockUnlockInfo.isUnlocked
                      ? 'Luar biasa! Seluruh bab unit telah kamu kuasai. Uji kemampuan 4 aspek bahasa berstandar HSK resmi sekarang!'
                      : `Selesaikan seluruh ${mockUnlockInfo.totalCount} unit pada kurikulum ${currentLevel} di atas untuk membuka simulasi ujian resmi.`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectTab('quiz')}
                className={`px-5 py-3 rounded-2xl font-bold text-xs transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer active:scale-95 shrink-0 ${
                  mockUnlockInfo.isUnlocked
                    ? 'bg-[#784e2a] hover:bg-[#5c391d] text-white shadow-sm'
                    : 'bg-[#f5ece1] hover:bg-[#ead7c4] text-[#784e2a] border border-[#dcc1a4]'
                }`}
              >
                <span>{mockUnlockInfo.isUnlocked ? 'Mulai Mock Test Resmi ➔' : 'Lihat Status Ujian ➔'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Knowledge Stats & Daily Radical */}
        <div className="space-y-6">
          {/* Koleksi Kosakata Summary for Level */}
          <div className="bg-[#fffdfa] rounded-3xl p-5 sm:p-6 border border-[#ebdccb] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5ece1]">
              <h3 className="text-sm font-bold text-[#3d2411] flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-[#784e2a]" />
                <span>Koleksi Kosakata ({currentLevel})</span>
              </h3>
              <button 
                onClick={onStartFlashcards}
                className="text-xs font-semibold text-[#784e2a] hover:text-[#3d2411]"
              >
                Review Semua
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#faf6f0] p-2.5 rounded-2xl border border-[#ebdccb]">
                <span className="text-lg font-black text-[#3d2411] block">{currentVocabs.length}</span>
                <span className="text-[10px] text-[#8c6849]">Kata di Level</span>
              </div>
              <div className="bg-[#faf6f0] p-2.5 rounded-2xl border border-[#ebdccb]">
                <span className="text-lg font-black text-[#3d2411] block">{activeLevelMeta.grammarPoints}</span>
                <span className="text-[10px] text-[#8c6849]">Tata Bahasa</span>
              </div>
              <div className="bg-[#faf6f0] p-2.5 rounded-2xl border border-[#ebdccb]">
                <span className="text-lg font-black text-[#b45309] block">{activeLevelMeta.targetWords}</span>
                <span className="text-[10px] text-[#8c6849]">Target Ujian</span>
              </div>
            </div>

            {/* Quick Word chips filtered by level */}
            <div>
              <span className="text-[11px] font-medium text-[#8c6849] block mb-2">
                Kosakata {currentLevel} Utama:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentVocabs.slice(0, 6).map((item) => (
                  <span 
                    key={item.id}
                    className="px-2.5 py-1 rounded-xl bg-[#f5ece1] border border-[#dcc1a4] text-xs font-chinese text-[#3d2411] flex items-center space-x-1"
                  >
                    <strong className="text-[#784e2a]">{item.hanzi}</strong>
                    <span className="text-[10px] text-[#8c6849] font-sans">{item.pinyin}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Na Cha Boba Mascot Tip */}
          <div className="bg-gradient-to-br from-[#faf6f0] via-[#f5ece1] to-[#ead7c4]/60 rounded-3xl p-5 border border-[#ebdccb] shadow-xs space-y-3">
            <div className="flex items-center space-x-3">
              <Mascot size={48} mood="cheering" />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5c391d] bg-[#ead7c4] px-2.5 py-0.5 rounded-full border border-[#dcc1a4]">
                  TIP NA CHA 🧋
                </span>
                <h4 className="text-xs font-bold text-[#3d2411] mt-1">
                  Mempelajari {currentLevel} Lebih Efektif
                </h4>
              </div>
            </div>
            <p className="text-xs text-[#5c391d] leading-relaxed">
              Di level <strong>{currentLevel}</strong>, dengarkan audio penutur asli sebelum membaca terjemahan. Setiap selesai 1 topik, buka <strong>Ruang Baca &amp; Dengar</strong> untuk menyimak cerita pendek!
            </p>
          </div>

          {/* Motivational Quote */}
          <div className="bg-[#3d2411] text-[#faf6f0] rounded-3xl p-5 shadow-xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#fcd34d]">
              Kata Mutiara Mandarin
            </span>
            <p className="text-base font-bold font-chinese tracking-wide text-white">
              千里之行，始于足下。
            </p>
            <p className="text-xs text-[#dcc1a4]">
              "Qiānlǐ zhī xíng, shǐ yú zúxià."
            </p>
            <p className="text-xs text-[#ead7c4] border-t border-[#5c391d] pt-2 italic">
              "Perjalanan seribu li bermula dari satu langkah kaki pertama."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
