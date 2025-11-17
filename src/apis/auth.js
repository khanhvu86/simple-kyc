import HttpInstance from '../http';

export const login = async (params) => {
  return await HttpInstance.post('auth/login', params);
};
