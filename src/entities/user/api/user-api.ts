const BASE_URL = '/api/users';

export const userApi = {
  // 모든 사용자 (username, image만)
  getUsers: async () => {
    const response = await fetch(`${BASE_URL}?limit=0&select=username,image`);
    if (!response.ok) throw new Error('모든 사용자 정보보 가져오기 오류: ' + response.statusText);
    return response.json();
  },

  // 특정 사용자
  getUserById: async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('사용자 정보 가져오기 오류: ' + response.statusText);
    return response.json();
  }
}