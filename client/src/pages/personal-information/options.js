import {
  ADDRESS_TYPES,
  DOCUMENT_TYPES,
  EMAIL_TYPES,
  PHONE_TYPES,
} from './constant';

export const addressTypes = [
  {
    key: 'mailing',
    text: 'Mailing',
    value: ADDRESS_TYPES.MAILING,
  },
  {
    key: 'work',
    text: 'Work',
    value: ADDRESS_TYPES.WORK,
  },
];

export const emailTypes = [
  {
    key: 'personal',
    text: 'Personal',
    value: EMAIL_TYPES.PERSONAL,
  },
  {
    key: 'work',
    text: 'Work',
    value: EMAIL_TYPES.WORK,
  },
];

export const emailPreferred = [
  {
    key: 'yes',
    text: 'Yes',
    value: true,
  },
  {
    key: 'no',
    text: 'No',
    value: false,
  },
];

export const phoneTypes = [
  {
    key: 'personal',
    text: 'Personal',
    value: PHONE_TYPES.PERSONAL,
  },
  {
    key: 'work',
    text: 'Work',
    value: PHONE_TYPES.WORK,
  },
];

export const phonePreferred = [
  {
    key: 'yes',
    text: 'Yes',
    value: true,
  },
  {
    key: 'no',
    text: 'No',
    value: false,
  },
];

export const documentTypes = [
  {
    key: 'nationalIdCard',
    text: 'National ID Card',
    value: DOCUMENT_TYPES.NATIONAL_ID_CARD,
  },
  {
    key: 'passport',
    text: 'Passport',
    valie: DOCUMENT_TYPES.PASSPORT,
  },
  {
    key: 'driverLicense',
    text: "Driver's license",
    value: DOCUMENT_TYPES.DRIVERLICENSE,
  },
];
