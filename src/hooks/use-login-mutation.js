import { useMutation } from '@tanstack/react-query';
import { login } from '../apis/auth';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (params) => await login(params),
  });
};
