import React, { useState } from 'react';
import Header from './components/Header';
import HomeTab from './components/HomeTab';
import VocabGrammarTab from './components/VocabGrammarTab';
import ReadingTab from './components/ReadingTab';
import QuizTab from './components/QuizTab';
import ConversationTab from './components/ConversationTab';
import ProfileTab from './components/ProfileTab';
import FlashcardModal from './components/FlashcardModal';
import BookmarkDrawer from './components/BookmarkDrawer';
import MobileBottomNav from './components/MobileBottomNav';
import { USER_PROFILE } from './data/learningData';
import { audioService } from './services/speechService';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentLevel, setCurrentLevel] = useState("HSK 1");
  const [installPrompt, setInstallPrompt] = useState(null);

  // PWA Install Prompt Listener
  React.useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) {
      alert("Aplikasi Na Cha sudah terpasang atau buka menu browser Anda lalu pilih 'Tambahkan ke Layar Utama' (Add to Home Screen).");
      return;
    }
    installPrompt.prompt();
    try {
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallPrompt(null);
      }
    } catch(e) {}
  };
  const handleStartUnit = (unit) => {
    setActiveUnitSession({
      unitId: unit.id,
      title: unit.title,
      level: currentLevel,
      step: 'vocab'
    });
    setActiveTab('vocab-grammar');
  };

  const handleNextStepInSession = (nextTab) => {
    if (activeUnitSession) {
      setActiveUnitSession(prev => ({ ...prev, step: nextTab }));
    }
    setActiveTab(nextTab);
  };

  const handleCompleteUnitLesson = () => {
    if (activeUnitSession) {
      const uId = activeUnitSession.unitId;
      setCompletedUnits(prev => {
        if (prev.includes(uId)) return prev;
        const updated = [...prev, uId];
        try {
          localStorage.setItem('nacha_completed_units', JSON.stringify(updated));
        } catch(e) {}
        return updated;
      });
    }

    // Award +100 XP
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + 100,
      currentDayXP: Math.min(prev.dailyGoalXP, prev.currentDayXP + 30),
      totalWordsLearned: prev.totalWordsLearned + 5
    }));

    audioService.playSuccessSound();
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch(e) {}

    // Clear session and return to home
    setActiveUnitSession(null);
    setActiveTab('home');
  };

  const handleRepeatUnitLesson = () => {
    if (activeUnitSession) {
      setActiveUnitSession(prev => ({ ...prev, step: 'vocab' }));
    }
    setActiveTab('vocab-grammar');
  };
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('nacha_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Replace legacy unsplash human face with cute mascot
        if (parsed.avatar && parsed.avatar.includes('images.unsplash.com')) {
          parsed.avatar = USER_PROFILE.avatar;
          localStorage.setItem('nacha_user_profile', JSON.stringify(parsed));
        }
        return parsed;
      }
    } catch (e) {
      // ignore
    }
    return {
      name: USER_PROFILE.name,
      avatar: USER_PROFILE.avatar,
      title: USER_PROFILE.title
    };
  });

  const handleUpdateProfile = (updates) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem('nacha_user_profile', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const [userStats, setUserStats] = useState({
    streakDays: USER_PROFILE.streakDays,
    xp: USER_PROFILE.xp,
    dailyGoalXP: USER_PROFILE.dailyGoalXP,
    currentDayXP: USER_PROFILE.currentDayXP,
    dailyMinutes: USER_PROFILE.dailyMinutes,
    targetMinutes: USER_PROFILE.targetMinutes,
    totalWordsLearned: USER_PROFILE.totalWordsLearned,
    wordsInReview: 18,
    grammarPointsMastered: 28
  });
  const [isFlashcardOpen, setIsFlashcardOpen] = useState(false);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [showGlobalPinyin, setShowGlobalPinyin] = useState(true);

  const handleLessonComplete = () => {
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + 50,
      currentDayXP: Math.min(prev.dailyGoalXP, prev.currentDayXP + 15),
      totalWordsLearned: prev.totalWordsLearned + 1
    }));
  };

  const handleQuizComplete = () => {
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + 500,
      currentDayXP: prev.dailyGoalXP,
      grammarPointsMastered: prev.grammarPointsMastered + 2
    }));
  };

  return (
    <div className="min-h-screen bg-[#fbf7f2] text-[#3d2411] flex flex-col pb-16 lg:pb-0">
      {/* Top Header Navigation with Icon-Only Navbar & Milk Tea Palette */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userStats={userStats}
        userProfile={userProfile}
        currentLevel={currentLevel}
        setLevel={setCurrentLevel}
        onOpenBookmarks={() => setIsBookmarkOpen(true)}
        showGlobalPinyin={showGlobalPinyin}
        setShowGlobalPinyin={setShowGlobalPinyin}
        audioSpeed={audioSpeed}
        setAudioSpeed={setAudioSpeed}
        onInstallApp={handleInstallApp}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeTab
            currentLevel={currentLevel}
            onSelectTab={setActiveTab}
            onStartFlashcards={() => setIsFlashcardOpen(true)}
            userStats={userStats}
            userProfile={userProfile}
            completedUnits={completedUnits}
            onStartUnit={handleStartUnit}
          />
        )}

        {activeTab === 'vocab-grammar' && (
          <VocabGrammarTab
            currentLevel={currentLevel}
            onCompleteLesson={handleLessonComplete}
            onStartFlashcardMode={() => setIsFlashcardOpen(true)}
            globalShowPinyin={showGlobalPinyin}
            audioSpeed={audioSpeed}
            activeUnitSession={activeUnitSession}
            onProceedToReading={() => handleNextStepInSession('reading')}
          />
        )}

        {activeTab === 'reading' && (
          <ReadingTab
            currentLevel={currentLevel}
            onProceedToQuiz={() => setActiveTab('quiz')}
            onProceedToConversation={() => handleNextStepInSession('conversation')}
            globalShowPinyin={showGlobalPinyin}
            audioSpeed={audioSpeed}
            activeUnitSession={activeUnitSession}
          />
        )}

        {activeTab === 'conversation' && (
          <ConversationTab 
            globalShowPinyin={showGlobalPinyin}
            audioSpeed={audioSpeed}
            activeUnitSession={activeUnitSession}
            onCompleteLesson={handleCompleteUnitLesson}
            onRepeatLesson={handleRepeatUnitLesson}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizTab
            currentLevel={currentLevel}
            onCompleteQuiz={handleQuizComplete}
            globalShowPinyin={showGlobalPinyin}
            completedUnits={completedUnits}
            audioSpeed={audioSpeed}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab
            currentLevel={currentLevel}
            setLevel={setCurrentLevel}
            userStats={userStats}
            setUserStats={setUserStats}
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onStartFlashcards={() => setIsFlashcardOpen(true)}
            onOpenBookmarks={() => setIsBookmarkOpen(true)}
            onInstallApp={handleInstallApp}
          />
        )}
      </main>

      {/* Flashcard Modal (SRS) filtered by Level */}
      <FlashcardModal
        isOpen={isFlashcardOpen}
        onClose={() => setIsFlashcardOpen(false)}
        currentLevel={currentLevel}
      />

      {/* Bookmarks Drawer Modal */}
      <BookmarkDrawer
        isOpen={isBookmarkOpen}
        onClose={() => setIsBookmarkOpen(false)}
        currentLevel={currentLevel}
        onStartFlashcards={() => setIsFlashcardOpen(true)}
      />

      {/* Mobile Bottom Navigation with Icons */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Na Cha Brand Footer in Milk Tea Palette */}
      <footer className="mt-auto border-t border-[#ebdccb] bg-[#fffdfa]/95 py-6 text-xs text-[#8c6849]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-chinese font-black text-[#784e2a] text-sm">Na Cha 奶茶</span>
            <span>·</span>
            <span>Platform Belajar Mandarin Semudah &amp; Semanis Menikmati Milk Tea</span>
          </div>
          <p>© 2026 Na Cha. Dirancang dengan presisi untuk pembelajar Mandarin HSK 1 - 3.</p>
        </div>
      </footer>
    </div>
  );
}
