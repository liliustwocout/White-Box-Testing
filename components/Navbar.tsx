
import React from 'react';
import { Language, UserRole } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenAdminModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  lang, setLang, activeTab, setActiveTab, userRole, setUserRole, onOpenAdminModal 
}) => {
  const t = TRANSLATIONS[lang];

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'learn', label: t.navLearn },
    { id: 'compare', label: t.navCompare },
    { id: 'glossary', label: t.navGlossary },
    { id: 'quiz', label: t.navQuiz },
    { id: 'leaderboard', label: t.leaderboard },
  ];

  const handleAdminClick = () => {
    if (userRole === 'admin') {
      // Bỏ confirm để tránh lỗi sandbox
      setUserRole('user');
    } else {
      onOpenAdminModal();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer group"
              onClick={() => setActiveTab('home')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center text-white font-bold text-xl mr-3 shadow-lg group-hover:scale-110 transition-transform">
                W
              </div>
              <span className="font-bold text-xl text-gray-900 hidden md:block tracking-tight">WhiteBox.edu</span>
            </div>
            <div className="hidden lg:ml-8 lg:flex lg:space-x-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={handleAdminClick}
              className={`p-2.5 rounded-xl transition-all ${
                userRole === 'admin' 
                ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
              title="Admin Access"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>

            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setLang('ja')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lang === 'ja' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                JA
              </button>
              <button
                onClick={() => setLang('vi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lang === 'vi' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                VI
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="lg:hidden flex overflow-x-auto border-t bg-white scrollbar-hide py-2 px-4 space-x-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === item.id ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-500'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
