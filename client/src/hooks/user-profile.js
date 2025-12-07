import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getReviewdSubmissions,
  getUnreviewedSubmissions,
  getUserProfileByUserId,
  updateUserProfile,
} from '../apis/user-profile';
import { toast } from 'react-toastify';

export const useUserProfileByUserIdQuery = (userId) => {
  return useQuery({
    queryKey: ['userProfileByUserId', userId],
    queryFn: async () => await getUserProfileByUserId(userId),
  });
};

export const useUpdateUserProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => await updateUserProfile(id, data),
    onSuccess: () => {
      toast.success('Your changes have been saved!');
      queryClient.invalidateQueries(['userProfile']);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUnreviewedSubmissionsQuery = () => {
  return useQuery({
    queryKey: ['unreviewedSubmissions'],
    queryFn: async () => await getUnreviewedSubmissions(),
  });
};

export const useReviewedSubmissionsQuery = () => {
  return useQuery({
    queryKey: ['reviewedSubmissions'],
    queryFn: async () => await getReviewdSubmissions(),
  });
};
