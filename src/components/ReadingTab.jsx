import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Bookmark, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  X, 
  HelpCircle, 
  ArrowRight,
  RotateCcw,
  Headphones,
  BookOpen
} from 'lucide-react';
import { getReadingStoryByLevel, HSK_LEVELS_META } from '../data/learningData';
import { audioService } from '../services/speechService';
import Mascot from './Mascot';

export default function ReadingTab({ 
  currentLevel = "HSK 1", 
  onProceedToQuiz,
  onProceedToConversation,
  globalShowPinyin = true,
  audioSpeed = 1.0,
  activeUnitSession = null
}) {
  const readingStory = getReadingStoryByLevel(currentLevel);
  const activeLevelMeta = HSK_LEVELS_META[currentLevel] || HSK_LEVELS_META["HSK 1"];

  const [isPlayingFullAudio, setIsPlayingFullAudio] = useState(false);
  const [speed, setSpeed] = useState(audioSpeed || 1.0);
  const [showPinyin, setShowPinyin] = useState(globalShowPinyin);
  const [showIndoTranslation, setShowIndoTranslation] = useState(false);
  const [audioBurstsEnabled, setAudioBurstsEnabled] = useState(true);

  useEffect(() => {
    setShowPinyin(globalShowPinyin);
  }, [globalShowPinyin]);
  
  // Interactive Word Popup Modal
  const [selectedWord, setSelectedWord] = useState(null);

  // Comprehension Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Reset when level changes
  useEffect(() => {
    setIsPlayingFullAudio(false);
    setSelectedWord(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
    audioService.stop();
  }, [currentLevel]);

  const handleToggleFullAudio = () => {
    if (isPlayingFullAudio) {
      audioService.stop();
      setIsPlayingFullAudio(false);
    } else {
      setIsPlayingFullAudio(true);
      audioService.playMandarin(
        readingStory.fullTextHanzi,
        speed,
        () => setIsPlayingFullAudio(true),
        () => setIsPlayingFullAudio(false)
      );
    }
  };

  const handlePlayClip = (text) => {
    audioService.playMandarin(text, speed);
  };

  const handleSelectWord = (token) => {
    if (token.isPunctuation) return;
    audioService.playTapSound();
    handlePlayClip(token.hanzi);
    setSelectedWord(token);
  };

  const handleAnswerSelect = (questionKey, optionId) => {
    audioService.playTapSound();
    setQuizAnswers(prev => ({ ...prev, [questionKey]: optionId }));
  };

  const handleCheckQuiz = () => {
    audioService.playSuccessSound();
    setQuizSubmitted(true);
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-fadeIn">
      {/* Guided Lesson Workflow Banner: Langkah 2/3 (Ruang Baca ➔ Percakapan) */}
      <div className="bg-gradient-to-r from-[#f5ece1] to-[#faf6f0] p-4 sm:p-5 rounded-3xl border border-[#dcc1a4] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center space-x-3 text-left w-full sm:w-auto">
          <div className="w-9 h-9 rounded-2xl bg-[#784e2a] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
            2/3
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#784e2a] bg-white px-2 py-0.5 rounded-md border border-[#ebdccb]">
                ALUR BELAJAR BERTAHAP
              </span>
              <span className="text-[11px] font-bold text-[#8c6849]">Langkah 2 dari 3</span>
            </div>
            <h3 className="text-sm font-bold text-[#3d2411] mt-0.5">
              {activeUnitSession?.title ? activeUnitSession.title : `Ruang Baca & Pemahaman Konteks ${currentLevel}`}
            </h3>
          </div>
        </div>

        <button
          onClick={() => {
            audioService.playTapSound();
            if (onProceedToConversation) onProceedToConversation();
          }}
          className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-[#784e2a] hover:bg-[#5c391d] text-white text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer active:scale-95 shrink-0"
        >
          <span>Lanjut ke Percakapan (Conversation)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Top Reading Header & Interactive Audio Player Bar */}
      <div className="bg-[#fffdfa] rounded-3xl p-4 sm:p-5 border border-[#ebdccb] shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#8c6849] font-medium">
              <span className="font-bold px-2.5 py-0.5 rounded-lg bg-[#f5ece1] text-[#5c391d] border border-[#dcc1a4]">
                {currentLevel}
              </span>
              <span>›</span>
              <span>Ruang Baca &amp; Dengar</span>
              <span>›</span>
              <span className="text-[#3d2411] font-bold">{readingStory.unitLabel}</span>
            </div>
            <div className="flex items-baseline space-x-3 mt-1.5">
              <h1 className="text-xl sm:text-2xl font-black text-[#3d2411]">
                {readingStory.titleIndo}
              </h1>
              <span className="text-lg font-bold font-chinese text-[#784e2a]">
                {readingStory.titleHanzi}
              </span>
            </div>
          </div>

          {/* Reading Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowPinyin(!showPinyin)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
                showPinyin
                  ? 'bg-[#f5ece1] text-[#5c391d] border-[#dcc1a4]'
                  : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
              }`}
            >
              <span>文A Pinyin: {showPinyin ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => setShowIndoTranslation(!showIndoTranslation)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
                showIndoTranslation
                  ? 'bg-[#eff6ff] text-[#1e3a8a] border-[#bfdbfe]'
                  : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
              }`}
            >
              <span>🇮🇩 Arti: {showIndoTranslation ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => setAudioBurstsEnabled(!audioBurstsEnabled)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
                audioBurstsEnabled
                  ? 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]'
                  : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
              }`}
            >
              <span>🔊 Audio Bursts: {audioBurstsEnabled ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Audio Player Bar with Animated Waveform */}
        <div className="bg-[#faf6f0] rounded-2xl p-3 sm:p-4 border border-[#ebdccb] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleToggleFullAudio}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition shadow-sm ${
                isPlayingFullAudio ? 'bg-[#5c391d] animate-pulse' : 'bg-[#784e2a] hover:bg-[#5c391d]'
              }`}
            >
              {isPlayingFullAudio ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
            </button>
            <div>
              <span className="text-xs font-bold text-[#3d2411] block">
                Putar Audio Cerita ({currentLevel} Native zh-CN)
              </span>
              <span className="text-[11px] text-[#8c6849] font-mono">
                {isPlayingFullAudio ? 'Sedang Memutar Suara...' : `${readingStory.audioLength} Durasi Bacaan`}
              </span>
            </div>
          </div>

          {/* Animated Waveform bars */}
          <div className="flex items-center space-x-1 px-4 py-1 h-6">
            {[4, 12, 18, 8, 14, 20, 16, 10, 18, 12, 6, 15, 22, 10, 8, 14, 18, 6].map((h, i) => (
              <span
                key={i}
                style={{ height: isPlayingFullAudio ? undefined : `${h}px` }}
                className={`w-1 rounded-full transition-all ${
                  isPlayingFullAudio
                    ? 'bg-[#784e2a] ' + (i % 5 === 0 ? 'animate-wave-1' : i % 5 === 1 ? 'animate-wave-2' : i % 5 === 2 ? 'animate-wave-3' : i % 5 === 3 ? 'animate-wave-4' : 'animate-wave-5')
                    : 'bg-[#dcc1a4]'
                }`}
              />
            ))}
          </div>

          {/* Speed Pills */}
          <div className="flex items-center space-x-1.5 self-end sm:self-auto">
            <Volume2 className="w-4 h-4 text-[#8c6849] mr-1" />
            {[0.75, 1.0, 1.25].map(sVal => (
              <button
                key={sVal}
                onClick={() => setSpeed(sVal)}
                className={`px-2 py-0.5 text-xs rounded-lg font-semibold transition ${
                  speed === sVal
                    ? 'bg-[#3d2411] text-white font-bold'
                    : 'bg-white border border-[#ebdccb] text-[#784e2a] hover:bg-[#faf6f0]'
                }`}
              >
                {sVal}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Reading & Quiz Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 1-Paragraph Reading Passage */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#fffdfa] rounded-3xl p-6 sm:p-7 border border-[#ebdccb] shadow-xs space-y-5">
            {/* Lore background */}
            <div className="bg-[#f5ece1]/60 rounded-2xl p-4 border border-[#ebdccb] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5c391d] block">
                {readingStory.backgroundLore.title}
              </span>
              <p className="text-xs text-[#784e2a] leading-relaxed">
                {readingStory.backgroundLore.content}
              </p>
            </div>

            {/* 1-Paragraph Reading Passage with Ruby Furigana Pinyin */}
            <div className="p-6 bg-[#faf6f0]/70 rounded-3xl border border-[#ebdccb] leading-loose select-text relative">
              <div className="text-2xl sm:text-3xl font-chinese text-[#3d2411] tracking-wide font-normal flex flex-wrap items-end gap-x-2 gap-y-6 sm:gap-y-8">
                {readingStory.sentences.map((sentence) => (
                  <span key={sentence.id} className="inline-flex flex-wrap items-end">
                    {sentence.tokens.map((token, idx) => {
                      if (token.isPunctuation) {
                        return (
                          <span key={idx} className="text-[#8c6849] font-chinese select-none">
                            {token.hanzi}
                          </span>
                        );
                      }

                      const isHighlighted = token.highlight;
                      const highlightColor = 
                        token.highlightType === 'vocab'
                          ? 'bg-[#ead7c4] text-[#3d2411] border-b-2 border-[#784e2a] hover:bg-[#dcc1a4]'
                          : token.highlightType === 'grammar'
                          ? 'bg-[#fef3c7] text-[#78350f] border-b-2 border-[#d97706] hover:bg-[#fde68a]'
                          : token.highlightType === 'measure'
                          ? 'bg-[#dbeafe] text-[#1e40af] border-b-2 border-[#3b82f6] hover:bg-[#bfdbfe]'
                          : 'hover:bg-[#f5ece1]';

                      return (
                        <ruby
                          key={idx}
                          onClick={() => handleSelectWord(token)}
                          className={`cursor-pointer px-1 py-0.5 rounded transition ${isHighlighted ? highlightColor : 'hover:bg-[#f5ece1]'}`}
                        >
                          <span className="font-chinese">{token.hanzi}</span>
                          {showPinyin && token.pinyin && (
                            <rt className="font-sans text-[11px] font-semibold text-[#8c6849]">
                              {token.pinyin}
                            </rt>
                          )}
                        </ruby>
                      );
                    })}
                  </span>
                ))}
              </div>

              {/* Legend Helper */}
              <div className="mt-6 pt-4 border-t border-[#ebdccb] flex flex-wrap items-center justify-between text-[11px] text-[#8c6849] gap-2">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#94663b]"></span>
                    <span>Kosakata Kunci ({currentLevel})</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#d97706]"></span>
                    <span>Pola Tata Bahasa</span>
                  </span>
                </div>
                <span className="text-[#8c6849] italic">💡 Klik kata mana pun untuk popup arti &amp; audio</span>
              </div>
            </div>

            {/* Interactive Word Details Popup Floating Box */}
            {selectedWord && (
              <div className="bg-[#fffdfa] rounded-3xl p-4 border-2 border-[#94663b] shadow-md flex items-center justify-between animate-fadeIn">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-black font-chinese text-[#784e2a] bg-[#f5ece1] px-3 py-1.5 rounded-2xl border border-[#dcc1a4]">
                    {selectedWord.hanzi}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-[#3d2411]">{selectedWord.pinyin}</span>
                      <span className="text-[10px] font-bold text-[#5c391d] bg-[#f5ece1] px-2 py-0.5 rounded border border-[#dcc1a4]">{currentLevel}</span>
                    </div>
                    <p className="text-xs text-[#784e2a] font-medium mt-0.5">
                      Arti: {selectedWord.meaning || 'Kosakata penting dalam bab ini'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePlayClip(selectedWord.hanzi)}
                    className="p-2 rounded-xl bg-[#784e2a] text-white hover:bg-[#5c391d] transition"
                    title="Dengar Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedWord(null)}
                    className="p-2 rounded-xl text-[#8c6849] hover:text-[#3d2411] hover:bg-[#f5ece1] transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Collapsible Indonesian Translation Accordion */}
            <div className="border border-[#ebdccb] rounded-3xl overflow-hidden">
              <button
                onClick={() => setShowIndoTranslation(!showIndoTranslation)}
                className="w-full p-4 bg-[#faf6f0] hover:bg-[#f5ece1] transition flex items-center justify-between text-xs font-bold text-[#3d2411]"
              >
                <div className="flex items-center space-x-2">
                  <span>🇮🇩</span>
                  <span>Buka Terjemahan Lengkap Bahasa Indonesia</span>
                </div>
                {showIndoTranslation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showIndoTranslation && (
                <div className="p-4 bg-white text-xs text-[#5c391d] space-y-3 leading-relaxed border-t border-[#f5ece1]">
                  <p className="italic font-serif text-[#3d2411] text-sm">
                    "{readingStory.fullTranslationIndo}"
                  </p>
                  <div className="p-2.5 rounded-2xl bg-[#faf6f0] border border-[#ebdccb] text-[11px] text-[#784e2a]">
                    {readingStory.culturalFootnote}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Kuis Pemahaman Bacaan */}
        <div className="space-y-6">
          <div className="bg-[#fffdfa] rounded-3xl p-5 sm:p-6 border border-[#ebdccb] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5ece1]">
              <h3 className="text-sm font-bold text-[#3d2411] flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-[#784e2a]" />
                <span>Kuis Pemahaman ({currentLevel})</span>
              </h3>
              <span className="text-[10px] font-bold text-[#166534] bg-[#f0fdf4] px-2.5 py-0.5 rounded-full border border-[#bbf7d0]">
                {readingStory.comprehensionQuiz.length} Soal
              </span>
            </div>

            {readingStory.comprehensionQuiz.map((quizItem, qIdx) => {
              const questionKey = `q_${qIdx}`;
              return (
                <div key={quizItem.id} className="space-y-2.5 pt-2 border-t border-[#f5ece1] first:border-0 first:pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5c391d] bg-[#f5ece1] px-2 py-0.5 rounded border border-[#dcc1a4]">
                      SOAL {qIdx + 1} · {quizItem.type}
                    </span>
                    {quizItem.badge && (
                      <span className="text-[10px] font-bold text-[#784e2a] bg-[#faf6f0] px-2 py-0.5 rounded border border-[#ebdccb]">
                        {quizItem.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-[#3d2411] font-chinese">
                    {quizItem.question}
                  </h4>
                  {quizItem.questionSub && (
                    <p className="text-xs text-[#784e2a]">
                      {quizItem.questionSub}
                    </p>
                  )}

                  {quizItem.audioClipText && (
                    <button
                      onClick={() => handlePlayClip(quizItem.audioClipText)}
                      className="w-full py-2 px-3 rounded-xl bg-[#faf6f0] hover:bg-[#f5ece1] border border-[#ebdccb] text-[#5c391d] text-xs font-bold flex items-center justify-center space-x-2 transition"
                    >
                      <Volume2 className="w-4 h-4 text-[#784e2a]" />
                      <span>Dengarkan Klip Audio</span>
                    </button>
                  )}

                  <div className="grid grid-cols-1 gap-2 text-xs">
                    {quizItem.options.map((opt) => {
                      const optKey = opt.id || opt.text;
                      const isSelected = quizAnswers[questionKey] === optKey;

                      return (
                        <button
                          key={optKey}
                          onClick={() => handleAnswerSelect(questionKey, optKey)}
                          className={`p-2.5 rounded-2xl border text-left transition flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#f5ece1] border-[#784e2a] text-[#3d2411] font-bold shadow-2xs'
                              : 'bg-white border-[#ebdccb] text-[#5c391d] hover:bg-[#faf6f0]'
                          }`}
                        >
                          <div>
                            {opt.hanzi && (
                              <span className="font-chinese font-bold block text-sm">{opt.hanzi}</span>
                            )}
                            <span className="text-xs text-[#5c391d] font-medium">{opt.text || opt.meaning}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#784e2a] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="pt-2 space-y-2">
              <button
                onClick={handleCheckQuiz}
                className="w-full py-3 rounded-2xl bg-[#784e2a] hover:bg-[#5c391d] text-white font-bold text-xs shadow-xs transition flex items-center justify-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Periksa Jawaban Cerita</span>
              </button>

              <button
                onClick={() => {
                  audioService.playTapSound();
                  if (onProceedToConversation) onProceedToConversation();
                }}
                className="w-full py-3 rounded-2xl bg-[#f5ece1] hover:bg-[#ead7c4] border border-[#dcc1a4] text-[#784e2a] font-extrabold text-xs transition flex items-center justify-center space-x-2 cursor-pointer shadow-2xs"
              >
                <span>Lanjut ke Percakapan (Conversation)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
