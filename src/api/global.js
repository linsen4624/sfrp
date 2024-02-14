import axios from "@/config/request";
const zg = "/zg_api";
const pub = "/public_api";

export function syncCountries(parameter) {
  return axios({
    url: pub + "/synccountries",
    method: "get",
    params: parameter,
  });
}

export function getCountries(parameter) {
  return axios({
    url: pub + "/getcountries",
    method: "get",
    params: parameter,
  });
}

export function getCities(parameter) {
  return axios({
    url: pub + "/getcities",
    method: "get",
    params: parameter,
  });
}

export function getCityName(parameter) {
  return axios({
    url: pub + "/getcityname",
    method: "get",
    params: parameter,
  });
}

export function createFeedback(data) {
  return axios({
    url: zg + "/feedbacks/create",
    method: "post",
    data: data,
  });
}

export function createReport(data) {
  return axios({
    url: zg + "/reports/create",
    method: "post",
    data: data,
  });
}
