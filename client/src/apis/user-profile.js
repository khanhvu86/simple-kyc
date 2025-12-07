import { USER_PROFILE_STATUS } from '../constant/user';
import HttpInstance from '../http';

export const getUserProfileByUserId = async (userId) => {
  return await HttpInstance.get(`/userProfiles?userId=${userId}`);
};

export const updateUserProfile = async (id, data) => {
  return await HttpInstance.put(`/userProfiles/${id}`, data);
};

export const getUnreviewedSubmissions = async () => {
  return await HttpInstance.get(
    `/userProfiles?status=${USER_PROFILE_STATUS.PENDING}`
  );
};

export const getReviewdSubmissions = async () => {
  return await HttpInstance.get(
    `/userProfiles?status=${USER_PROFILE_STATUS.APPROVED}&status=${USER_PROFILE_STATUS.REJECT}`
  );
};
