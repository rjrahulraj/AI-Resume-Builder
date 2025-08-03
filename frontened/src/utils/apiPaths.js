export const API_PATHS = {
  AUTH: {
    REGISTER: `/api/auth/register`,
    LOGIN: `/api/auth/login`,
  },
  RESUME: {
    CREATE: `/api/resume/`,
    GET_ALL: `/api/resume/`,
    GET_BY_ID: (id) => `/api/resume/${id}`,
    UPDATE: (id) => `/api/resume/${id}`,
    DELETE: (id) => `/api/resume/${id}`,
  },
  IMAGE: {
    UPLOAD_IMAGE: `/api/auth/upload-images`,
  },
  USER: {
    details: `/api/user-details`,
  },
};
