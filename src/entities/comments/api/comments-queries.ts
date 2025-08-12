import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi } from './comments-api';
import { commentsKeys } from './comments-keys';
import { CreateCommentData } from '../model/types';

// 특정 게시물의 댓글 목록 조회
export const useGetCommentsByPost = (postId: number, enabled = true) => {
  return useQuery({
    queryKey: commentsKeys.byPost(postId),
    queryFn: () => commentsApi.getByPostId(postId),
    enabled: enabled && postId > 0,
  });
};

// 댓글 추가
export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentData: CreateCommentData) => {
      commentData.userId = 1;
      return commentsApi.create(commentData);
    },
    onSuccess: (newComment) => {
      // 해당 게시물의 댓글 목록 무효화
      queryClient.invalidateQueries({ 
        queryKey: commentsKeys.byPost(newComment.postId) 
      });
    },
  });
};

// 댓글 수정
export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) =>
      commentsApi.update(id, body),
    onSuccess: (updatedComment) => {
      // 해당 댓글의 상세 정보 업데이트
      queryClient.setQueryData(
        commentsKeys.detail(updatedComment.id),
        updatedComment
      );
      // 해당 게시물의 댓글 목록 무효화
      queryClient.invalidateQueries({ 
        queryKey: commentsKeys.byPost(updatedComment.postId) 
      });
    },
  });
};

// 댓글 삭제
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => commentsApi.delete(id),
    onSuccess: (_, deletedId) => {
      // 해당 댓글의 상세 정보 제거
      queryClient.removeQueries({ queryKey: commentsKeys.detail(deletedId) });
      // 모든 댓글 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: [...commentsKeys.all, 'post'] });
    },
  });
};

// 댓글 좋아요/취소
export const useLikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, currentLikes }: { commentId: number, currentLikes: number }) => commentsApi.like(commentId, currentLikes),
    onSuccess: (updatedComment) => {
      // 해당 댓글의 상세 정보 업데이트
      queryClient.setQueryData(
        commentsKeys.detail(updatedComment.id),
        updatedComment
      );
      // 해당 게시물의 댓글 목록 무효화
      queryClient.invalidateQueries({ 
        queryKey: commentsKeys.byPost(updatedComment.postId) 
      });
    },
  });
};