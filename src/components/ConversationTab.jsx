import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  MessageSquare, 
  Compass, 
  Coffee, 
  ShoppingBag, 
  GraduationCap, 
  Users, 
  Sparkles, 
  Smile, 
  Clock, 
  RotateCcw,
  Headphones,
  CheckCircle2,
  Award,
  ArrowRight
} from 'lucide-react';
import { DAILY_CONVERSATIONS } from '../data/conversationsData';
import { audioService } from '../services/speechService';

export default function ConversationTab({ 
  globalShowPinyin = true,
  audioSpeed = 1.0,
  activeUnitSession = null,
  onCompleteLesson = null,
  onRepeatLesson = null
}) {
  const [selectedCategory, setSelectedCategory] = useState("Shopping");
  const [showPinyin, setShowPinyin] = useState(globalShowPinyin);
  const [showIndonesian, setShowIndonesian] = useState(true);
  const [speed, setSpeed] = useState(audioSpeed || 1.0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  React.useEffect(() => {
    setShowPinyin(globalShowPinyin);
  }, [globalShowPinyin]);

  const currentTopic = DAILY_CONVERSATIONS.find(c => c.category === selectedCategory) || DAILY_CONVERSATIONS[0];

  const categories = [
    { id: "Shopping", label: "Shopping (Belanja)", icon: ShoppingBag },
    { id: "Greetings", label: "Greetings (Salam)", icon: Smile },
    { id: "Self Introduction", label: "Self Intro (Perkenalan)", icon: Sparkles },
    { id: "Restaurant", label: "Restaurant (Restoran)", icon: Coffee },
    { id: "Travel", label: "Travel (Wisata)", icon: Compass },
    { id: "University", label: "University (Kampus)", icon: GraduationCap },
    { id: "Family", label: "Family (Keluarga)", icon: Users },
    { id: "Hobbies", label: "Hobbies (Hobi)", icon: MessageSquare },
    { id: "Daily Activities", label: "Daily (Aktivitas)", icon: Clock }
  ];

  const handlePlaySentence = (text, idx) => {
    setActiveSentenceIndex(idx);
    audioService.playMandarin(
      text, 
      speed,
      () => setActiveSentenceIndex(idx),
      () => setActiveSentenceIndex(null)
    );
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      audioService.stop();
      setIsPlayingAll(false);
      setActiveSentenceIndex(null);
      return;
    }

    setIsPlayingAll(true);
    let index = 0;

    const playNext = () => {
      if (index >= currentTopic.dialogues.length) {
        setIsPlayingAll(false);
        setActiveSentenceIndex(null);
        return;
      }
      setActiveSentenceIndex(index);
      const text = currentTopic.dialogues[index].hanzi;
      index++;
      audioService.playMandarin(text, speed, null, () => {
        setTimeout(playNext, 400);
      });
    };

    playNext();
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-fadeIn">
      {/* Guided Lesson Workflow Banner: Langkah 3/3 (Percakapan - Tahap Terakhir Unit) */}
      <div className="bg-gradient-to-r from-[#f5ece1] to-[#faf6f0] p-4 sm:p-5 rounded-3xl border border-[#dcc1a4] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center space-x-3 text-left w-full sm:w-auto">
          <div className="w-9 h-9 rounded-2xl bg-[#166534] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
            3/3
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#166534] bg-[#dcfce7] px-2 py-0.5 rounded-md border border-[#bbf7d0]">
                TAHAP TERAKHIR UNIT
              </span>
              <span className="text-[11px] font-bold text-[#8c6849]">Langkah 3 dari 3</span>
            </div>
            <h3 className="text-sm font-bold text-[#3d2411] mt-0.5">
              {activeUnitSession?.title ? activeUnitSession.title : `Latihan Dialog Percakapan Nyata`}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {onRepeatLesson && (
            <button
              onClick={() => {
                audioService.playTapSound();
                onRepeatLesson();
              }}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-2xl bg-[#faf6f0] hover:bg-[#f5ece1] text-[#784e2a] text-xs font-bold border border-[#ebdccb] transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Unit</span>
            </button>
          )}

          {onCompleteLesson && (
            <button
              onClick={() => {
                audioService.playSuccessSound();
                onCompleteLesson();
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer active:scale-95"
            >
              <Award className="w-4 h-4 text-[#fcd34d]" />
              <span>Akhiri Lesson (+100 XP)</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Header */}
      <div className="bg-[#fffdfa] rounded-3xl p-5 sm:p-6 border border-[#ebdccb] shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-[#8c6849] font-medium">
            <span className="font-bold px-2.5 py-0.5 rounded-lg bg-[#f5ece1] text-[#5c391d] border border-[#dcc1a4]">
              PERCAKAPAN
            </span>
            <span>›</span>
            <span className="text-[#3d2411] font-bold">9 Kategori Harian Lengkap</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#3d2411] mt-1">
            {currentTopic.titleIndo}
          </h1>
          <p className="text-xs text-[#784e2a] mt-0.5">
            Tema: {currentTopic.scene} · Dilengkapi audio penutur asli, Hanzi, Pinyin, dan terjemahan.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-2 self-end md:self-auto">
          {/* Continuous Autoplay */}
          <button
            onClick={handlePlayAll}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center space-x-1.5 shadow-xs ${
              isPlayingAll
                ? 'bg-[#5c391d] text-white animate-pulse'
                : 'bg-[#784e2a] hover:bg-[#5c391d] text-white'
            }`}
          >
            {isPlayingAll ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            <span>{isPlayingAll ? 'Hentikan Audio' : 'Putar Seluruh Dialog'}</span>
          </button>

          {/* Pinyin Toggle */}
          <button
            onClick={() => setShowPinyin(!showPinyin)}
            className={`px-3 py-2 rounded-2xl text-xs font-bold border transition ${
              showPinyin ? 'bg-[#f5ece1] text-[#5c391d] border-[#dcc1a4]' : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
            }`}
          >
            文A Pinyin
          </button>

          {/* Indonesian Toggle */}
          <button
            onClick={() => setShowIndonesian(!showIndonesian)}
            className={`px-3 py-2 rounded-2xl text-xs font-bold border transition ${
              showIndonesian ? 'bg-[#eff6ff] text-[#1e3a8a] border-[#bfdbfe]' : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
            }`}
          >
            🇮🇩 Terjemahan
          </button>

          {/* Speed Pills */}
          <div className="flex items-center space-x-1 bg-[#faf6f0] p-1 rounded-2xl border border-[#ebdccb] text-xs font-semibold">
            {[0.75, 1.0, 1.25].map(sVal => (
              <button
                key={sVal}
                onClick={() => setSpeed(sVal)}
                className={`px-2 py-1 rounded-xl transition ${
                  speed === sVal ? 'bg-[#3d2411] text-white font-bold' : 'text-[#784e2a]'
                }`}
              >
                {sVal}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 9 Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                audioService.stop();
                setIsPlayingAll(false);
                setActiveSentenceIndex(null);
                audioService.playTapSound();
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-1.5 shrink-0 ${
                isSelected
                  ? 'bg-[#784e2a] text-white shadow-xs'
                  : 'bg-[#fffdfa] text-[#5c391d] border border-[#ebdccb] hover:bg-[#faf6f0]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dialogue Thread Card */}
      <div className="bg-[#fffdfa] rounded-3xl p-6 sm:p-8 border border-[#ebdccb] shadow-xs space-y-6">
        <div className="space-y-4">
          {currentTopic.dialogues.map((item, idx) => {
            const isSpeakerRight = idx % 2 === 1;
            const isCurrentlyPlaying = activeSentenceIndex === idx;

            return (
              <div
                key={idx}
                className={`flex items-start space-x-3 transition-all ${
                  isSpeakerRight ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Speaker Avatar */}
                <div className="w-10 h-10 rounded-full bg-[#f5ece1] border border-[#dcc1a4] flex items-center justify-center text-xl shrink-0 shadow-2xs">
                  {item.avatar}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-xl rounded-3xl p-3.5 sm:p-4 transition-all ${
                    isCurrentlyPlaying
                      ? 'ring-2 ring-[#94663b] bg-[#f5ece1] border border-[#dcc1a4]'
                      : isSpeakerRight
                      ? 'bg-[#faf6f0] border border-[#ebdccb]'
                      : 'bg-white border border-[#ebdccb] shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#ebdccb]/60 mb-2">
                    <span className="text-xs font-bold text-[#5c391d]">{item.speaker}</span>
                    <button
                      onClick={() => handlePlaySentence(item.hanzi, idx)}
                      className="p-1 rounded-xl text-[#784e2a] hover:bg-[#f5ece1] transition"
                      title="Dengarkan Baris Ini"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Hanzi */}
                  <p className="text-base sm:text-lg font-bold font-chinese text-[#3d2411] leading-snug">
                    {item.hanzi}
                  </p>

                  {/* Pinyin */}
                  {showPinyin && (
                    <p className="text-xs font-semibold text-[#784e2a] font-sans mt-1">
                      {item.pinyin}
                    </p>
                  )}

                  {/* Indonesian */}
                  {showIndonesian && (
                    <p className="text-xs text-[#8c6849] italic mt-1.5 border-t border-[#f5ece1] pt-1.5">
                      "{item.indonesian}"
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Culture note for conversation */}
        <div className="p-4 bg-[#faf6f0] rounded-2xl border border-[#ebdccb] text-xs text-[#5c391d] flex items-start space-x-3">
          <span className="text-base">🏮</span>
          <div>
            <strong className="block font-bold">Tips Konversasi Penutur Asli:</strong>
            <p className="mt-0.5 leading-relaxed text-[#784e2a]">
              Perhatikan partikel nada seperti 吧 (ba) untuk saran ramah, dan 呢 (ne) untuk bertanya balik. Jangan ragu memutar ulang audio untuk meniru jeda intonasi penutur asli!
            </p>
          </div>
        </div>

        {/* Milestone Completion Card: Akhiri Lesson (+XP) atau Ulangi */}
        <div className="p-6 bg-gradient-to-br from-[#fffdfa] via-[#f5ece1] to-[#fffdfa] rounded-3xl border-2 border-[#dcc1a4] shadow-sm text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#166534] text-white flex items-center justify-center text-xl shadow-md">
            🎉
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-[#3d2411]">
              Selamat! Kamu Telah Menuntaskan Unit Pembelajaran Ini!
            </h3>
            <p className="text-xs text-[#784e2a] max-w-md mx-auto">
              Kamu telah berhasil melalui 3 tahapan: <strong>Kosakata &amp; Tata Bahasa</strong> ➔ <strong>Ruang Baca</strong> ➔ <strong>Percakapan Nyata</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {onRepeatLesson && (
              <button
                onClick={() => {
                  audioService.playTapSound();
                  onRepeatLesson();
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white hover:bg-[#faf6f0] border border-[#ebdccb] text-[#784e2a] font-bold text-xs transition flex items-center justify-center space-x-2 shadow-2xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Unit Ini</span>
              </button>
            )}

            {onCompleteLesson && (
              <button
                onClick={() => {
                  audioService.playSuccessSound();
                  onCompleteLesson();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#166534] hover:bg-[#14532d] text-white font-extrabold text-xs shadow-md transition flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              >
                <Award className="w-4 h-4 text-[#fcd34d]" />
                <span>Akhiri Lesson &amp; Klaim +100 XP 🏆</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
