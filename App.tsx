
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { TRANSLATIONS } from './constants';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LearningContent from './components/LearningContent';
import Comparison from './components/Comparison';
import Glossary from './components/Glossary';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ja');
  const [activeTab, setActiveTab] = useState<string>('home');

  const t = TRANSLATIONS[lang];

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home lang={lang} onStart={() => setActiveTab('learn')} />;
      case 'learn': return <LearningContent lang={lang} />;
      case 'compare': return <Comparison lang={lang} />;
      case 'glossary': return <Glossary lang={lang} />;
      case 'quiz': return <Quiz lang={lang} onComplete={() => setActiveTab('leaderboard')} />;
      case 'leaderboard': return <Leaderboard lang={lang} />;
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
      />
      <main className="flex-grow pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {renderContent()}
      </main>
      <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
        <p>© 2026 Group 1 - White Box Testing</p>
      </footer>
    </div>
  );
};

export default App;
