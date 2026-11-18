import React from 'react';
import { 
  Home, 
  BookMarked, 
  Headphones, 
  Award, 
  MessageSquare,
  User
} from 'lucide-react';
import { audioService } from '../services/speechService';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'vocab-grammar', label: 'Belajar', icon: BookMarked },
    { id: 'reading', label: 'Membaca', icon: Headphones },
    { id: 'conversation', label: 'Dialog', icon: MessageSquare },
    { id: 'quiz', label: 'Kuis', icon: Award },
    { id: 'profile', label: 'Profil', icon: User }
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    audioService.playTapSound();
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fffdfa]/95 backdrop-blur border-t border-[#ebdccb] px-3 py-1.5 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              aria-label={tab.label}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all relative ${
                isActive ? 'text-[#784e2a]' : 'text-[#8c6849] hover:text-[#5c391d]'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${
                isActive ? 'bg-[#784e2a] text-white shadow-xs' : ''
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className={`text-[9px] mt-0.5 tracking-tight ${
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
