import axios from "@/config/request";

const zg = "/zg_api";
export const api = {
  notice: zg + "/notice",
  message: zg + "/messages",
};

export function getUnreadNoticeCount(parameter) {
  return axios({
    url: api.notice + "/unread/notices",
    method: "get",
    params: parameter,
  });
}

export function getUnreadMessageCount(parameter) {
  return axios({
    url: api.notice + "/unread/messages",
    method: "get",
    params: parameter,
  });
}

export function getAnnounces(parameter) {
  return axios({
    url: api.notice + "/announces",
    method: "get",
    params: parameter,
  });
}

export function getReminders(parameter) {
  return axios({
    url: api.notice + "/reminders",
    method: "get",
    params: parameter,
  });
}

export function updateReminder(data) {
  return axios({
    url: api.notice + "/reminders/update",
    method: "post",
    data: data,
  });
}

export function deleteReminder(parameter) {
  return axios({
    url: api.notice + "/reminders/delete",
    method: "get",
    params: parameter,
  });
}

//Rooms & Messages

export function getMyRooms(parameter) {
  return axios({
    url: api.message + "/rooms/my",
    method: "get",
    params: parameter,
  });
}

export function getRoomById(parameter) {
  return axios({
    url: api.message + "/rooms/get",
    method: "get",
    params: parameter,
  });
}
/*
export function getMessagesByRoom (parameter) {
  return axios({
    url: api.message +  '/rooms/getmessages',
    method: 'get',
    params: parameter
  })
}
*/
export function checkOnline(data) {
  return axios({
    url: api.message + "/rooms/checkonline",
    method: "post",
    data: data,
  });
}

export function createRoom(data) {
  return axios({
    url: api.message + "/rooms/create",
    method: "post",
    data: data,
  });
}

export function createMessage(data) {
  return axios({
    url: api.message + "/rooms/createmessage",
    method: "post",
    data: data,
  });
}

export function deleteMessage(parameter) {
  return axios({
    url: api.message + "/rooms/deletemessage",
    method: "get",
    params: parameter,
  });
}

export function updateMessage(data) {
  return axios({
    url: api.message + "/rooms/updatemessage",
    method: "post",
    data: data,
  });
}

export function getUnreadMessages(parameter) {
  return axios({
    url: api.message + "/rooms/getunreadmessage",
    method: "get",
    params: parameter,
  });
}
/*
export function searchMessage (parameter) {
  return axios({
    url: api.message +  '/rooms/searchmessage',
    method: 'get',
    params: parameter
  })
}
*/
export function updateRoom(data) {
  return axios({
    url: api.message + "/rooms/update",
    method: "post",
    data: data,
  });
}
