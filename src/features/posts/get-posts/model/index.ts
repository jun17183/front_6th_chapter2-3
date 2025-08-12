import { useQuery } from '@tanstack/react-query';
import { getPostsWithUsers } from '../api';
import { FetchPostsParams } from '../../../../entities/posts';
import { postsKeys } from '../../../../entities/posts/api/posts-keys';

export const useGetPosts = (params: FetchPostsParams) => {
  return useQuery({
    queryKey: postsKeys.list(params),
    queryFn: () => getPostsWithUsers(params),
  });
};