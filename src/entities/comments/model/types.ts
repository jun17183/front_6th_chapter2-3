export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
}

export interface CreateCommentData {
  body: string
  postId: number
  userId: number
}

export interface UpdateCommentData {
  id: number
}