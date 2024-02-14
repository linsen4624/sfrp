import axios from "@/config/request";

const zg = "/zg_api";
const prefix = zg + "/users";
export const api = {
  createaccount: prefix + "/account/create",
  updateaccount: prefix + "/account/update",
  deleteaccount: prefix + "/account/delete",
  getaccount: prefix + "/account/get",
  verifyaccount: prefix + "/account/verify",
  verifyname: prefix + "/account/verifyname",
  sendresetlink: prefix + "/account/sendresetlink",
  parseresetlink: prefix + "/account/parseresetlink",

  getProfiles: prefix + "/profiles",
  getRanking: prefix + "/profiles/ranking",
  overview: prefix + "/profiles/overview",
  getProfile: prefix + "/profiles/get",
  createProfile: prefix + "/profiles/create",
  updateProfile: prefix + "/profiles/update",

  searchorders: prefix + "/account/orders/search",
  getmyorders: prefix + "/account/orders/my",
  getorder: prefix + "/account/orders/get",
  createorder: prefix + "/account/orders/create",
  updateorder: prefix + "/account/orders/update",
  deleteorder: prefix + "/account/orders/delete",
  dopayment: prefix + "/account/orders/payment",

  getcoupons: prefix + "/account/coupons",
  createcoupon: prefix + "/account/coupons/create",
  updatecoupon: prefix + "/account/coupons/update",
  deletecoupon: prefix + "/account/coupons/delete",
  getpromotions: prefix + "/account/promotions",

  getmyactivities: prefix + "/activities",
  createactivity: prefix + "/activities/create",
  deleteactivity: prefix + "/activities/delete",

  getmyrecords: prefix + "/records/my",
  createrecord: prefix + "/records/create",
  deleterecord: prefix + "/records/delete",

  getuserecords: prefix + "/account/props/records",
  deleteuserecord: prefix + "/account/props/records/delete",
};

export function getUserOverViewData(parameter) {
  return axios({ url: api.overview, method: "get", params: parameter });
}

export function getProfiles(parameter) {
  return axios({ url: api.getProfiles, method: "get", params: parameter });
}

export function getRanking(parameter) {
  return axios({ url: api.getRanking, method: "get", params: parameter });
}

export function getProfile(parameter) {
  return axios({ url: api.getProfile, method: "get", params: parameter });
}

export function getAccount(parameter) {
  return axios({ url: api.getaccount, method: "get", params: parameter });
}

export function verifyAccount(data) {
  return axios({ url: api.verifyaccount, method: "post", data: data });
}

export function verifyName(parameter) {
  return axios({ url: api.verifyname, method: "get", params: parameter });
}

export function sendResetLink(parameter) {
  return axios({ url: api.sendresetlink, method: "get", params: parameter });
}

export function parseResetLink(data) {
  return axios({ url: api.parseresetlink, method: "post", data: data });
}

export function createProfile(data) {
  return axios({ url: api.createProfile, method: "post", data: data });
}

export function updateProfile(data) {
  return axios({ url: api.updateProfile, method: "post", data: data });
}

export function createAccount(data) {
  return axios({ url: api.createaccount, method: "post", data: data });
}

export function updateAccount(data) {
  return axios({ url: api.updateaccount, method: "post", data: data });
}

export function deleteAccount(parameter) {
  return axios({ url: api.deleteaccount, method: "get", params: parameter });
}

export function getMyActivities(parameter) {
  return axios({ url: api.getmyactivities, method: "get", params: parameter });
}

export function createActivity(data) {
  return axios({ url: api.createactivity, method: "post", data: data });
}

export function deleteActivity(parameter) {
  return axios({ url: api.deleteactivity, method: "get", params: parameter });
}

export function getMyViewRecords(parameter) {
  return axios({ url: api.getmyrecords, method: "get", params: parameter });
}

export function createViewRecord(data) {
  return axios({ url: api.createrecord, method: "post", data: data });
}

export function deleteViewRecord(parameter) {
  return axios({ url: api.deleterecord, method: "get", params: parameter });
}

export function getUseRecords(parameter) {
  return axios({ url: api.getuserecords, method: "get", params: parameter });
}

export function deleteUseRecord(parameter) {
  return axios({ url: api.deleteuserecord, method: "get", params: parameter });
}

export function searchOrders(parameter) {
  return axios({ url: api.searchorders, method: "get", params: parameter });
}

export function getMyOrders(parameter) {
  return axios({ url: api.getmyorders, method: "get", params: parameter });
}

export function getOrder(parameter) {
  return axios({ url: api.getorder, method: "get", params: parameter });
}

export function createOrder(data) {
  return axios({ url: api.createorder, method: "post", data: data });
}

export function updateOrder(data) {
  return axios({ url: api.updateorder, method: "post", data: data });
}

export function deleteOrder(parameter) {
  return axios({ url: api.deleteorder, method: "get", params: parameter });
}

export function getCoupons(parameter) {
  return axios({ url: api.getcoupons, method: "get", params: parameter });
}

export function createCoupon(data) {
  return axios({ url: api.createcoupon, method: "post", data: data });
}

export function updateCoupon(data) {
  return axios({ url: api.updatecoupon, method: "post", data: data });
}

export function deleteCoupon(parameter) {
  return axios({ url: api.deletecoupon, method: "get", params: parameter });
}

export function getPromotions(parameter) {
  return axios({ url: api.getpromotions, method: "get", params: parameter });
}

export function doPayment(data) {
  return axios({ url: api.dopayment, method: "post", data: data });
}
