const BASE_URL = '/api/comments';

export const commentApi = {
  // 댓글 가져오기
  getByPostId: async (postId: number) => {
    const response = await fetch(`${BASE_URL}/post/${postId}`);
    if (!response.ok) throw new Error('댓글 가져오기 오류: ' + response.statusText);
    return response.json();
  },

  // 댓글 생성
  create: async (commentData: Comment) => {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) throw new Error('댓글 추가 오류: ' + response.statusText);
    return response.json();
  },

  // 댓글 수정
  update: async (id: number, body: string) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body }),
    });
    if (!response.ok) throw new Error('댓글 업데이트 오류: ' + response.statusText);
    return response.json();
  },

  // 댓글 삭제
  delete: async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('댓글 삭제 오류: ' + response.statusText);
  },

  // 댓글 좋아요
  like: async (id: number, currentLikes: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: currentLikes + 1 }),
    });
    if (!response.ok) throw new Error('댓글 좋아요 오류: ' + response.statusText);
    return response.json();
  }
}