// 게시물 타입
export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
}

// 게시물 작성자 타입
export interface PostWithAuthor extends Post {
  author?: {
    id: number
    username: string
    image: string
  }
}

// 게시물 파라미터 타입
export interface FetchPostsParams {
  limit?: number
  skip?: number
}

// 게시물 목록 응답 타입
export interface PostListResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

// 게시물 추가 파라미터 타입
export interface CreatePostData {
  title: string
  body: string
  userId: number
  tags?: string[]
}