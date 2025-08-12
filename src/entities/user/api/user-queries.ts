import { useQuery } from '@tanstack/react-query';
import { userApi } from './user-api';
import { userKeys } from './user-keys';

// 모든 사용자 목록 조회 (username, image만)
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: userApi.getUsers,
  });
};

// 특정 사용자 상세 정보 조회
export const useUser = (id: number, enabled = true) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getUserById(id),
    enabled: enabled && !!id,
  });
};