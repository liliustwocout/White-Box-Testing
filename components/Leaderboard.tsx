
import React, { useEffect, useState } from 'react';
import { Language, QuizResult, UserRole } from '../types';
import { database } from '../services/database';

interface LeaderboardProps {
  lang: Language;
  userRole?: UserRole;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ lang, userRole }) => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [confirmStage, setConfirmStage] = useState(0); // 0: Normal, 1: Confirming

  const loadResults = async () => {
    setLoading(true);
    try {
      const data = await database.getResults();
      const sorted = [...data].sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      setResults(sorted);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleResetClick = async () => {
    if (confirmStage === 0) {
      setConfirmStage(1);
      // Tự động quay về trạng thái cũ sau 3 giây nếu không bấm xác nhận
      setTimeout(() => setConfirmStage(0), 4000);
      return;
    }

    setIsResetting(true);
    try {
      await database.resetAll();
      setResults([]);
      setConfirmStage(0);
      alert(lang === 'ja' ? "リセットが完了しました" : "Đã làm sạch bảng điểm thành công!");
    } catch (err: any) {
      alert(lang === 'ja' 
        ? "エラーが発生しました。SQL EditorでDISABLE RLSを実行したか確認してください。" 
        : "Lỗi: " + err.message);
      setConfirmStage(0);
    } finally {
      setIsResetting(false);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn pb-12">
      <div className="text-center space-y-4">
        <div className="text-5xl mb-2 animate-bounce">🏅</div>
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">
          {lang === 'ja' ? "殿堂入り" : "Bảng Vàng Thành Tích"}
        </h2>
        <p className="text-gray-500 font-medium">
          {lang === 'ja' ? "トップスコアラーの皆さんを称えましょう！" : "Tôn vinh những cá nhân xuất sắc nhất!"}
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 transition-all">
        <div className="p-6 bg-gray-50/50 border-b flex justify-between items-center px-8">
          <div className="flex items-center space-x-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs font-black text-gray-500 uppercase tracking-widest">
              Live Global Database
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={loadResults}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-400"
              title="Reload"
            >
              <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            {userRole === 'admin' && (
              <div className="flex items-center">
                <button
                  onClick={handleResetClick}
                  disabled={isResetting || (results.length === 0 && confirmStage === 0)}
                  className={`text-xs font-black py-2 px-4 rounded-xl transition-all active:scale-95 flex items-center shadow-sm ${
                    confirmStage === 1 
                      ? 'bg-orange-500 text-white animate-pulse' 
                      : 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white'
                  } disabled:opacity-30`}
                >
                  {isResetting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-3 w-3 mr-2 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                      Deleting...
                    </span>
                  ) : confirmStage === 1 ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {lang === 'ja' ? "本当によろしいですか？" : "BẤM LẦN NỮA ĐỂ XÁC NHẬN"}
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {lang === 'ja' ? "全データを削除" : "XÓA TOÀN BỘ"}
                    </>
                  )}
                </button>
                {confirmStage === 1 && (
                  <button 
                    onClick={() => setConfirmStage(0)}
                    className="ml-2 p-2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="py-24 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto shadow-sm"></div>
              <p className="text-gray-400 font-black tracking-widest text-xs uppercase animate-pulse">
                Syncing with Cloud...
              </p>
            </div>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/30">
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Rank</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Name</th>
                  <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Perfect Score</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Submission Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {results.map((res, i) => (
                  <tr key={i} className={`${i === 0 ? 'bg-yellow-50/40' : i === 1 ? 'bg-gray-50/40' : i === 2 ? 'bg-orange-50/40' : ''} hover:bg-blue-50/50 transition-all group`}>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        {i === 0 ? <span className="text-3xl mr-2">🥇</span> : 
                         i === 1 ? <span className="text-3xl mr-2">🥈</span> :
                         i === 2 ? <span className="text-3xl mr-2">🥉</span> :
                         <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-black text-gray-400 mr-2 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">#{i + 1}</span>}
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <span className={`text-lg font-black ${i < 3 ? 'text-gray-900' : 'text-gray-700'}`}>
                        {res.name}
                      </span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-center">
                      <div className={`inline-flex items-center px-4 py-2 rounded-2xl font-black text-sm shadow-sm ${res.score >= 4 ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
                        <span className="mr-1.5">🎯</span>
                        {res.score} / 5
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-right">
                      <span className="text-xs font-bold text-gray-400 italic">
                        {res.date}
                      </span>
                    </td>
                  </tr>
                ))}

                {results.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-24 text-center">
                      <div className="space-y-4">
                        <div className="text-6xl opacity-20 grayscale animate-pulse">🏜️</div>
                        <p className="text-gray-400 font-black italic uppercase tracking-tighter">
                          {lang === 'ja' ? "まだ挑戦者がいません" : "Chưa có ai chinh phục thử thách"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
