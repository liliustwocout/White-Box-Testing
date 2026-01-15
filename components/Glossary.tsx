
import React, { useState } from 'react';
import { Language } from '../types';
import { GLOSSARY } from '../constants';

interface GlossaryProps {
  lang: Language;
}

const Glossary: React.FC<GlossaryProps> = ({ lang }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = GLOSSARY.filter(item => 
    item.ja.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.vi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          {lang === 'ja' ? "IT用語集" : "Từ điển thuật ngữ IT"}
        </h2>
        <p className="text-gray-600">
          {lang === 'ja' ? "発表で使われた専門用語の解説です。" : "Giải thích các thuật ngữ chuyên môn được sử dụng trong bài trình bày."}
        </p>
      </div>

      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          placeholder={lang === 'ja' ? "キーワードで検索..." : "Tìm kiếm theo từ khóa..."}
          className="w-full px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute right-4 top-3.5 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
      </div>

      <div className="grid gap-6">
        {filtered.map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl font-bold text-blue-600">{item.ja}</span>
                <span className="text-gray-400 hidden md:inline">|</span>
                <span className="text-xl font-medium text-gray-800">{item.vi}</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
              <div className="space-y-1">
                <span className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">Japanese Explanation</span>
                <p className="text-gray-700">{item.descJa}</p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-gray-400 uppercase text-[10px] tracking-wider">Vietnamese Explanation</span>
                <p className="text-gray-700">{item.descVi}</p>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {lang === 'ja' ? "見つかりませんでした。" : "Không tìm thấy thuật ngữ nào."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Glossary;
