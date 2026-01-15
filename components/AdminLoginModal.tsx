
import React, { useState } from 'react';
import { Language } from '../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => void;
  lang: Language;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLogin, lang }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLogin(password);
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-bounceIn">
        <div className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl">
            🔒
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {lang === 'ja' ? "管理者ログイン" : "Đăng nhập Admin"}
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              {lang === 'ja' ? "パスワードを入力してください" : "Vui lòng nhập mật khẩu quản trị"}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition-all text-center text-lg`}
              placeholder="••••••••"
            />
            {error && (
              <p className="text-xs text-red-500 font-medium">
                {lang === 'ja' ? "パスワードが正しくありません" : "Mật khẩu không chính xác"}
              </p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all"
              >
                {lang === 'ja' ? "キャンセル" : "Hủy"}
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
              >
                {lang === 'ja' ? "ログイン" : "Xác nhận"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
