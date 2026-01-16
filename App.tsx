
import React, { useState } from 'react';
import { Language, UserRole } from './types';
import { TRANSLATIONS } from './constants';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LearningContent from './components/LearningContent';
import Comparison from './components/Comparison';
import Glossary from './components/Glossary';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';
import AdminLoginModal from './components/AdminLoginModal';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ja');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleAdminLogin = (password: string) => {
    if (password === 'admin123') {
      setUserRole('admin');
      setIsAdminModalOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home lang={lang} onStart={() => setActiveTab('learn')} />;
      case 'learn': return <LearningContent lang={lang} />;
      case 'compare': return <Comparison lang={lang} />;
      case 'glossary': return <Glossary lang={lang} />;
      case 'quiz': return <Quiz lang={lang} onComplete={() => setActiveTab('leaderboard')} />;
      case 'leaderboard': return <Leaderboard lang={lang} userRole={userRole} />;
      default: return <Home lang={lang} onStart={() => setActiveTab('learn')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />
      
      <AdminLoginModal 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLogin={handleAdminLogin}
        lang={lang}
      />

      <main className="flex-grow pt-32 md:pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-4 flex justify-end">
          {userRole === 'admin' && (
            <div className="flex items-center space-x-2 bg-red-50 text-red-700 text-xs font-bold px-4 py-2 rounded-full border border-red-100 shadow-sm animate-fadeIn">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span>ADMIN MODE</span>
            </div>
          )}
        </div>
        {renderContent()}
      </main>
      
      <footer className="bg-white border-t py-6 text-center text-gray-500 text-xs md:text-sm">
        <p>© 2026 Group 1 - White Box Testing (網羅テスト学習サイト)</p>
      </footer>
    </div>
  );
};

export default App;
