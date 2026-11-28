import React from 'react';
import { 
  Home, 
  BookMarked, 
  BookOpen, 
  Award, 
  MessageSquare, 
  User 
} from 'lucide-react';
import { audioService } from '../services/speechService';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'vocab-grammar', label: 'Belajar', icon: BookMarked },
    { id: 'reading', label: 'Cerita', icon: BookOpen },
    { id: 'conversation', label: 'Dialog', icon: MessageSquare },
    { id: 'quiz', label: 'Kuis', icon: Award },
    { id: 'profile', label: 'Profil', icon: User }
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    audioService.playTapSound();
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fffdfa]/95 backdrop-blur border-t border-[#ebdccb] px-1 sm:px-3 pt-1 pb-[max(0.35rem,env(safe-area-inset-bottom,0px))] shadow-lg">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              aria-label={tab.label}
              className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all relative ${
                isActive ? 'text-[#784e2a]' : 'text-[#8c6849] hover:text-[#5c391d] active:scale-95'
              }`}
            >
              <div className={`p-1 sm:p-1.5 rounded-xl transition-all ${
                isActive ? 'bg-[#784e2a] text-white shadow-2xs scale-105' : ''
              }`}>
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className={`text-[8px] xs:text-[9px] mt-0.5 tracking-tight truncate w-full text-center ${
                isActive ? 'font-black text-[#5c391d]' : 'font-medium text-[#8c6849]'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
