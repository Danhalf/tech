import axios from "axios";
import { getToken } from "./utils";

export interface LoginResponse {
  modified: string;
  sessionuid: string;
  started: string;
  status: "OK";
  token: string;
  useruid: string;
}

export interface LogoutResponse {
  status: "OK";
}

const API_URL = "http://app.admss.com:8088/api/v1/";

export const login = (username: string, password: string) => {
  return axios
    .post<LoginResponse>(`${API_URL}user`, {
      user: username,
      secret: password,
      magic: "avansoft",
    })
    .then((response) => response.data);
};

export const logout = (userId: string) => {
  return axios
    .post<LogoutResponse>(`${API_URL}user/${userId}/logout`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((response) => response.data);
};
