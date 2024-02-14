import SearchBox from "./SearchBox.jsx";

const getHistories = function (srcArr) {
  let histories = localStorage.getItem(srcArr);
  if (histories) {
    return JSON.parse(histories);
  }
  return [];
};

const saveHistory = function (srcArr, item) {
  let histories = getHistories(srcArr);
  let isrepeated = -1;

  if (typeof item === "string") {
    isrepeated = histories.findIndex((element) => element == item);
  } else {
    let len = Object.keys(item.params).length;

    isrepeated = histories.findIndex((element) => {
      return (
        element.name == item.name &&
        element.type == item.type &&
        element.length == len
      );
    });
  }

  if (isrepeated == -1) {
    histories.push(item);
    localStorage.setItem(srcArr, JSON.stringify(histories));
  }
};

const removeHistory = function (srcArr, item) {
  let histories = getHistories(srcArr);
  if (typeof item === "string") {
    histories = histories.filter((element) => element != item);
  } else {
    let len = Object.keys(item.params).length;

    histories = histories.filter((element) => {
      return (
        element.name != item.name ||
        element.type != item.type ||
        element.length != len
      );
    });
  }

  localStorage.setItem(srcArr, JSON.stringify(histories));
};

const deleteHistories = function (srcArr) {
  if (srcArr) localStorage.removeItem(srcArr);
};

export { SearchBox, getHistories, saveHistory, removeHistory, deleteHistories };
