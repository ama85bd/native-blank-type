import { IUserLogin } from '../models/baseModel';
import agent from '../services/agent';

const Auth = {
  loginUser: (login: IUserLogin) => agent().post('auth/login', login),
  loginSingleUser: () => agent().get(`auth/currentuser`),
  getAllCompanies: () => agent().get('auth/GetAllCompanies'),
};

export default Auth;
