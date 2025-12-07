const AUTH_BASE = '/auth';

export const AUTH_URL = {
  BASE: AUTH_BASE,
  LOGIN: `${AUTH_BASE}/login`,
};

const ADMIN_BASE = '/admin';

export const ADMIN_URL = {
  BASE: ADMIN_BASE,
  DASHBOARD: `${ADMIN_BASE}/dashboard`,
  USER_PROFILE: `${ADMIN_BASE}/user-profiles`,
  KYC: `${ADMIN_BASE}/user-profiles/kyc`,
  SUBMISSIONS: `${ADMIN_BASE}/submissions`,
};
