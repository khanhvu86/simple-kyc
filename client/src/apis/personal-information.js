import HttpInstance from '../http';

export const getPersonalInformation = async (id) => {
  return await HttpInstance.get(
    `/personalInformation/${id}?_embed=addresses&_embed=emails&_embed=phones&_embed=documents&_embed=occupations`
  );
};

export const updatePersonalInformation = async (data) => {
  return await HttpInstance.put('/personalInformation', data);
};

export const updateAddress = async (data) => {
  return await HttpInstance.put(
    `/addresses?personalInformation=${data.personalInformationId}`,
    data
  );
};

export const updateEmail = async (data) => {
  return await HttpInstance.put(
    `/emails?personalInformation=${data.personalInformationId}`,
    data
  );
};

export const updatePhone = async (data) => {
  return await HttpInstance.put(
    `/phones?personalInformation=${data.personalInformationId}`,
    data
  );
};

export const updateDocument = async (data) => {
  return await HttpInstance.put(
    `/documents?personalInformation=${data.personalInformationId}`,
    data
  );
};

export const updateOccupation = async (data) => {
  return await HttpInstance.put(
    `/occupations?personalInformation=${data.personalInformationId}`,
    data
  );
};
