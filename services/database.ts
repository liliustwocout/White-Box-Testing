
import { QuizResult } from '../types';

// =========================================================================
// THÔNG TIN KẾT NỐI SUPABASE
// =========================================================================
const SUPABASE_URL: string = 'https://jxvqielgzzdkhrlehwrv.supabase.co'; 
const SUPABASE_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4dnFpZWxnenpka2hybGVod3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0OTI1NTcsImV4cCI6MjA4NDA2ODU1N30.g5sLIKrj2lin5JXY06jLFFg3mJsBnjKW7mXt2rXqLsI'; 
const TABLE_NAME = 'leaderboard';

export const database = {
  async getResults(): Promise<QuizResult[]> {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=*&order=score.desc,date.desc`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      if (!response.ok) throw new Error('Không thể lấy dữ liệu từ server');
      return await response.json();
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
      return [];
    }
  },

  async saveResult(result: QuizResult): Promise<void> {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(result)
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Lỗi khi lưu điểm');
      }
    } catch (error) {
      console.error("Lỗi lưu điểm:", error);
    }
  },

  async resetAll(): Promise<void> {
    try {
      // name=neq. (nghĩa là name không bằng rỗng) sẽ chọn tất cả các dòng
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?name=neq.`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi hệ thống khi xóa.");
      }
    } catch (error: any) {
      console.error("Lỗi xóa toàn bộ:", error);
      throw error;
    }
  }
};
