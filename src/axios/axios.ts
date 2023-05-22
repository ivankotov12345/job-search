import axios from 'axios'

export enum AxiosPaths {
  auth = '/2.0/oauth2/password',
  refresh = '/2.0/oauth2/refresh_token/',
  vacancies = '/2.0/vacancies/',
  catalogues = '/2.0/catalogues/',
};

export enum AxiosAuthData {
  login = 'sergei.stralenia@gmail.com',
  password = 'paralect123',
  client_id = '2356',
  client_secret = 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
  hr = '0',
}

export const instance = axios.create({
  baseURL: 'https://startup-summer-proxy-production.up.railway.app/',
  headers: {
    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
  }
});


instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  const tokenData = token !== null ? JSON.parse(token) : {};
  if(!tokenData.access_token) {
    return config
  } 
  else {
    config.headers.Authorization =`Bearer ${tokenData.access_token}`
    return config
  }
});