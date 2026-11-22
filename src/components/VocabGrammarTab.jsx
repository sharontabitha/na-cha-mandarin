import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  Bookmark, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  AlertTriangle, 
  HelpCircle, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  Layers,
  ChevronRight,
  BookOpen,
  Search,
  X
} from 'lucide-react';
import { getVocabulariesByLevel, getGrammarByLevel, HSK_LEVELS_META } from '../data/learningData';
import { audioService } from '../services/speechService';
import Mascot from './Mascot';

export default function VocabGrammarTab({ 
  currentLevel = "HSK 1", 
  onCompleteLesson, 
  onStartFlashcardMode,
  globalShowPinyin = true,
  audioSpeed = 1.0,
  activeUnitSession = null,
  onProceedToReading = null
}) {
  const vocabList = getVocabulariesByLevel(currentLevel);
  const grammarData = getGrammarByLevel(currentLevel);
  const activeLevelMeta = HSK_LEVELS_META[currentLevel] || HSK_LEVELS_META["HSK 1"];

  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [viewMode, setViewMode] = useState('vocab'); // 'vocab' | 'list' | 'grammar' | 'both'
  const [showPinyin, setShowPinyin] = useState(globalShowPinyin);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDetailVocab, setSelectedDetailVocab] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [bookmarkedMap, setBookmarkedMap] = useState(() => {
    try {
      const saved = localStorage.getItem('nacha_bookmarked_ids');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    const initial = {};
    ['HSK 1', 'HSK 2', 'HSK 3'].forEach(lvl => {
      getVocabulariesByLevel(lvl).forEach(v => {
        if (v.isBookmarked) initial[v.id] = true;
      });
    });
    return initial;
  });
  const [completedVocabIds, setCompletedVocabIds] = useState(() => {
    try {
      const saved = localStorage.getItem('nacha_completed_vocabs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {};
  });

  useEffect(() => {
    setShowPinyin(globalShowPinyin);
  }, [globalShowPinyin]);

  // Mini grammar exercise interactive state
  const [selectedChips, setSelectedChips] = useState([]);
  const [exerciseResult, setExerciseResult] = useState(null);

  // Reset index when level changes
  useEffect(() => {
    setCurrentVocabIndex(0);
    setSelectedChips([]);
    setExerciseResult(null);
  }, [currentLevel]);

  const currentVocab = vocabList[currentVocabIndex] || vocabList[0];
  const isCurrentVocabCompleted = Boolean(currentVocab && completedVocabIds[currentVocab.id]);
  const isBookmarked = Boolean(currentVocab && bookmarkedMap[currentVocab.id]);

  const handleToggleBookmark = () => {
    if (!currentVocab) return;
    const nextVal = !isBookmarked;
    currentVocab.isBookmarked = nextVal;
    setBookmarkedMap(prev => {
      const updated = { ...prev };
      if (nextVal) {
        updated[currentVocab.id] = true;
      } else {
        delete updated[currentVocab.id];
      }
      try {
        localStorage.setItem('nacha_bookmarked_ids', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    audioService.playTapSound();
  };

  const handleMarkCompleted = () => {
    if (!currentVocab || isCurrentVocabCompleted) return; // Strict: Hanya bisa tersimpan sekali

    const updated = { ...completedVocabIds, [currentVocab.id]: true };
    setCompletedVocabIds(updated);
    try {
      localStorage.setItem('nacha_completed_vocabs', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }

    audioService.playSuccessSound();
    if (onCompleteLesson) {
      onCompleteLesson();
    }
  };

  // Stop speech synthesis on unmount
  useEffect(() => {
    return () => {
      audioService.stop();
    };
  }, []);

  const handlePlayAudio = (text, rate = audioSpeed) => {
    setIsPlayingAudio(true);
    audioService.playMandarin(
      text, 
      rate, 
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  const handleNextVocab = () => {
    if (currentVocabIndex < vocabList.length - 1) {
      setCurrentVocabIndex(prev => prev + 1);
      audioService.playTapSound();
    }
  };

  const handlePrevVocab = () => {
    if (currentVocabIndex > 0) {
      setCurrentVocabIndex(prev => prev - 1);
      audioService.playTapSound();
    }
  };

  const handleSrsRating = (days) => {
    audioService.playSuccessSound();
    handleNextVocab();
  };

  // Mini phrase assembler handlers
  const handleChipClick = (chip) => {
    if (selectedChips.find(c => c.id === chip.id)) {
      setSelectedChips(selectedChips.filter(c => c.id !== chip.id));
      setExerciseResult(null);
      audioService.playTapSound();
    } else {
      const nextChips = [...selectedChips, chip];
      setSelectedChips(nextChips);
      audioService.playTapSound();

      // Check if assembled target matches
      if (nextChips.length === grammarData.miniPractice.targetOrder.length) {
        const assembledText = nextChips.map(c => c.text).join(' ');
        const targetText = grammarData.miniPractice.targetOrder.join(' ');
        
        if (
          assembledText === targetText || 
          assembledText.replace('？', '') === targetText.replace('？', '')
        ) {
          setExerciseResult('correct');
          audioService.playSuccessSound();
        } else {
          setExerciseResult('wrong');
          audioService.playErrorSound();
        }
      }
    }
  };

  const handleResetChips = () => {
    setSelectedChips([]);
    setExerciseResult(null);
  };

  if (!currentVocab) return null;

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-fadeIn">
      {/* Top Breadcrumb & Control Bar */}
      <div className="bg-[#fffdfa] rounded-3xl p-4 sm:p-5 border border-[#ebdccb] shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#8c6849] font-medium">
            <span className="font-bold px-2.5 py-0.5 rounded-lg bg-[#f5ece1] text-[#5c391d] border border-[#dcc1a4]">
              {currentLevel}
            </span>
            <span>›</span>
            <span>Kosakata &amp; Tata Bahasa</span>
            <span>›</span>
            <span className="text-[#3d2411] font-bold">{currentVocab.hanzi} ({currentVocab.pinyin})</span>
          </div>
          <div className="mt-2 flex items-center space-x-3">
            <div className="w-48 bg-[#f5ece1] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#784e2a] h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentVocabIndex + 1) / vocabList.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-[#8c6849]">
              Kata {currentVocabIndex + 1} dari {vocabList.length} di {currentLevel}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          {/* Pinyin Switch */}
          <button
            onClick={() => setShowPinyin(!showPinyin)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border shrink-0 ${
              showPinyin 
                ? 'bg-[#f5ece1] text-[#5c391d] border-[#dcc1a4]' 
                : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
            }`}
          >
            <span>文A Pinyin</span>
            <span className="text-[10px] uppercase font-mono px-1 py-0.2 bg-white rounded shadow-2xs">
              {showPinyin ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Flashcard SRS Modal Button */}
          {onStartFlashcardMode && (
            <button
              onClick={() => {
                audioService.playTapSound();
                onStartFlashcardMode();
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 bg-[#f5ece1] text-[#784e2a] hover:bg-[#ead7c4] border border-[#dcc1a4] shrink-0"
              title="Buka Mode Ulas Flashcards SRS"
            >
              <span>🎴 Flashcards</span>
            </button>
          )}

          {/* Bookmark Button */}
          <button
            onClick={handleToggleBookmark}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border shrink-0 ${
              isBookmarked
                ? 'bg-[#fef3c7] text-[#78350f] border-[#fde68a]'
                : 'bg-white text-[#8c6849] border-[#ebdccb] hover:bg-[#faf6f0]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#d97706] text-[#d97706]' : 'text-[#dcc1a4]'}`} />
            <span>Bookmark</span>
          </button>

          {/* Mark Completed Button - Can ONLY be saved ONCE */}
          <button
            disabled={isCurrentVocabCompleted}
            onClick={handleMarkCompleted}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-xs shrink-0 ${
              isCurrentVocabCompleted
                ? 'bg-[#166534] text-white cursor-default opacity-95'
                : 'bg-[#784e2a] hover:bg-[#5c391d] text-white cursor-pointer active:scale-95'
            }`}
            title={isCurrentVocabCompleted ? "Kosakata ini sudah tersimpan & XP sudah didapatkan" : "Tandai selesai untuk mendapatkan +50 XP (Hanya 1x)"}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCurrentVocabCompleted ? 'Tersimpan ✓' : 'Tandai Selesai'}</span>
          </button>
        </div>
      </div>

      {/* Guided Lesson Workflow Banner: Langkah 1/3 (Kosakata ➔ Ruang Baca) */}
      <div className="bg-gradient-to-r from-[#f5ece1] to-[#faf6f0] p-4 sm:p-5 rounded-3xl border border-[#dcc1a4] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center space-x-3 text-left w-full sm:w-auto">
          <div className="w-9 h-9 rounded-2xl bg-[#784e2a] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
            1/3
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#784e2a] bg-white px-2 py-0.5 rounded-md border border-[#ebdccb]">
                ALUR BELAJAR BERTAHAP
              </span>
              <span className="text-[11px] font-bold text-[#8c6849]">Langkah 1 dari 3</span>
            </div>
            <h3 className="text-sm font-bold text-[#3d2411] mt-0.5">
              {activeUnitSession?.title ? activeUnitSession.title : `Kosakata & Tata Bahasa ${currentLevel}`}
            </h3>
          </div>
        </div>

        <button
          onClick={() => {
            audioService.playTapSound();
            if (onProceedToReading) onProceedToReading();
          }}
          className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-[#784e2a] hover:bg-[#5c391d] text-white text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer active:scale-95 shrink-0"
        >
          <span>Lanjut ke Ruang Baca (Reading)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* View Mode Switcher to prevent visual clutter & dizziness */}
      <div className="flex items-center justify-between bg-[#fffdfa] rounded-2xl p-1.5 sm:p-2 border border-[#ebdccb] shadow-2xs">
        <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap gap-y-1">
          <button
            onClick={() => setViewMode('vocab')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${
              viewMode === 'vocab'
                ? 'bg-[#784e2a] text-white shadow-xs'
                : 'text-[#784e2a] hover:bg-[#f5ece1]'
            }`}
          >
            <span>🎴</span>
            <span className="xs:hidden">Kartu</span>
            <span className="hidden xs:inline">Kartu Terfokus</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${
              viewMode === 'list'
                ? 'bg-[#784e2a] text-white shadow-xs'
                : 'text-[#784e2a] hover:bg-[#f5ece1]'
            }`}
          >
            <span>📋</span>
            <span className="xs:hidden">Daftar</span>
            <span className="hidden xs:inline">Daftar Kata</span>
          </button>
          <button
            onClick={() => setViewMode('grammar')}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${
              viewMode === 'grammar'
                ? 'bg-[#784e2a] text-white shadow-xs'
                : 'text-[#784e2a] hover:bg-[#f5ece1]'
            }`}
          >
            <span>📐</span>
            <span className="xs:hidden">Grammar</span>
            <span className="hidden xs:inline">Tata Bahasa</span>
          </button>
          <button
            onClick={() => setViewMode('both')}
            className={`hidden md:flex px-3.5 py-1.5 rounded-xl text-xs font-bold transition items-center space-x-1.5 ${
              viewMode === 'both'
                ? 'bg-[#784e2a] text-white shadow-xs'
                : 'text-[#784e2a] hover:bg-[#f5ece1]'
            }`}
          >
            <span>↔️ Berdampingan</span>
          </button>
        </div>

        <span className="text-[11px] text-[#8c6849] font-medium hidden sm:inline px-2">
          {viewMode === 'vocab' && '💡 Mode kartu terfokus: ulas satu per satu'}
          {viewMode === 'list' && '💡 Mode list ➔ klik item untuk buka detail lengkap'}
          {viewMode === 'grammar' && '💡 Mode rumus tata bahasa & mini latihan'}
          {viewMode === 'both' && '💡 Mode dual view lengkap'}
        </span>
      </div>

      {/* VIEW MODE: LIST KOSAKATA DENGAN DETAIL KLIK (Syarat Wajib Master-Detail Halaman 1) */}
      {viewMode === 'list' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Search & Counter Bar */}
          <div className="bg-[#fffdfa] rounded-3xl p-4 sm:p-5 border border-[#ebdccb] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#8c6849] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari Hanzi, Pinyin, atau Arti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-2xl bg-[#faf6f0] border border-[#ebdccb] text-xs text-[#3d2411] focus:outline-none focus:border-[#784e2a] focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c6849] hover:text-[#3d2411]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 text-xs text-[#784e2a] font-bold">
              <span>Menampilkan:</span>
              <span className="px-2.5 py-1 rounded-xl bg-[#f5ece1] border border-[#dcc1a4] text-[#5c391d]">
                {vocabList.filter(item => {
                  if (!searchQuery) return true;
                  const q = searchQuery.toLowerCase();
                  return item.hanzi.includes(q) || item.pinyin.toLowerCase().includes(q) || (item.indonesian && item.indonesian.toLowerCase().includes(q));
                }).length} dari {vocabList.length} Kosakata ({currentLevel})
              </span>
            </div>
          </div>

          {/* Master List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vocabList
              .filter(item => {
                if (!searchQuery) return true;
                const q = searchQuery.toLowerCase();
                return item.hanzi.includes(q) || item.pinyin.toLowerCase().includes(q) || (item.indonesian && item.indonesian.toLowerCase().includes(q));
              })
              .map((item, idx) => {
                const isCompleted = Boolean(completedVocabIds[item.id]);

                return (
                  <div
                    key={item.id || idx}
                    onClick={() => {
                      audioService.playTapSound();
                      setSelectedDetailVocab(item);
                    }}
                    className="bg-[#fffdfa] hover:bg-white rounded-3xl p-5 border border-[#ebdccb] hover:border-[#784e2a] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="min-w-[56px] h-14 rounded-2xl bg-[#f5ece1] border border-[#dcc1a4] flex items-center justify-center text-2xl font-black font-chinese text-[#3d2411] shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                          {item.hanzi}
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5 flex-wrap">
                            <span className="text-sm font-bold text-[#784e2a] font-mono">
                              {item.pinyin}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[#faf6f0] text-[#8c6849] border border-[#ebdccb]">
                              {item.pos}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-[#3d2411] mt-0.5 line-clamp-1">
                            {item.indonesian}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          audioService.playMandarin(item.hanzi, 1.0);
                        }}
                        className="p-2 rounded-xl bg-[#faf6f0] hover:bg-[#784e2a] text-[#784e2a] hover:text-white transition shadow-2xs"
                        title="Dengar Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-2 border-t border-[#f5ece1] flex items-center justify-between text-xs">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                        isCompleted
                          ? 'bg-[#dcfce7] text-[#15803d] border-[#bbf7d0]'
                          : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
                      }`}>
                        {isCompleted ? 'Tersimpan ✓' : 'Belum Ditandai'}
                      </span>

                      <span className="text-[#784e2a] font-bold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                        <span>Lihat Detail</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Main Learning View */}
      <div className={
        viewMode === 'both'
          ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
          : "max-w-2xl mx-auto w-full"
      }>
        {/* LEFT COLUMN: Kartu Kosakata Terfokus */}
        {(viewMode === 'vocab' || viewMode === 'both') && (
        <div className="bg-[#fffdfa] rounded-3xl p-6 sm:p-7 border border-[#ebdccb] shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Header: Title & Badges */}
            <div className="flex items-center justify-between pb-3 border-b border-[#f5ece1]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-4 bg-[#784e2a] rounded-sm"></span>
                <h2 className="text-base font-bold text-[#3d2411]">Kartu Kosakata Terfokus</h2>
              </div>
              <span className="text-xs font-semibold text-[#8c6849] bg-[#f5ece1] px-2.5 py-0.5 rounded-full border border-[#ebdccb]">
                {currentVocab.srsInterval}
              </span>
            </div>

            {/* Tag bar & Audio Speed Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-[#f5ece1] text-[#5c391d] border border-[#dcc1a4]">
                  {currentVocab.hskLevel}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-[#faf6f0] text-[#784e2a] border border-[#ebdccb]">
                  {currentVocab.pos}
                </span>
              </div>

              {/* Audio Play Button */}
              <div className="flex items-center space-x-1.5 bg-[#faf6f0] border border-[#ebdccb] p-1 rounded-2xl">
                <button
                  onClick={() => handlePlayAudio(currentVocab.hanzi, 1.0)}
                  className={`p-1.5 rounded-xl text-white transition ${
                    isPlayingAudio ? 'bg-[#94663b] animate-pulse' : 'bg-[#784e2a] hover:bg-[#5c391d]'
                  }`}
                  title="Dengarkan Pelafalan Mandarin"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Huge Hanzi Display with Mi Zi Ge Background Grid */}
            <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[320px] aspect-square rounded-3xl mizige-bg border-2 border-[#ebdccb] shadow-inner flex flex-col items-center justify-center p-4 sm:p-6 text-center select-none group">
              <div className="text-6xl sm:text-7xl md:text-8xl font-black font-chinese text-[#3d2411] tracking-wider transition-transform group-hover:scale-105 duration-200">
                {currentVocab.hanzi}
              </div>

              {/* Pinyin with tone breakdown */}
              {showPinyin && (
                <div className="mt-4 flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl font-bold text-[#784e2a] font-chinese">
                    {currentVocab.pinyin}
                  </span>
                </div>
              )}

              {/* Indonesian Meaning */}
              <p className="mt-2 text-base sm:text-lg font-bold text-[#3d2411]">
                {currentVocab.indonesian}
              </p>

              {/* Audio Playing Indicator */}
              {isPlayingAudio && (
                <div className="mt-3 flex items-center space-x-2 px-3.5 py-1.5 bg-[#784e2a] text-white rounded-full text-xs animate-fadeIn shadow-xs">
                  <div className="flex items-center space-x-1 h-3.5">
                    <span className="w-1 bg-[#fcd34d] rounded-full animate-bounce h-2"></span>
                    <span className="w-1 bg-[#fcd34d] rounded-full animate-bounce h-3.5 delay-75"></span>
                    <span className="w-1 bg-[#fcd34d] rounded-full animate-bounce h-2 delay-150"></span>
                    <span className="w-1 bg-[#fcd34d] rounded-full animate-bounce h-3 delay-100"></span>
                  </div>
                  <span className="text-[11px] font-bold">Memutar audio...</span>
                </div>
              )}
            </div>


            {/* Dekonstruksi Radikal & Komponen */}
            {currentVocab.radicals && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6849]">
                  DEKONSTRUKSI RADIKAL &amp; KOMPONEN
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {currentVocab.radicals.map((rad, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#faf6f0] rounded-2xl p-2.5 border border-[#ebdccb] text-center space-y-0.5 hover:bg-[#f5ece1] transition"
                    >
                      <span className="text-xl font-bold font-chinese text-[#784e2a] block">
                        {rad.char}
                      </span>
                      <span className="text-xs font-semibold text-[#5c391d] block">
                        {rad.pinyin}
                      </span>
                      <span className="text-[10px] text-[#8c6849] block leading-tight">
                        {rad.meaning}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contoh Kalimat Riil */}
            {currentVocab.example && (
              <div className="bg-[#f5ece1]/50 border border-[#ebdccb] rounded-3xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5c391d] flex items-center space-x-1">
                    <BookOpen className="w-3 h-3 text-[#784e2a]" />
                    <span>CONTOH KALIMAT RIIL</span>
                  </span>
                  <button
                    onClick={() => handlePlayAudio(currentVocab.example.hanzi)}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#784e2a] hover:text-[#5c391d] bg-white px-2.5 py-1 rounded-xl border border-[#ebdccb] shadow-2xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dengar</span>
                  </button>
                </div>

                {showPinyin && (
                  <p className="text-xs font-medium text-[#8c6849] font-sans">
                    {currentVocab.example.pinyin}
                  </p>
                )}
                <p className="text-base sm:text-lg font-bold text-[#3d2411] font-chinese leading-snug">
                  {currentVocab.example.hanzi}
                </p>
                <p className="text-xs text-[#784e2a] italic">
                  "{currentVocab.example.indonesian}"
                </p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="space-y-4 pt-4 border-t border-[#f5ece1]">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={handlePrevVocab}
                disabled={currentVocabIndex === 0}
                className="px-3 py-2.5 rounded-2xl border border-[#ebdccb] font-semibold text-[#784e2a] hover:bg-[#faf6f0] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <button
                onClick={handleNextVocab}
                disabled={currentVocabIndex === vocabList.length - 1}
                className="px-3 py-2.5 rounded-2xl bg-[#784e2a] text-white font-bold hover:bg-[#5c391d] transition flex items-center justify-center space-x-1 disabled:opacity-40"
              >
                <span>Berikutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Cultural Note Box at bottom */}
            {currentVocab.cultureNote && (
              <div className="bg-[#faf6f0] border border-[#ebdccb] rounded-2xl p-3 flex items-start space-x-3">
                <span className="text-base">🏮</span>
                <div className="text-xs">
                  <strong className="text-[#5c391d] block font-bold">
                    {currentVocab.cultureNote.title}
                  </strong>
                  <p className="text-[#784e2a] mt-0.5 leading-relaxed">
                    {currentVocab.cultureNote.text}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        )}

        {/* RIGHT COLUMN: Struktur Tata Bahasa */}
        {(viewMode === 'grammar' || viewMode === 'both') && (
        <div className="bg-[#fffdfa] rounded-3xl p-6 sm:p-7 border border-[#ebdccb] shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Header: Title & Badges */}
            <div className="flex items-center justify-between pb-3 border-b border-[#f5ece1]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-4 bg-[#94663b] rounded-sm"></span>
                <h2 className="text-base font-bold text-[#3d2411]">Tata Bahasa {currentLevel}</h2>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-bold text-[#5c391d] bg-[#f5ece1] border border-[#dcc1a4] px-2 py-0.5 rounded">
                  {grammarData.badge}
                </span>
                <span className="text-[10px] font-bold text-[#8c6849] bg-[#faf6f0] px-2 py-0.5 rounded">
                  {grammarData.subBadge}
                </span>
              </div>
            </div>

            {/* Grammar Title & Explanation */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#3d2411] tracking-tight">
                {grammarData.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#784e2a] mt-1.5 leading-relaxed">
                {grammarData.description}
              </p>
            </div>

            {/* Rumus Pola Kalimat Card */}
            <div className="bg-gradient-to-r from-[#faf6f0] via-[#f5ece1] to-[#ead7c4]/50 rounded-3xl p-4 sm:p-5 border border-[#ebdccb] space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6849]">
                RUMUS POLA KALIMAT
              </span>

              <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-[#ebdccb] font-bold text-xs sm:text-sm text-[#3d2411] shadow-2xs font-mono">
                {grammarData.formula.pattern}
              </div>

              <div className="bg-white/80 rounded-2xl p-3 border border-[#f5ece1] text-xs text-[#5c391d] space-y-1">
                <div className="flex items-center space-x-2 font-chinese font-bold text-[#3d2411]">
                  <span className="text-[#166534]">✓</span>
                  <span>{grammarData.formula.example}</span>
                </div>
                <p className="text-[#8c6849] italic pl-5">
                  {grammarData.formula.meaning}
                </p>
              </div>
            </div>

            {/* Pembeda Krusial */}
            {grammarData.crucialDifference && (
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-[#3d2411]">
                  <HelpCircle className="w-3.5 h-3.5 text-[#b45309]" />
                  <span>{grammarData.crucialDifference.title}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#faf6f0] p-3.5 rounded-2xl border border-[#ebdccb] space-y-1">
                    <strong className="text-sm font-bold font-chinese text-[#3d2411] block">
                      {grammarData.crucialDifference.col1.term}
                    </strong>
                    <p className="text-xs text-[#784e2a] leading-relaxed">
                      {grammarData.crucialDifference.col1.desc}
                    </p>
                  </div>

                  <div className="bg-[#f5ece1] p-3.5 rounded-2xl border border-[#dcc1a4] space-y-1">
                    <strong className="text-sm font-bold font-chinese text-[#5c391d] block">
                      {grammarData.crucialDifference.col2.term}
                    </strong>
                    <p className="text-xs text-[#784e2a] leading-relaxed">
                      {grammarData.crucialDifference.col2.desc}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Kesalahan Umum Pembelajar */}
            {grammarData.commonMistakes && (
              <div className="bg-[#fff7ed] rounded-3xl p-4 border border-[#ffedd5] space-y-3">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-[#9a3412]">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#ea580c]" />
                  <span>{grammarData.commonMistakes.title}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-[#fed7aa] flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-chinese">
                      <XCircle className="w-4 h-4 text-[#ea580c] shrink-0" />
                      <span className="line-through text-[#784e2a]">{grammarData.commonMistakes.wrong}</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#c2410c] bg-[#ffedd5] px-2 py-0.5 rounded">
                      Keliru
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-[#bbf7d0] flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-chinese font-bold text-[#166534]">
                      <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0" />
                      <span>{grammarData.commonMistakes.correct}</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#15803d] bg-[#f0fdf4] px-2 py-0.5 rounded">
                      Tepat
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#784e2a] leading-relaxed">
                  {grammarData.commonMistakes.note}
                </p>
              </div>
            )}
          </div>

          {/* Mini-Latihan: Susun Frasa */}
          {grammarData.miniPractice && (
            <div className="space-y-3 pt-4 border-t border-[#f5ece1]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#3d2411] flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#b45309]" />
                  <span>MINI-LATIHAN {currentLevel}: SUSUN FRASA</span>
                </span>
                <button
                  onClick={handleResetChips}
                  className="text-xs text-[#8c6849] hover:text-[#3d2411] flex items-center space-x-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Ulangi</span>
                </button>
              </div>

              <p className="text-xs text-[#784e2a]">
                {grammarData.miniPractice.instruction}
              </p>

              {/* Target assemble zone */}
              <div className={`min-h-[48px] rounded-2xl border-2 border-dashed p-2 flex flex-wrap items-center gap-2 transition ${
                exerciseResult === 'correct'
                  ? 'border-[#86efac] bg-[#f0fdf4]'
                  : exerciseResult === 'wrong'
                  ? 'border-[#fca5a5] bg-[#fef2f2]'
                  : 'border-[#ebdccb] bg-[#faf6f0]'
              }`}>
                {selectedChips.length === 0 ? (
                  <span className="text-xs text-[#8c6849] italic px-2">
                    Klik keping kata di bawah untuk menyusun kalimat...
                  </span>
                ) : (
                  selectedChips.map((chip, idx) => (
                    <span
                      key={idx}
                      onClick={() => handleChipClick(chip)}
                      className="px-3 py-1.5 bg-white border border-[#dcc1a4] rounded-xl text-xs font-bold font-chinese text-[#3d2411] shadow-2xs cursor-pointer hover:border-[#784e2a]"
                    >
                      {chip.text}
                    </span>
                  ))
                )}
              </div>

              {/* Result feedback */}
              {exerciseResult && (
                <div className={`text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1.5 ${
                  exerciseResult === 'correct'
                    ? 'bg-[#dcfce7] text-[#14532d]'
                    : 'bg-[#fee2e2] text-[#991b1b]'
                }`}>
                  {exerciseResult === 'correct' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Luar biasa! Susunan Anda benar sesuai tata bahasa {currentLevel} (+20 XP).</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Susunan belum tepat. Perhatikan pola rumus kalimat di atas dan coba lagi!</span>
                    </>
                  )}
                </div>
              )}

              {/* Available Chips Bank */}
              <div className="flex flex-wrap gap-2 pt-1">
                {grammarData.miniPractice.chips.map((chip) => {
                  const isSelected = selectedChips.find(c => c.id === chip.id);
                  return (
                    <button
                      key={chip.id}
                      disabled={isSelected}
                      onClick={() => handleChipClick(chip)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-chinese border transition ${
                        isSelected
                          ? 'opacity-30 border-[#ebdccb] bg-[#faf6f0] text-[#8c6849] cursor-not-allowed'
                          : 'bg-white border-[#ebdccb] text-[#3d2411] hover:border-[#784e2a] hover:bg-[#f5ece1] shadow-2xs'
                      }`}
                    >
                      <span className="text-sm block">{chip.text}</span>
                      <span className="text-[10px] font-sans font-normal text-[#8c6849]">{chip.pinyin}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        )}
      </div>

      {/* DETAIL KOSAKATA MODAL (Master-Detail Halaman 1) */}
      {selectedDetailVocab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#3d2411]/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#fffdfa] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-[#ebdccb] flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-3.5 sm:p-5 border-b border-[#f5ece1] flex items-center justify-between bg-[#faf6f0]">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-[#f5ece1] text-[#5c391d] border border-[#dcc1a4]">
                  {selectedDetailVocab.hskLevel}
                </span>
                <span className="text-xs font-bold text-[#3d2411]">
                  Detail Kosakata Mandarin
                </span>
              </div>
              <button
                onClick={() => setSelectedDetailVocab(null)}
                className="p-1.5 rounded-xl text-[#8c6849] hover:text-[#3d2411] hover:bg-[#f5ece1] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5">
              {/* Giant Hanzi + Mi Zi Ge */}
              <div className="relative mx-auto w-36 h-36 sm:w-48 sm:h-48 rounded-3xl mizige-bg border-2 border-[#ebdccb] shadow-inner flex flex-col items-center justify-center text-center">
                <span className="text-5xl sm:text-6xl font-black font-chinese text-[#3d2411]">
                  {selectedDetailVocab.hanzi}
                </span>
                <span className="text-lg font-bold text-[#784e2a] font-mono mt-2">
                  {selectedDetailVocab.pinyin}
                </span>
                <span className="text-[10px] text-[#8c6849] bg-[#faf6f0] px-2 py-0.5 rounded-full border border-[#ebdccb] mt-1">
                  {selectedDetailVocab.tones}
                </span>
              </div>

              {/* Translation & Audio */}
              <div className="bg-[#faf6f0] rounded-2xl p-4 border border-[#ebdccb] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8c6849] block">
                    Arti Bahasa Indonesia ({selectedDetailVocab.pos}):
                  </span>
                  <span className="text-base font-bold text-[#3d2411]">
                    {selectedDetailVocab.indonesian}
                  </span>
                </div>
                <button
                  onClick={() => audioService.playMandarin(selectedDetailVocab.hanzi, 1.0)}
                  className="p-3 rounded-2xl bg-[#784e2a] hover:bg-[#5c391d] text-white transition shadow-xs flex items-center space-x-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="text-xs font-bold">Dengar</span>
                </button>
              </div>

              {/* Radicals */}
              {selectedDetailVocab.radicals && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6849]">
                    DEKONSTRUKSI RADIKAL &amp; KOMPONEN:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedDetailVocab.radicals.map((rad, i) => (
                      <div key={i} className="bg-white p-2.5 rounded-xl border border-[#ebdccb] text-center space-y-0.5">
                        <span className="text-lg font-bold font-chinese text-[#784e2a] block">{rad.char}</span>
                        <span className="text-xs font-semibold text-[#5c391d] block">{rad.pinyin}</span>
                        <span className="text-[10px] text-[#8c6849] block truncate">{rad.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Example Sentence */}
              {selectedDetailVocab.example && (
                <div className="bg-[#f5ece1]/60 rounded-2xl p-4 border border-[#dcc1a4] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5c391d]">
                      CONTOH KALIMAT RIIL:
                    </span>
                    <button
                      onClick={() => audioService.playMandarin(selectedDetailVocab.example.hanzi, 1.0)}
                      className="text-xs font-bold text-[#784e2a] hover:text-[#5c391d] flex items-center space-x-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Dengar</span>
                    </button>
                  </div>
                  <p className="text-xs text-[#8c6849] font-mono">{selectedDetailVocab.example.pinyin}</p>
                  <p className="text-base font-bold font-chinese text-[#3d2411]">{selectedDetailVocab.example.hanzi}</p>
                  <p className="text-xs text-[#784e2a] italic">"{selectedDetailVocab.example.indonesian}"</p>
                </div>
              )}

              {/* Cultural Note */}
              {selectedDetailVocab.cultureNote && (
                <div className="bg-[#faf6f0] p-3 rounded-2xl border border-[#ebdccb] text-xs text-[#5c391d] flex items-start space-x-2">
                  <span>🏮</span>
                  <div>
                    <strong className="block text-[#3d2411] font-bold">{selectedDetailVocab.cultureNote.title}</strong>
                    <p className="text-[#784e2a] mt-0.5">{selectedDetailVocab.cultureNote.text}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#faf6f0] border-t border-[#f5ece1] flex items-center space-x-2">
              <button
                onClick={() => setSelectedDetailVocab(null)}
                className="w-full py-2.5 rounded-2xl bg-[#784e2a] hover:bg-[#5c391d] text-white text-xs font-bold transition shadow-xs text-center"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
