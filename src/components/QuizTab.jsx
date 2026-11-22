import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Zap, 
  Target, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Award,
  Sparkles,
  ShieldCheck,
  Check,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Lock,
  Unlock,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getQuizByLevel, HSK_LEVELS_META } from '../data/learningData';
import { getMockTestByLevel, isLevelMockUnlocked } from '../data/mockTestData';
import { audioService } from '../services/speechService';
import Mascot from './Mascot';

export default function QuizTab({ 
  currentLevel = "HSK 1", 
  onCompleteQuiz,
  globalShowPinyin = true,
  completedUnits = [],
  audioSpeed = 1.0,
  onSelectTab = null
}) {
  const quizData = getQuizByLevel(currentLevel);
  const activeLevelMeta = HSK_LEVELS_META[currentLevel] || HSK_LEVELS_META["HSK 1"];
  const mockTestData = getMockTestByLevel(currentLevel);
  const mockUnlockInfo = isLevelMockUnlocked(currentLevel, completedUnits);
  const [previewBypass, setPreviewBypass] = useState(false);
  const isMockUnlocked = mockUnlockInfo.isUnlocked || previewBypass;

  const [examMode, setExamMode] = useState('practice'); // 'practice' | 'mock'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Flatten Mock Test Questions into a single list with section tags
  const allMockQuestions = React.useMemo(() => {
    if (!mockTestData || !mockTestData.sections) return [];
    const list = [];
    let num = 1;
    mockTestData.sections.forEach(sec => {
      sec.questions.forEach(q => {
        list.push({
          ...q,
          number: num++,
          sectionId: sec.id,
          sectionName: sec.name,
          sectionDesc: sec.description
        });
      });
    });
    return list;
  }, [mockTestData]);

  const activeQuestions = examMode === 'mock' ? allMockQuestions : quizData.questions;
  const [timeLeft, setTimeLeft] = useState(examMode === 'mock' ? 35 * 60 : quizData.timeLimitSeconds);
  const [userScore, setUserScore] = useState(0);
  const [answersState, setAnswersState] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [mascotReaction, setMascotReaction] = useState({
    mood: 'happy',
    message: 'Semangat belajar Mandarin! Cha-Cha siap menemanimu.'
  });

  // Question: Sentence Arrangement state
  const [assembledWords, setAssembledWords] = useState([]);
  
  // Question: Matching Pairs state
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState({});

  // Reset when level changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setTimeLeft(quizData.timeLimitSeconds);
    setUserScore(0);
    setAnswersState({});
    setShowHint(false);
    setQuizCompleted(false);
    setShowExplanation(false);
    setAssembledWords([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedPairs({});
    setMascotReaction({ mood: 'happy', message: 'Semangat belajar Mandarin! Cha-Cha siap menemanimu.' });
  }, [currentLevel]);

  // Reset timer when examMode changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setAnswersState({});
    setAssembledWords([]);
    setMatchedPairs({});
    setShowHint(false);
    setTimeLeft(examMode === 'mock' ? 35 * 60 : quizData.timeLimitSeconds);
    setMascotReaction({ mood: 'happy', message: examMode === 'mock' ? '📋 Mode Simulasi HSK aktif! Konsentrasi penuh ya~' : 'Semangat belajar Mandarin! Cha-Cha siap menemanimu.' });
  }, [examMode]);

  const currentQ = activeQuestions[currentQuestionIndex] || activeQuestions[0];

  // Timer countdown
  useEffect(() => {
    if (quizCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quizCompleted]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handlePlayAudio = (text) => {
    audioService.playMandarin(text, audioSpeed || 1.0);
  };

  const handleToggleSentenceChip = (word) => {
    audioService.playTapSound();
    if (assembledWords.find(w => w.id === word.id)) {
      setAssembledWords(assembledWords.filter(w => w.id !== word.id));
    } else {
      setAssembledWords([...assembledWords, word]);
    }
  };

  const handleLeftClick = (item) => {
    audioService.playTapSound();
    setSelectedLeft(item);
    if (selectedRight) {
      checkPair(item, selectedRight);
    }
  };

  const handleRightClick = (item) => {
    audioService.playTapSound();
    setSelectedRight(item);
    if (selectedLeft) {
      checkPair(selectedLeft, item);
    }
  };

  const checkPair = (left, right) => {
    if (left.meaning === right.meaning) {
      audioService.playSuccessSound();
      setMatchedPairs(prev => ({ ...prev, [left.hanzi]: right.meaning }));
    } else {
      audioService.playErrorSound();
    }
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const handleGenericOptionSelect = (option) => {
    audioService.playTapSound();
    const isCorrect = option.isCorrect;
    setAnswersState(prev => ({
      ...prev,
      [currentQ.id]: {
        selected: option.id || option.text,
        isCorrect: !!isCorrect
      }
    }));
  };

  const handleCheckAndNext = () => {
    let isCurrentCorrect = false;

    if (currentQ.type === 'sentence_arrangement') {
      const assembledText = assembledWords.map(w => w.hanzi).join('');
      const targetText = currentQ.correctOrder.join('');
      isCurrentCorrect = assembledText === targetText;
      setAnswersState(prev => ({
        ...prev,
        [currentQ.id]: { isCorrect: isCurrentCorrect }
      }));
    } else if (currentQ.type === 'match_pairs') {
      isCurrentCorrect = Object.keys(matchedPairs).length === currentQ.pairs.length;
      setAnswersState(prev => ({
        ...prev,
        [currentQ.id]: { isCorrect: isCurrentCorrect }
      }));
    } else {
      const curAnswer = answersState[currentQ.id];
      isCurrentCorrect = curAnswer ? curAnswer.isCorrect : false;
    }

    if (isCurrentCorrect) {
      audioService.playSuccessSound();
      setUserScore(prev => prev + 50);
      setMascotReaction({
        mood: 'cheering',
        message: 'Luar biasa! Jawabanmu tepat sekali! 🎉'
      });
    } else {
      audioService.playErrorSound();
      setMascotReaction({
        mood: 'thinking',
        message: 'Hampir benar! Jangan berkecil hati, yuk cermati pembahasannya! 💪'
      });
    }

    setShowExplanation(true);

    setTimeout(() => {
      setShowExplanation(false);
      setShowHint(false);
      setAssembledWords([]);
      setSelectedLeft(null);
      setSelectedRight(null);
      if (currentQuestionIndex < activeQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        handleFinishQuiz();
      }
    }, 1200);
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);
    audioService.playSuccessSound();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
    if (onCompleteQuiz) onCompleteQuiz();
  };

  const calculateAccuracy = () => {
    const answeredCount = Object.keys(answersState).length;
    if (answeredCount === 0) return 100;
    const correctCount = Object.values(answersState).filter(a => a.isCorrect).length;
    return Math.round((correctCount / answeredCount) * 100);
  };

  if (quizCompleted) {
    const accuracy = calculateAccuracy();
    const isPerfect = accuracy === 100;
    const isGood = accuracy >= 70;
    return (
      <div className="py-12 max-w-2xl mx-auto px-4 text-center space-y-6 animate-fadeIn">
        <div className="bg-[#fffdfa] rounded-3xl p-8 border border-[#ebdccb] shadow-xl space-y-6">
          <div className="mx-auto flex justify-center">
            <Mascot 
              size={96} 
              mood={isPerfect ? "cheering" : isGood ? "happy" : "thinking"} 
              showQuoteOnClick={true}
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#3d2411]">
              {isPerfect ? '🎊 Sempurna! Kamu Luar Biasa!' : isGood ? '🎉 Evaluasi Selesai!' : '📚 Terus Semangat Belajar!'}
            </h2>
            <p className="text-sm text-[#784e2a]">
              {isPerfect
                ? 'Jawaban 100% benar! Cha-Cha bangga setengah mati sama kamu~ 🧋'
                : isGood
                ? `Na Cha sangat bangga! Skor ${accuracy}% sangat bagus untuk level ${currentLevel}!`
                : `Jangan putus asa! Ulangi materi ${currentLevel} dan coba lagi — Cha-Cha percaya kamu bisa!`
              }
            </p>
          </div>

          {/* Score breakdown */}
          <div className="grid grid-cols-3 gap-3 py-4">
            <div className="p-3 bg-[#faf6f0] rounded-2xl border border-[#ebdccb]">
              <span className="text-xs text-[#784e2a] font-bold block">XP Diperoleh</span>
              <span className="text-2xl font-black text-[#5c391d]">+{quizData.xpAccumulated}</span>
            </div>
            <div className={`p-3 rounded-2xl border ${accuracy >= 70 ? 'bg-[#f0fdf4] border-[#bbf7d0]' : 'bg-[#fef3c7] border-[#fde68a]'}`}>
              <span className={`text-xs font-bold block ${accuracy >= 70 ? 'text-[#166534]' : 'text-[#78350f]'}`}>Akurasi</span>
              <span className={`text-2xl font-black ${accuracy >= 70 ? 'text-[#15803d]' : 'text-[#b45309]'}`}>{accuracy}%</span>
            </div>
            <div className="p-3 bg-[#fef3c7] rounded-2xl border border-[#fde68a]">
              <span className="text-xs text-[#78350f] font-bold block">Sisa Waktu</span>
              <span className="text-2xl font-black text-[#b45309]">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Grade badge */}
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-extrabold border ${
            accuracy === 100 ? 'bg-[#f0fdf4] border-[#bbf7d0] text-[#15803d]' :
            accuracy >= 80  ? 'bg-[#fef3c7] border-[#fde68a] text-[#78350f]' :
            accuracy >= 60  ? 'bg-[#f5ece1] border-[#dcc1a4] text-[#784e2a]' :
                              'bg-[#fee2e2] border-[#fecaca] text-[#991b1b]'
          }`}>
            <span>{accuracy === 100 ? '🏆 Nilai A+ Sempurna' : accuracy >= 80 ? '⭐ Nilai B+ Sangat Baik' : accuracy >= 60 ? '📖 Nilai C Cukup' : '💪 Perlu Latihan Lagi'}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setQuizCompleted(false);
                setCurrentQuestionIndex(0);
                setAnswersState({});
                setAssembledWords([]);
                setMatchedPairs({});
                setTimeLeft(quizData.timeLimitSeconds);
                setMascotReaction({ mood: 'happy', message: 'Semangat belajar Mandarin! Cha-Cha siap menemanimu.' });
              }}
              className="flex-1 py-3.5 rounded-2xl bg-[#784e2a] hover:bg-[#5c391d] text-white font-bold text-sm shadow-md transition flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Evaluasi</span>
            </button>
            <button
              onClick={() => {
                setQuizCompleted(false);
                setCurrentQuestionIndex(0);
                setAnswersState({});
                setAssembledWords([]);
                setMatchedPairs({});
                setTimeLeft(examMode === 'mock' ? 35 * 60 : quizData.timeLimitSeconds);
                setExamMode(examMode === 'mock' ? 'practice' : 'mock');
                setMascotReaction({ mood: 'happy', message: 'Semangat belajar Mandarin! Cha-Cha siap menemanimu.' });
              }}
              className="flex-1 py-3.5 rounded-2xl bg-[#f5ece1] hover:bg-[#ead7c4] text-[#784e2a] font-bold text-sm border border-[#dcc1a4] transition flex items-center justify-center space-x-2"
            >
              <span>{examMode === 'mock' ? '📖 Mode Latihan' : '📋 Coba Mock Exam'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  const isTimerWarning = timeLeft < 120 && timeLeft > 0; // less than 2 min

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-fadeIn">
      {/* Mode Switcher: Latihan Evaluasi Harian vs Simulasi Resmi Mock Test */}
      <div className="bg-[#fffdfa] rounded-2xl p-1.5 border border-[#ebdccb] shadow-2xs flex items-center justify-between gap-2 max-w-md mx-auto">
        <button
          onClick={() => {
            setExamMode('practice');
            setCurrentQuestionIndex(0);
            setAnswersState({});
            setAssembledWords([]);
            setMatchedPairs({});
            setTimeLeft(quizData.timeLimitSeconds);
            audioService.playTapSound();
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
            examMode === 'practice'
              ? 'bg-[#784e2a] text-white shadow-xs'
              : 'text-[#784e2a] hover:bg-[#f5ece1]'
          }`}
        >
          <span>📝 Latihan Harian</span>
        </button>

        <button
          onClick={() => {
            setExamMode('mock');
            setCurrentQuestionIndex(0);
            setAnswersState({});
            setAssembledWords([]);
            setMatchedPairs({});
            setTimeLeft(35 * 60);
            audioService.playTapSound();
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
            examMode === 'mock'
              ? 'bg-[#784e2a] text-white shadow-xs'
              : 'text-[#784e2a] hover:bg-[#f5ece1]'
          }`}
        >
          <span>🏆 Mock Test Resmi HSK</span>
          {!isMockUnlocked && <Lock className="w-3.5 h-3.5 ml-1 opacity-70" />}
        </button>
      </div>

      {/* JIKA MOCK TEST DIPILIH TAPI BELUM DIBUKA */}
      {examMode === 'mock' && !isMockUnlocked ? (
        <div className="bg-[#fffdfa] rounded-3xl p-8 border-2 border-[#ebdccb] shadow-sm text-center space-y-6 max-w-2xl mx-auto animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-[#f5ece1] text-[#784e2a] flex items-center justify-center mx-auto text-3xl border border-[#dcc1a4]">
            🔒
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#b45309] bg-[#fef3c7] px-3 py-1 rounded-full border border-[#fde68a]">
              SYARAT KELULUSAN BAB BELUM TERPENUHI
            </span>
            <h2 className="text-xl font-black text-[#3d2411]">
              Simulasi Ujian Resmi HSK {currentLevel} Terkunci
            </h2>
            <p className="text-xs text-[#784e2a] max-w-md mx-auto leading-relaxed">
              Untuk memastikan kesiapan ujian yang optimal, selesaikan seluruh bab unit pada tingkat <strong>{currentLevel}</strong> di Beranda terlebih dahulu.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="p-4 bg-[#faf6f0] rounded-2xl border border-[#ebdccb] space-y-2 text-left">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#5c391d]">Progres Penyelesaian Bab:</span>
              <span className="text-[#784e2a]">{mockUnlockInfo.completedCount} dari {mockUnlockInfo.totalCount} Unit ({mockUnlockInfo.percentage}%)</span>
            </div>
            <div className="w-full bg-[#ebdccb] h-3 rounded-full overflow-hidden">
              <div 
                className="bg-[#166534] h-full rounded-full transition-all duration-500"
                style={{ width: `${mockUnlockInfo.percentage}%` }}
              />
            </div>
          </div>

          {/* 4 Skill Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-left">
            <div className="p-3 bg-[#faf6f0] rounded-xl border border-[#ebdccb]">
              <span className="text-sm block">🎧</span>
              <strong className="block text-[#3d2411] font-bold mt-1">Listening</strong>
              <span className="text-[10px] text-[#8c6849]">Simulasi Audio Asli</span>
            </div>
            <div className="p-3 bg-[#faf6f0] rounded-xl border border-[#ebdccb]">
              <span className="text-sm block">📖</span>
              <strong className="block text-[#3d2411] font-bold mt-1">Reading</strong>
              <span className="text-[10px] text-[#8c6849]">Pemahaman Hanzi</span>
            </div>
            <div className="p-3 bg-[#faf6f0] rounded-xl border border-[#ebdccb]">
              <span className="text-sm block">✍️</span>
              <strong className="block text-[#3d2411] font-bold mt-1">Writing</strong>
              <span className="text-[10px] text-[#8c6849]">Susun Tata Bahasa</span>
            </div>
            <div className="p-3 bg-[#faf6f0] rounded-xl border border-[#ebdccb]">
              <span className="text-sm block">🗣️</span>
              <strong className="block text-[#3d2411] font-bold mt-1">Speaking</strong>
              <span className="text-[10px] text-[#8c6849]">Pelafalan &amp; Nada</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {onSelectTab && (
              <button
                onClick={() => onSelectTab('home')}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#784e2a] hover:bg-[#5c391d] text-white text-xs font-bold transition flex items-center justify-center space-x-2 shadow-xs cursor-pointer active:scale-95"
              >
                <span>Buka Unit Belajar di Beranda</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => {
                setPreviewBypass(true);
                audioService.playSuccessSound();
              }}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-[#f5ece1] hover:bg-[#ead7c4] text-[#784e2a] border border-[#dcc1a4] text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer"
              title="Khusus Dosen / Asisten untuk menguji simulasi ujian langsung"
            >
              <Unlock className="w-4 h-4 text-[#d97706]" />
              <span>Buka Kunci Demo Asisten / Review</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Top Header: Evaluation Title & Live Stats */}
          <div className="bg-[#fffdfa] rounded-3xl p-4 sm:p-5 border border-[#ebdccb] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#784e2a] flex items-center justify-center text-white font-bold shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-[#f5ece1] text-[#5c391d] border border-[#dcc1a4]">
                      {currentLevel} · {examMode === 'mock' ? '🏆 SIMULASI HSK RESMI' : 'EVALUASI LATIHAN'}
                    </span>
                    <span className="text-[#d97706] text-xs">★★★★</span>
                  </div>
                  <h1 className="text-base sm:text-lg font-bold text-[#3d2411] mt-0.5">
                    {examMode === 'mock' ? `Simulasi Ujian Resmi HSK ${currentLevel} (Listening, Reading, Writing, Speaking)` : quizData.title}
                  </h1>
                </div>
              </div>

              {/* Stats pills */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs w-full sm:w-auto justify-start">
                <div className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-bold border shrink-0 ${
                  isTimerWarning
                    ? 'bg-[#fee2e2] text-[#991b1b] border-[#fecaca] timer-warning'
                    : 'bg-[#faf6f0] text-[#5c391d] border-[#ebdccb]'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">SISA WAKTU </span>
                  <span>{formatTime(timeLeft)}</span>
                  {isTimerWarning && <span className="animate-pulse">⚠️</span>}
                </div>
                <div className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#fef3c7] border border-[#fde68a] text-[#78350f] font-bold shrink-0">
                  <Zap className="w-3.5 h-3.5 text-[#d97706] fill-[#d97706]" />
                  <span>+{examMode === 'mock' ? 500 : quizData.xpAccumulated} XP</span>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] font-bold shrink-0">
                  <Target className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>Akurasi {calculateAccuracy()}%</span>
                </div>
              </div>
            </div>

            {/* Mock Test 4-Section Indicator Pills */}
            {examMode === 'mock' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-1">
                <div className={`p-2 rounded-xl border transition flex items-center justify-center space-x-1.5 ${
                  currentQ.sectionId === 'listening' ? 'bg-[#784e2a] text-white font-bold shadow-xs' : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
                }`}>
                  <Headphones className="w-3.5 h-3.5" />
                  <span>1. Listening</span>
                </div>
                <div className={`p-2 rounded-xl border transition flex items-center justify-center space-x-1.5 ${
                  currentQ.sectionId === 'reading' ? 'bg-[#784e2a] text-white font-bold shadow-xs' : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
                }`}>
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>2. Reading</span>
                </div>
                <div className={`p-2 rounded-xl border transition flex items-center justify-center space-x-1.5 ${
                  currentQ.sectionId === 'writing' ? 'bg-[#784e2a] text-white font-bold shadow-xs' : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
                }`}>
                  <PenTool className="w-3.5 h-3.5" />
                  <span>3. Writing</span>
                </div>
                <div className={`p-2 rounded-xl border transition flex items-center justify-center space-x-1.5 ${
                  currentQ.sectionId === 'speaking' ? 'bg-[#784e2a] text-white font-bold shadow-xs' : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
                }`}>
                  <Mic className="w-3.5 h-3.5" />
                  <span>4. Speaking</span>
                </div>
              </div>
            )}

            {/* Question Navigator Bar */}
            <div className="pt-2 border-t border-[#f5ece1] flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#8c6849]">
                Navigasi Soal ({activeQuestions.length} Soal):
              </span>
              <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
                {activeQuestions.map((q, idx) => {
                  const isCurrent = currentQuestionIndex === idx;
                  const isAnswered = answersState[q.id];

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-7 h-7 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                        isCurrent
                          ? 'bg-[#784e2a] text-white shadow-xs'
                          : isAnswered
                          ? isAnswered.isCorrect
                            ? 'bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]'
                            : 'bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]'
                          : 'bg-[#faf6f0] text-[#784e2a] hover:bg-[#f5ece1]'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

      {/* Main Question Interface Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Question Body */}
        <div className="lg:col-span-2 bg-[#fffdfa] rounded-3xl p-6 sm:p-7 border border-[#ebdccb] shadow-xs space-y-6">
          {/* Question Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5c391d] bg-[#f5ece1] px-2.5 py-0.5 rounded border border-[#dcc1a4]">
                TIPE SOAL: {currentQ.typeName}
              </span>
              <span className="text-xs font-bold text-[#b45309] bg-[#fef3c7] px-2.5 py-0.5 rounded border border-[#fde68a]">
                Bobot: +50 XP
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#3d2411] leading-snug">
              {currentQ.prompt}
            </h3>
          </div>

          {/* AUDIO PLAYER */}
          {currentQ.audioText && (
            <div className="bg-[#faf6f0] rounded-2xl p-4 border border-[#ebdccb] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handlePlayAudio(currentQ.audioText)}
                  className="w-10 h-10 rounded-full bg-[#784e2a] hover:bg-[#5c391d] text-white flex items-center justify-center transition shadow-xs"
                >
                  <Volume2 className="w-5 h-5 fill-white" />
                </button>
                <div>
                  <span className="text-xs font-bold text-[#3d2411] block">
                    Pelafalan Penutur Asli ({currentLevel})
                  </span>
                  <span className="text-[10px] text-[#8c6849] uppercase tracking-wide">
                    {currentQ.speakerOrigin || 'Kecepatan Standar · Format HSK'}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {[8, 16, 12, 20, 10].map((h, i) => (
                  <span key={i} style={{ height: `${h}px` }} className="w-1 bg-[#94663b] rounded-full" />
                ))}
                <span className="text-xs font-bold text-[#784e2a] ml-1.5">1.0x</span>
              </div>
            </div>
          )}

          {/* QUESTION TYPE: SENTENCE ARRANGEMENT */}
          {currentQ.type === 'sentence_arrangement' && (
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="font-bold text-xs text-[#5c391d] block">TARGET SUSUNAN KALIMAT (SLOT TERPASANG):</span>
                <div className="min-h-[64px] bg-[#faf6f0] border-2 border-dashed border-[#dcc1a4] rounded-2xl p-3 flex flex-wrap items-center gap-2.5">
                  {assembledWords.length === 0 ? (
                    <span className="text-xs text-[#8c6849] italic px-2">
                      Klik keping kata pada bank kata di bawah untuk menyusun kalimat...
                    </span>
                  ) : (
                    assembledWords.map((word, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleToggleSentenceChip(word)}
                        className="bg-white px-3.5 py-2 rounded-xl border border-[#ebdccb] shadow-2xs cursor-pointer hover:border-[#784e2a] text-center transition"
                      >
                        {globalShowPinyin && (
                          <span className="text-xs text-[#8c6849] font-sans block">{word.pinyin}</span>
                        )}
                        <span className="text-base font-bold font-chinese text-[#3d2411] block">{word.hanzi}</span>
                      </div>
                    ))
                  )}
                  {currentQ.hasQuestionMark && (
                    <span className="text-2xl font-bold font-chinese text-[#8c6849] ml-1">?</span>
                  )}
                </div>
              </div>

              {/* Word Bank */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-xs text-[#5c391d] block">PILIHAN KATA TERSEDIA (BANK KATA):</span>
                <div className="flex flex-wrap gap-2.5">
                  {currentQ.wordBank.map((word) => {
                    const isPlaced = assembledWords.find(w => w.id === word.id);
                    return (
                      <button
                        key={word.id}
                        disabled={isPlaced}
                        onClick={() => handleToggleSentenceChip(word)}
                        className={`p-3 rounded-2xl border text-center transition min-w-[80px] ${
                          isPlaced
                            ? 'bg-[#faf6f0] border-[#ebdccb] opacity-40 cursor-not-allowed'
                            : 'bg-white border-[#ebdccb] hover:border-[#784e2a] text-[#3d2411] shadow-2xs'
                        }`}
                      >
                        {globalShowPinyin && (
                          <span className="text-[11px] text-[#8c6849] font-sans block">{word.pinyin}</span>
                        )}
                        <span className="text-base font-bold font-chinese text-[#3d2411] block">{word.hanzi}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* QUESTION TYPE: MATCH PAIRS */}
          {currentQ.type === 'match_pairs' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  {currentQ.pairs.map((p, idx) => {
                    const isMatched = matchedPairs[p.hanzi];
                    const isSelected = selectedLeft?.hanzi === p.hanzi;

                    return (
                      <button
                        key={idx}
                        disabled={isMatched}
                        onClick={() => handleLeftClick(p)}
                        className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                          isMatched
                            ? 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534] font-bold opacity-60'
                            : isSelected
                            ? 'bg-[#f5ece1] border-[#784e2a] text-[#3d2411] ring-2 ring-[#ebdccb]'
                            : 'bg-white border-[#ebdccb] text-[#3d2411] hover:bg-[#faf6f0] shadow-2xs'
                        }`}
                      >
                        <div>
                          <span className="text-xl font-bold font-chinese block">{p.hanzi}</span>
                          {globalShowPinyin && (
                            <span className="text-xs text-[#8c6849] font-sans">{p.pinyin}</span>
                          )}
                        </div>
                        <span className={`w-3 h-3 rounded-full ${isMatched ? 'bg-[#15803d]' : isSelected ? 'bg-[#784e2a]' : 'bg-[#ead7c4]'}`} />
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  {currentQ.pairs.map((p, idx) => {
                    const isMatched = Object.values(matchedPairs).includes(p.meaning);
                    const isSelected = selectedRight?.meaning === p.meaning;

                    return (
                      <button
                        key={idx}
                        disabled={isMatched}
                        onClick={() => handleRightClick(p)}
                        className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                          isMatched
                            ? 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534] font-bold opacity-60'
                            : isSelected
                            ? 'bg-[#eff6ff] border-[#3b82f6] text-[#1e3a8a] ring-2 ring-[#bfdbfe]'
                            : 'bg-white border-[#ebdccb] text-[#3d2411] hover:bg-[#faf6f0] shadow-2xs'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${isMatched ? 'bg-[#15803d]' : isSelected ? 'bg-[#2563eb]' : 'bg-[#ead7c4]'}`} />
                        <span className="text-xs font-bold text-[#3d2411] ml-2">{p.meaning}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {currentQ.tipNote && (
                <div className="p-3 bg-[#faf6f0] border border-[#ebdccb] rounded-2xl text-xs text-[#5c391d]">
                  {currentQ.tipNote}
                </div>
              )}
            </div>
          )}

          {/* GENERIC MULTIPLE CHOICE / OPTIONS */}
          {currentQ.options && (
            <div className="space-y-3">
              {currentQ.passage && (
                <div className="p-4 bg-[#faf6f0] rounded-2xl border border-[#ebdccb] text-xs text-[#5c391d] leading-relaxed font-chinese">
                  {currentQ.passage}
                </div>
              )}

              {currentQ.sentencePrefix && (
                <div className="p-4 bg-[#faf6f0] rounded-2xl border border-[#ebdccb] text-center font-chinese text-lg font-bold text-[#3d2411]">
                  {currentQ.sentencePrefix} <span className="border-b-2 border-[#784e2a] px-4 text-[#784e2a]">_____</span> {currentQ.sentenceSuffix}
                  <p className="text-xs text-[#8c6849] font-sans font-normal mt-1 italic">
                    "{currentQ.sentenceIndo}"
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((opt) => {
                  const optId = opt.id || opt.text;
                  const isSelected = answersState[currentQ.id]?.selected === optId;

                  return (
                    <button
                      key={optId}
                      onClick={() => handleGenericOptionSelect(opt)}
                      className={`p-4 rounded-2xl border text-left transition flex items-start justify-between ${
                        isSelected
                          ? 'bg-[#f5ece1] border-[#784e2a] text-[#3d2411] ring-2 ring-[#ebdccb] font-bold'
                          : 'bg-white border-[#ebdccb] text-[#5c391d] hover:bg-[#faf6f0] shadow-2xs'
                      }`}
                    >
                      <div className="space-y-0.5">
                        {opt.hanzi && (
                          <span className="text-base font-bold font-chinese block">{opt.hanzi}</span>
                        )}
                        {globalShowPinyin && opt.pinyin && (
                          <span className="text-xs text-[#8c6849] font-sans block">{opt.pinyin}</span>
                        )}
                        <span className="text-xs block text-[#3d2411]">{opt.text || opt.meaning}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#784e2a] shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pembahasan Tata Bahasa Otomatis */}
          {(showExplanation || answersState[currentQ.id]) && currentQ.grammarExplanation && (
            <div className="bg-[#f0fdf4] rounded-2xl p-4 border border-[#bbf7d0] space-y-2 animate-fadeIn">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#166534]">
                <ShieldCheck className="w-4 h-4 text-[#15803d]" />
                <span>PEMBAHASAN TATA BAHASA OTOMATIS (VERIFIKASI TUTOR)</span>
              </div>
              <p className="text-xs text-[#14532d] leading-relaxed">
                {currentQ.grammarExplanation.ruleText}
              </p>
              <div className="bg-white p-2.5 rounded-xl border border-[#bbf7d0] text-xs font-mono text-[#15803d]">
                {currentQ.grammarExplanation.formula}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Scenario Banner, Mascot Reaction & Quick Actions */}
        <div className="space-y-5">
          
          {/* Mascot Cha-Cha Emotional Feedback Panel */}
          <div className={`rounded-3xl p-4 border flex items-start space-x-3 transition-all duration-300 relative overflow-visible ${
            mascotReaction.mood === 'cheering'
              ? 'bg-[#f0fdf4] border-[#bbf7d0]'
              : mascotReaction.mood === 'thinking'
              ? 'bg-[#fef3c7] border-[#fde68a]'
              : 'bg-gradient-to-br from-[#f5ece1] to-[#ead7c4]/50 border-[#ebdccb]'
          }`}>
            <div className="shrink-0 relative">
              <Mascot 
                size={52} 
                mood={mascotReaction.mood} 
                showQuoteOnClick={true}
                bubblePosition="top"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#5c391d] bg-[#ead7c4] px-2 py-0.5 rounded-full border border-[#dcc1a4]">
                CHA-CHA SAYS 🧋
              </span>
              <p className={`text-xs font-bold mt-1 leading-relaxed ${
                mascotReaction.mood === 'cheering' ? 'text-[#15803d]' :
                mascotReaction.mood === 'thinking' ? 'text-[#78350f]' :
                'text-[#5c391d]'
              }`}>
                {mascotReaction.message}
              </p>
              <p className="text-[9px] text-[#8c6849] mt-0.5">
                Klik Cha-Cha untuk pesan semangat ✨
              </p>
            </div>
          </div>

          {/* Mock Exam Mode Banner */}
          {examMode === 'mock' && (
            <div className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] rounded-3xl p-4 text-white space-y-2 animate-fadeIn">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#a5b4fc] block">
                📋 MODE SIMULASI HSK AKTIF
              </span>
              <p className="text-xs text-[#c7d2fe] leading-relaxed">
                Mode ini mensimulasikan format ujian resmi HSK. Tanpa petunjuk, waktu 35 menit, bobot soal mengikuti standar ujian internasional.
              </p>
              <div className="text-xs font-bold text-[#a5b4fc]">
                Waktu: {formatTime(timeLeft)} / 35:00
              </div>
            </div>
          )}

          {/* Practice Mode Intro Banner */}
          {examMode === 'practice' && (
            <div className="bg-gradient-to-br from-[#5c391d] to-[#3d2411] rounded-3xl p-4 text-[#fffdfa] shadow-md relative overflow-hidden">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#fcd34d] block">
                EVALUASI LEVEL {currentLevel}
              </span>
              <h3 className="text-base font-bold mt-1 text-white">
                Arena Ujian Na Cha 🧋
              </h3>
              <p className="text-xs text-[#ead7c4] mt-1 leading-relaxed">
                Selesaikan evaluasi untuk memastikan penguasaan kosakata dan rumus kalimat standar <strong>{currentLevel}</strong>.
              </p>
              <button
                onClick={() => {
                  setExamMode('mock');
                  setCurrentQuestionIndex(0);
                  setAnswersState({});
                  setAssembledWords([]);
                  setMatchedPairs({});
                  setTimeLeft(35 * 60);
                  audioService.playTapSound();
                }}
                className="mt-3 text-[10px] font-extrabold text-[#fcd34d] hover:text-white transition underline underline-offset-2"
              >
                Coba Mode Simulasi HSK Mock Exam →
              </button>
            </div>
          )}

          <div className="bg-[#fffdfa] rounded-3xl p-5 border border-[#ebdccb] space-y-3">
            <button
              onClick={handleCheckAndNext}
              className="w-full py-3.5 rounded-2xl bg-[#784e2a] hover:bg-[#5c391d] text-white font-bold text-xs shadow-xs transition flex items-center justify-center space-x-2"
            >
              <span>Cek &amp; Lanjutkan Soal Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {examMode !== 'mock' && (
              <button
                onClick={() => setShowHint(true)}
                className="w-full py-2 px-3 rounded-2xl bg-[#faf6f0] hover:bg-[#f5ece1] text-[#5c391d] border border-[#ebdccb] text-xs font-bold flex items-center justify-center space-x-1"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#b45309]" />
                <span>Petunjuk Guru (-10 XP)</span>
              </button>
            )}

            {showHint && examMode !== 'mock' && (
              <div className="p-3 bg-[#fef3c7] rounded-2xl border border-[#fde68a] text-xs text-[#78350f] animate-fadeIn">
                💡 <strong>Petunjuk Na Cha:</strong> Cermati pola rumus tata bahasa {currentLevel} yang telah dipelajari di tab Kosakata &amp; Tata Bahasa!
              </div>
            )}

            {examMode === 'mock' && (
              <div className="p-2.5 bg-[#f0f0ff] rounded-2xl border border-[#c7d2fe] text-xs text-[#4338ca] font-semibold text-center">
                🚫 Mode Ujian: Petunjuk tidak tersedia
              </div>
            )}
          </div>
        </div>
      </div>
      </>
    )}
    </div>
  );
}
