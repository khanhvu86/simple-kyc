import { useMutation } from '@tanstack/react-query';
import { updatePersonalInformation } from '../apis/personal-information';

export const useUpdatePersonalInformationMutation = () => {
  return useMutation({
    mutationFn: async (params) => await updatePersonalInformation(params),
  });
};
