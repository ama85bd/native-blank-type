import axios, { AxiosResponse, AxiosError } from 'axios';
import showToast from '../utils/Toast';
import { IResponseBase } from '../models/baseModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;
console.log('process.env.EXPO_PUBLIC_API_URL', process.env.EXPO_PUBLIC_API_URL);
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(async (config) => {
  const token: any = await AsyncStorage.getItem('tokenLGED')?.then((e: any) =>
    e.slice(1, -1)
  );
  // console.log('user', user);
  // const token = store.getState().login.loginCredential?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  const companyId = await AsyncStorage.getItem('companyId')?.then((e: any) =>
    e.slice(1, -1)
  );
  if (companyId) config.headers['x-lged-company-id'] = companyId;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    // await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status }: any = error.response!;
    switch (status) {
      case 400:
        showToast('error', data.title);
        break;
      case 401:
        showToast('error', data.title);
        break;
      case 500:
        showToast('error', data.title);
        break;

      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

//response handle
function handleResponse(response: AxiosResponse<any>) {
  //do something with the response data
  const { status, data } = response;
  const { message } = data as IResponseBase<object>;
  if (status === 201) {
    if (message !== null || message !== '') {
      showToast('error', message);
    }
  }
  return response;
}

//response error handle
function errorResponse(error: any) {
  if (error === undefined) {
    return Promise.reject(error);
  }
  //HANDLE WHEN API IS DOWN
  //handle network error
  if (error.message === 'Network Error' && !error.response) {
    showToast('error', 'Network error!');
  }
  showToast('error', error?.data?.message);

  throw error.response;
}

const agent = () => {
  axios.interceptors.response.use(handleResponse, errorResponse);
  const get = (url: string) => axios.get(url).then(responseBody);
  const post = (url: string, body: {}) =>
    axios.post(url, body).then(responseBody);
  const put = (url: string, body: {}) =>
    axios.put(url, body).then(responseBody);
  const del = (url: string) => axios.delete(url).then(responseBody);
  return { get, post, put, del };
};

// const Auth = {
//   getAllCompanies: () => requests.get('auth/GetAllCompanies'),
//   registerUser: () => requests.post('auth/admin-register'),
// };

// const agent = {
//   Auth,
// };

export default agent;
