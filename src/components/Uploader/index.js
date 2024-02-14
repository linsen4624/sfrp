import Uploader from "./Uploader.jsx";
import SingleUploader from "./SingleUploader.jsx";
import axios from "@/config/request";
import i18n from "@/locale";

const zg = "zg_api";
const ValidateExt = (file) => {
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isGIF = file.type === "image/gif";

  if (!isJPG && !isPNG && !isGIF) {
    return i18n.global.t("global.tips.uploader.warning.type");
  }
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    return i18n.global.t("global.tips.uploader.warning.size", ["1"]);
  }
  return true;
};

const uploadAvatar = (data) => {
  return axios({
    url: zg + "/uploadAvatar",
    method: "post",
    processData: false,
    data: data,
  });
};

const uploadFile = (data) => {
  return axios({
    url: zg + "/upload",
    method: "post",
    processData: false,
    data: data,
  });
};

const uploadFiles = (data) => {
  return axios({
    url: zg + "/uploadMore",
    method: "post",
    processData: false,
    data: data,
    timeout: 120000,
  });
};

const deleteFile = (data) => {
  return axios({
    url: zg + "/upload/del",
    method: "post",
    processData: false,
    data: data,
  });
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export {
  Uploader,
  SingleUploader,
  getBase64,
  deleteFile,
  uploadFiles,
  uploadFile,
  uploadAvatar,
  ValidateExt,
};
