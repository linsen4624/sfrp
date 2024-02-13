import ObjectID from "bson-objectid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getCities } from "@/api/global";
import { indexDB } from "@/utils/idb";

dayjs.extend(relativeTime);

export function mergeArray(srcArr) {
  let result = [];
  if (srcArr.length > 0) {
    srcArr.forEach((element) => {
      result = [...result, ...element.list];
    });
  }
  return result;
}

export function localization(target, srcArr) {
  let result = "";
  if (srcArr instanceof Array) {
    if (target instanceof Array) {
      let tmp = [];
      target.forEach((ele) => {
        srcArr.forEach((item) => {
          if (item.value === ele) tmp.push(item.label || item.text);
        });
      });
      result = tmp.join(" | ");
    } else {
      srcArr.forEach((item) => {
        if (item.value === target) result = item.label || item.text;
      });
    }
  }
  return result;
}

export function throttle(fn, interval = 300) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, interval);
  };
}

export const getUUID = function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export function getObjectId() {
  return ObjectID();
}

export function getText(html) {
  var reg = new RegExp("<.+?>", "g");
  var text = html.replace(reg, "");
  return text;
}

export function getTextFromDelta(delta) {
  return delta.reduce(function (text, op) {
    if (!op.insert)
      throw new TypeError("only `insert` operations can be transformed!");
    if (typeof op.insert !== "string") return text + " ";
    return text + op.insert;
  }, "");
}

export function timeDiff(DateA, DateB, unit = "days") {
  let a = dayjs(DateA);
  let b = dayjs(DateB);

  return b.diff(a, unit);
}

export function fromNow(d) {
  return dayjs(d).fromNow();
}

export function format(d, f = "YYYY-MM-DD") {
  return dayjs(d).format(f);
}

function getBrowser() {
  let ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return "IE " + (tem[1] || "");
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\b(OPR|Edge|Edg)\/(\d+)/);
    if (tem != null) return tem.slice(1).join(" ").replace("OPR", "Opera");
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  return M.join(" ");
}

function getClientOS() {
  let ua = navigator.userAgent.toLowerCase();
  if (
    navigator.platform == "Win32" ||
    navigator.platform == "Win64" ||
    navigator.platform == "wow64"
  )
    return "Windows";
  if (
    navigator.platform == "Mac68K" ||
    navigator.platform == "MacPPC" ||
    navigator.platform == "Macintosh" ||
    navigator.platform == "MacIntel"
  )
    return "Mac";
  if (navigator.platform == "X11") return "Unix";

  let isLinux = String(navigator.platform).indexOf("Linux") > -1;
  let bIsAndroid = ua.match(/android/i) == "android";
  if (isLinux) {
    if (bIsAndroid) {
      return "Android";
    } else {
      return "Linux";
    }
  }
}

export function getUserData() {
  return {
    codeName: navigator.appCodeName,
    appName: navigator.appName,
    browser: getBrowser(),
    version: navigator.appVersion,
    language: navigator.language,
    platform: navigator.platform,
    os: getClientOS(),
  };
}

export function isNeedToVerify(userid) {
  let curTime = new Date().toUTCString();
  let pv = localStorage.getItem("PasswordVerified");
  let vt, vu;

  if (pv) {
    pv = JSON.parse(pv);
    vt = pv.verifiedTime;
    vu = pv.verifiedUser;

    if (vu && vt) {
      if (vu == userid) {
        let diff = dayjs(curTime).diff(dayjs(vt), "minutes");
        if (diff > 30) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
}

export function hiddenMiddleStr(val, symbol) {
  if (val && symbol) {
    let targetStr = val.substring(0, val.indexOf(symbol));
    let leftStr = val.substring(val.indexOf(symbol));
    return (
      targetStr.substring(0, 1) +
      "..." +
      targetStr.substring(targetStr.length - 1) +
      leftStr
    );
  }
  return val;
}

export function countPeople(target) {
  let len = 0;
  if (target && target.length > 0) {
    target.forEach((element) => {
      if (element.count) len += element.count;
    });
  }
  return len;
}

export function checkEmail(email) {
  const re =
    /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g;
  return re.test(String(email).toLowerCase());
}

export async function handleCities(country, locale) {
  let cts = await indexDB.getCities(country, locale);
  if (cts && cts.length > 0) {
    return cts;
  } else {
    return await getCities({ country: country, lang: locale });
  }
}

export function openLegalDoc(target, locale) {
  let lang = locale || "en-US";
  let path = "legal/" + target + "?locale=" + lang;
  window.location.href = path;
}

export function getDeviceType() {
  if (matchMedia("(max-width: 576px)").matches) {
    return "xs";
  } else if (matchMedia("(min-width:577px) and (max-width:768px)").matches) {
    return "sm";
  } else if (matchMedia("(min-width:769px) and (max-width:992px)").matches) {
    return "md";
  } else if (matchMedia("(min-width:993px) and (max-width:1200px)").matches) {
    return "lg";
  } else if (matchMedia("(min-width:1201px) and (max-width:1600px)").matches) {
    return "xl";
  } else {
    return "xxl";
  }
}

export const labelCol = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 4 },
  xl: { span: 4 },
  xxl: { span: 4 },
};

export const wrapperCol = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 24 },
  lg: { span: 18 },
  xl: { span: 18 },
  xxl: { span: 18 },
};
