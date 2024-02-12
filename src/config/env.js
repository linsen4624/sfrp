const devhost = "http://127.0.0.1:7001";
const prodhost = "https://www.zg-bdsm.com";
const AWS_S3 = "https://s3-zg-20211011.s3.us-east-2.amazonaws.com";

let baseUrl = prodhost;
let socketUrl = prodhost;
let uploadUrl = AWS_S3 + "/upload/";
let userIconurl = AWS_S3 + "/users/";
let emojiUrl = prodhost + "/public/emoji/icon/";
let flagUrl = prodhost + "/public/flags/";
let globalUrl = prodhost + "/public/global/";

if (import.meta.env.DEV) {
  baseUrl = devhost;
  uploadUrl = devhost + "/public/upload/";
  globalUrl = devhost + "/public/global/";
  emojiUrl = devhost + "/public/emoji/icon/";
  userIconurl = devhost + "/public/users/";
  flagUrl = devhost + "/public/flags/";
  socketUrl = devhost;
}

export {
  baseUrl,
  uploadUrl,
  globalUrl,
  emojiUrl,
  userIconurl,
  flagUrl,
  socketUrl,
};
