
import React, { useEffect, useState } from 'react';
import { Language, QuizResult } from '../types';

interface LeaderboardProps {
  lang: Language;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ lang }) => {
  const [results, setResults] = useState<QuizResult[]>([]);

  const loadResults = () => {
    const data: QuizResult[] = JSON.parse(localStorage.getItem('whitebox_results') || '[]');
    const sorted = data.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setResults(sorted);
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <div className="text-4xl mb-4">🏆</div>
        <h2 className="text-3xl font-bold text-gray-900">
          {lang === 'ja' ? "ランキング" : "Bảng xếp hạng"}
        </h2>
        <p className="text-gray-500">
          {lang === 'ja' ? "トップスコアラーの皆さんです！" : "Chúc mừng các bạn có điểm số cao nhất!"}
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Rank</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Name</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Score</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((res, i) => (
              <tr key={i} className={`${i < 3 ? 'bg-blue-50/30' : ''} hover:bg-gray-50 transition-colors`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {i === 0 && <span className="text-2xl mr-2">🥇</span>}
                    {i === 1 && <span className="text-2xl mr-2">🥈</span>}
                    {i === 2 && <span className="text-2xl mr-2">🥉</span>}
                    <span className={`font-bold ${i < 3 ? 'text-blue-700' : 'text-gray-500'}`}>
                      #{i + 1}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {res.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                    {res.score} / 5
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-xs text-gray-400">
                  {res.date}
                </td>
              </tr>
            ))}

            {results.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                  {lang === 'ja' ? "データがまだありません。" : "Chưa có dữ liệu."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
        <div className="flex items-start space-x-4">
          <span className="text-2xl">🎁</span>
          <div>
            <h4 className="font-bold text-yellow-800">
              {lang === 'ja' ? "小さなプレゼントがあります！" : "Phần quà nhỏ từ chúng mình!"}
            </h4>
            <p className="text-sm text-yellow-700">
              {lang === 'ja' 
                ? "いちばん点数が高い人には、私たちからプレゼントを差し上げます。" 
                : "Bạn nào có điểm số cao nhất sẽ nhận được một món quà nhỏ từ nhóm chúng mình!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
