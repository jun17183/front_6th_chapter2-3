import { FetchPostsParams, Post } from '../../../../entities/posts';
import { postsApi } from '../../../../entities/posts/api/posts-api';
import { userApi } from '../../../../entities/user/api/user-api';
import { User } from '../../../../entities/user/model/types';

export const getPostsWithUsers = async (params: FetchPostsParams) => {
  const [postsData, usersData] = await Promise.all([
    postsApi.getPosts(params),
    userApi.getUsers(),
  ]);

  const postsWithUsers = postsData.posts.map((post: Post) => ({
    ...post,
    author: usersData.users.find((user: User) => user.id === post.userId),
  }));

  return {
    ...postsData,
    posts: postsWithUsers,
  };
};