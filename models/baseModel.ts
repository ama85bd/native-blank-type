export interface IResponseBase<T extends object> {
  version: string;
  statusCode: number;
  message: string;
  count: number;
  result: T;
}

export interface IUserLogin {
  email: string;
  password: string;
}
export interface ILoginCredential {
  companyId?: string;
  expiration: string;
  id: string;
  token: string;
  userRole: string;
  name: string;
  companyName: string;
}
export interface ICompanyList {
  companyId: string;
  companyName: string;
  id: string;
}
