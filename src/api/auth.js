import axios from "@/config/request";

const zg = "/zg_api";
const pub = "/public_api";
const request_login = zg + "/users/login";
const info_uri = zg + "/users/info";
const refresh_token = zg + "/users/refresh";
const start_oauth = pub + "/users/oauth";

export function login(data) {
  return axios({ url: request_login, method: "post", data: data });
}

export function getInfo(parameter) {
  return axios({ url: info_uri, method: "get", params: parameter });
}

export function refreshToken(parameter) {
  return axios({ url: refresh_token, method: "get", params: parameter });
}

export function startOAuth(parameter) {
  return axios({ url: start_oauth, method: "get", params: parameter });
}
