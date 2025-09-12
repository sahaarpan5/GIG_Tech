const BASE_URL = 'http://171.16.2.105/GSPPI_API_V2/api';

const API = {
  GIG_LOGIN: `${BASE_URL}/GigLogin/GigUserLogin`,

  POST_ATTENDANCE: `${BASE_URL}/GigAttendance/PostGigEmpAttendance`,

  GET_ATTENDANCE: `${BASE_URL}/GigAttendance/ShowGigEmpAttendance`,


};

// Add more endpoints here as needed


export default API;