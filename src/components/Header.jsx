import React, { useState } from 'react';
import { 
  Flame, 
  Zap, 
  BookOpen, 
  ChevronDown, 
  Menu, 
  X, 
  Home, 
  BookMarked, 
  Headphones, 
  Award, 
  MessageSquare,
  Bookmark,
  Check,
  Settings,
  User,
  Download
} from 'lucide-react';
import { HSK_LEVELS_META, USER_PROFILE } from '../data/learningData';
import Mascot from './Mascot';
import { audioService } from '../services/speechService';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  userStats, 
  userProfile = USER_PROFILE,
  currentLevel = "HSK 1", 
  setLevel,
  onOpenBookmarks,
  showGlobalPinyin = true,
  setShowGlobalPinyin,
  audioSpeed = 1.0,
  setAudioSpeed,
  onInstallApp,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);

  const levels = ["HSK 1", "HSK 2", "HSK 3"];

  // Core Learning Navigation Items ONLY (Removed redundant Profile user icon)
  const navItems = [
    { id: 'home', label: 'Beranda & Peta Belajar', icon: Home },
    { id: 'vocab-grammar', label: 'Kosakata & Tata Bahasa', icon: BookMarked },
    { id: 'reading', label: 'Cerita', icon: BookOpen },
    { id: 'conversation', label: 'Percakapan Harian', icon: MessageSquare },
    { id: 'quiz', label: 'Kuis & Evaluasi', icon: Award }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    audioService.playTapSound();
  };

  const handleLevelSelect = (lvl) => {
    if (setLevel) setLevel(lvl);
    setLevelDropdownOpen(false);
    audioService.playSuccessSound();
  };

  const activeMeta = HSK_LEVELS_META[currentLevel] || HSK_LEVELS_META["HSK 1"];

  return (
    <header className="sticky top-0 z-40 bg-[#fffdfa]/95 backdrop-blur border-b border-[#ebdccb] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            {/* Brand Logo with Milk Tea Mascot */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2 sm:space-x-2.5 cursor-pointer group shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#f5ece1] to-[#ead7c4] border border-[#dcc1a4] flex items-center justify-center p-0.5 sm:p-1 shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                <Mascot size={28} mood="happy" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-1">
                  <span className="text-lg sm:text-xl font-black text-[#3d2411] tracking-tight whitespace-nowrap">
                    Na Cha <span className="font-chinese text-sm sm:text-base font-bold text-[#94663b]">奶茶</span>
                  </span>
                </div>
                <span className="text-[8px] sm:text-[9px] font-bold text-[#8c6849] tracking-wider -mt-1 hidden md:block">
                  MANDARIN LEARNING
                </span>
              </div>
            </div>
          </div>

          {/* DESKTOP NAVIGATION: ICON-ONLY NAVBAR (Streamlined to 5 core features) */}
          <nav className="hidden lg:flex items-center bg-[#f5ece1]/70 p-1.5 rounded-2xl border border-[#ebdccb] space-x-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isHovered = hoveredTab === item.id;

              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => setHoveredTab(item.id)}
                    onMouseLeave={() => setHoveredTab(null)}
                    aria-label={item.label}
                    className={`w-11 h-10 rounded-xl transition-all duration-150 flex items-center justify-center relative ${
                      isActive
                        ? 'bg-[#784e2a] text-white shadow-xs scale-105'
                        : 'text-[#784e2a] hover:text-[#3d2411] hover:bg-[#ead7c4]/60'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                    
                    {/* Small active dot indicator */}
                    {isActive && (
                      <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#fcd34d]"></span>
                    )}
                  </button>

                  {/* Sleek Floating Hover Tooltip */}
                  {isHovered && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none tooltip-animate">
                      <div className="bg-[#3d2411] text-[#fffdfa] text-[11px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-md flex items-center space-x-1 border border-[#5c391d]">
                        <span>{item.label}</span>
                      </div>
                      <div className="w-2 h-2 bg-[#3d2411] rotate-45 mx-auto -mt-1 border-t border-l border-[#5c391d]"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User Stats, Bookmark Quick Button, and Profile Avatar */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            {/* Quick Bookmark Drawer Button */}
            <button
              onClick={onOpenBookmarks}
              className="p-1.5 sm:p-2 rounded-xl text-[#8c6849] hover:text-[#784e2a] hover:bg-[#f5ece1] transition relative"
              title="Kosakata Tersimpan (Bookmark)"
            >
              <Bookmark className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#b45309]"></span>
            </button>

            {/* Streak */}
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-[#faf6f0] border border-[#ebdccb] text-[#94663b] text-xs font-bold shrink-0" title="Streak Belajar">
              <Flame className="w-3.5 h-3.5 text-[#b45309] fill-[#b45309]" />
              <span>{userStats.streakDays}</span>
              <span className="hidden sm:inline text-[#8c6849] font-normal">Hari</span>
            </div>

            {/* XP */}
            <div className="hidden xs:flex items-center space-x-1 px-2 py-1 rounded-full bg-[#fef3c7]/60 border border-[#fde68a] text-[#78350f] text-xs font-bold shrink-0" title="Total XP">
              <Zap className="w-3.5 h-3.5 text-[#d97706] fill-[#d97706]" />
              <span>{userStats.xp.toLocaleString()}</span>
              <span className="hidden sm:inline text-[#92400e] font-normal">XP</span>
            </div>

            {/* USER PROFILE AVATAR MENU (The single, clear access point to profile) */}
            <div className="relative pl-1 sm:pl-2 border-l border-[#ebdccb] shrink-0">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-1.5 p-0.5 sm:p-1 rounded-2xl hover:bg-[#f5ece1] transition group"
                title="Buka Pengaturan Akun & Level"
              >
                <img
                  src={userProfile?.avatar || USER_PROFILE.avatar}
                  alt={userProfile?.name || USER_PROFILE.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-[#dcc1a4] group-hover:ring-[#784e2a] transition shrink-0"
                />
                <span className="hidden md:block text-xs font-bold text-[#3d2411]">
                  {userProfile?.name || USER_PROFILE.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8c6849] hidden md:block" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#fffdfa] rounded-2xl shadow-xl border border-[#ebdccb] py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-[#f5ece1]">
                    <span className="text-xs font-bold text-[#3d2411] block">{userProfile?.name || USER_PROFILE.name}</span>
                    <span className="text-[10px] text-[#8c6849] block">Level Aktif: {currentLevel}</span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleNavClick('profile')}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-[#5c391d] hover:bg-[#f5ece1] flex items-center space-x-2 transition"
                    >
                      <User className="w-4 h-4 text-[#784e2a]" />
                      <span>Halaman Profil &amp; Level</span>
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        if (onOpenBookmarks) onOpenBookmarks();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-[#5c391d] hover:bg-[#f5ece1] flex items-center space-x-2 transition"
                    >
                      <Bookmark className="w-4 h-4 text-[#b45309]" />
                      <span>Kosakata Tersimpan</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-[#784e2a] hover:text-[#3d2411] rounded-xl hover:bg-[#f5ece1] shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#ebdccb] bg-[#fffdfa] px-4 pt-2 pb-4 space-y-2.5 shadow-xl animate-fadeIn">
          {/* Quick HSK Selector for Mobile */}
          <div className="space-y-1.5 pb-2 border-b border-[#f5ece1]">
            <div className="flex items-center justify-between text-xs text-[#8c6849]">
              <span>Pilih Tingkat Level HSK:</span>
              <span className="font-bold px-2 py-0.5 rounded-lg bg-[#f5ece1] text-[#5c391d] border border-[#dcc1a4]">
                Aktif: {activeMeta.name}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleLevelSelect(lvl)}
                  className={`py-1.5 text-xs font-bold rounded-xl border text-center transition ${
                    currentLevel === lvl
                      ? 'bg-[#784e2a] text-white border-[#784e2a] shadow-2xs'
                      : 'bg-[#faf6f0] text-[#784e2a] border-[#ebdccb]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Learning Toggles on Mobile */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#f5ece1]">
            {setShowGlobalPinyin && (
              <button
                onClick={() => {
                  setShowGlobalPinyin(!showGlobalPinyin);
                  audioService.playTapSound();
                }}
                className={`flex items-center justify-center space-x-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition border ${
                  showGlobalPinyin
                    ? 'bg-[#f5ece1] text-[#5c391d] border-[#dcc1a4]'
                    : 'bg-[#faf6f0] text-[#8c6849] border-[#ebdccb]'
                }`}
              >
                <span className="font-chinese font-bold">文A</span>
                <span>Pinyin: {showGlobalPinyin ? 'ON' : 'OFF'}</span>
              </button>
            )}
            {setAudioSpeed && (
              <button
                onClick={() => {
                  const nextSpeed = audioSpeed === 0.75 ? 1.0 : 0.75;
                  setAudioSpeed(nextSpeed);
                  audioService.setDefaultRate(nextSpeed);
                  audioService.playTapSound();
                }}
                className="flex items-center justify-center space-x-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition border bg-[#faf6f0] text-[#784e2a] border-[#ebdccb]"
              >
                <span>Audio: {audioSpeed === 0.75 ? '🐢 0.75x' : '⚡ 1.0x'}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-1.5 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-[#784e2a] text-white shadow-2xs'
                      : 'text-[#5c391d] bg-[#faf6f0] hover:bg-[#f5ece1]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#784e2a]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            <button
              onClick={() => handleNavClick('profile')}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#784e2a] text-white'
                  : 'text-[#5c391d] bg-[#faf6f0] hover:bg-[#f5ece1]'
              }`}
            >
              <User className="w-4 h-4 shrink-0 text-[#784e2a]" />
              <span>Profil Pengguna &amp; Target Belajar</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
