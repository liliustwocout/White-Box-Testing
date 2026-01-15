
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, activeTab, setActiveTab }) => {
  const t = TRANSLATIONS[lang];

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'learn', label: t.navLearn },
    { id: 'compare', label: t.navCompare },
    { id: 'glossary', label: t.navGlossary },
    { id: 'quiz', label: t.navQuiz },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => setActiveTab('home')}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">
                W
              </div>
              <span className="font-bold text-xl text-gray-900 hidden md:block">WhiteBox.edu</span>
            </div>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    activeTab === item.id 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 p-1 rounded-md">
              <button
                onClick={() => setLang('ja')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  lang === 'ja' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                日本語
              </button>
              <button
                onClick={() => setLang('vi')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  lang === 'vi' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Tiếng Việt
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="md:hidden flex overflow-x-auto border-t bg-white scrollbar-hide py-2 px-4 space-x-4">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-3 py-1 text-xs font-medium rounded-full ${
              activeTab === item.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
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
