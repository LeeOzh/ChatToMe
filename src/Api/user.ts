import request from "./requset/request";

const loginUrl = "/api/login";

export const login = (data: { username: string; password: string }) => {
  return request({
    url: loginUrl,
    method: "post",
    data,
  });
};
