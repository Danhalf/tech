import axios from "axios";

const API_URL = "http://app.admss.com:8088/api/v1/";

const smapleData = {
  id: 0,
  uid: "string",
  display_name: "string",
  username: "string",
  email: "string",
  given_name: "string",
  middle_name: "string",
  name: "string",
  family_name: "string",
  nickname: "string",
  phone_number: "string",
  comment: "string",
  directory: {
    id: 0,
    name: "string",
    member_count: 0,
  },
  directory_id: 0,
  picture: {
    id: 0,
    name: "string",
    media_type: "string",
    width: 0,
    height: 0,
    size: 0,
    thumbnail_url: "string",
  },
  picture_id: 0,
  avatar_url: "string",
  metadata: {
    additionalProp1: "string",
    additionalProp2: "string",
    additionalProp3: "string",
  },
  tags: ["string"],
  created_at: "2023-02-19T13:52:54.324Z",
  modified_at: "2023-02-19T13:52:54.324Z",
  is_admin: true,
  is_manager: true,
  is_superuser: true,
  is_suspended: true,
  is_trashed: true,
};

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

export const login = (username: string, password: string) => {
  return axios.post(API_URL + "user", {
    user: username,
    secret: password,
    magic: "avansoft",
  });
  /*.then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      // Temporary solution that does not require authorization
      localStorage.setItem("user", JSON.stringify(smapleData));
      return smapleData;
    });*/
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
