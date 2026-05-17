import { apiClient } from './axios.config';
import { ApiResponse } from '../types/api.types';
import { User, LoginPayload, RegisterPayload } from '../types/user.types';

interface AuthResponse {
  token: string;
  user: User;
}

export const authApi = {
  register: (data: RegisterPayload) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data),

  login: (data: LoginPayload) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data),

  getProfile: () =>
    apiClient.get<ApiResponse<User>>('/auth/profile'),
};
