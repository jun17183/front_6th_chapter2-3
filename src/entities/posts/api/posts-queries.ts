import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from './posts-api';
import { postsKeys } from './posts-keys';
import { CreatePostData, FetchPostsParams, Post } from '../model/types';

// 게시물 목록 조회
export const useGetPosts = (params: FetchPostsParams) => {
  return useQuery({
    queryKey: postsKeys.list(params),
    queryFn: () => postApi.getPosts(params),
  });
};

// 태그 목록 조회
export const useGetTags = () => {
  return useQuery({
    queryKey: postsKeys.tags(),
    queryFn: postApi.getTags,
    staleTime: 1000 * 60 * 30, // 30분
  });
};

// 게시물 검색
export const useSearchPosts = (query: string, enabled = true) => {
  return useQuery({
    queryKey: postsKeys.search(query),
    queryFn: () => postApi.searchPosts(query),
    enabled: enabled && query.trim().length > 0,
    staleTime: 1000 * 60 * 2, // 2분
  });
};

// 태그별 게시물 조회
export const useGetPostsByTag = (tag: string, enabled = true) => {
  return useQuery({
    queryKey: postsKeys.byTag(tag),
    queryFn: () => postApi.getPostsByTag(tag),
    enabled: enabled && tag.trim().length > 0,
  });
};

// 게시물 생성
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData: CreatePostData) => postApi.create(postData),
    onSuccess: () => {
      // 모든 게시물 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
      // 태그 목록도 무효화 (새로운 태그가 추가될 수 있음)
      queryClient.invalidateQueries({ queryKey: postsKeys.tags() });
    },
  });
};

// 게시물 수정
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData: Post) =>
      postApi.update(postData),
    onSuccess: (updatedPost) => {
      // 해당 게시물의 상세 정보 업데이트
      queryClient.setQueryData(
        postsKeys.detail(updatedPost.id),
        updatedPost
      );
      // 모든 게시물 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
      // 검색 결과도 무효화
      queryClient.invalidateQueries({ queryKey: [...postsKeys.all, 'search'] });
      // 태그별 게시물도 무효화
      queryClient.invalidateQueries({ queryKey: [...postsKeys.all, 'tag'] });
      // 태그 목록도 무효화 (태그가 변경될 수 있음)
      queryClient.invalidateQueries({ queryKey: postsKeys.tags() });
    },
  });
};

// 게시물 삭제
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => postApi.delete(id),
    onSuccess: (_, deletedId) => {
      // 해당 게시물의 상세 정보 제거
      queryClient.removeQueries({ queryKey: postsKeys.detail(deletedId) });
      // 모든 게시물 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: [...postsKeys.all, 'search'] });
      queryClient.invalidateQueries({ queryKey: [...postsKeys.all, 'tag'] });
      // 태그 목록도 무효화 (삭제된 게시물의 태그가 마지막일 수 있음)
      queryClient.invalidateQueries({ queryKey: postsKeys.tags() });
    },
  });
};