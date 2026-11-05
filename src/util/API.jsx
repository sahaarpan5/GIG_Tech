const BASE_URL = 'https://gsppi.geniusconsultant.com/GSPPI_API_V2/api/';

const BASE_URL_V2 = 'https://rms.geniushrtech.com/RMSAPI/api/';

const API = {
  GIG_LOGIN: `${BASE_URL}/GigLogin/GigUserLogin`,

  POST_ATTENDANCE: `${BASE_URL}/GigAttendance/PostGigEmpAttendance`,

  GET_ATTENDANCE: `${BASE_URL}/GigAttendance/ShowGigEmpAttendance`,


  OTP_GENERATE: `${BASE_URL_V2}/auth/OTPGenerate`,

  GIG_OTP_LOGIN: `${BASE_URL_V2}/auth/GigLogin`,

  CONSENT: `${BASE_URL_V2}/Gig/Consent`,
  GIG_VIEW: `${BASE_URL_V2}/Gig/View`,

  GIG_WORKER_ACTIVITY_SAVE: `${BASE_URL_V2}/Gig/WorkerActivitySave`,

   WORKER_DETAILS: `${BASE_URL_V2}/Gig/WorkerDetails`,

};

// Add more endpoints here as needed


export default API;