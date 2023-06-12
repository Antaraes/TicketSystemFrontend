import axios from "axios";
import jwt_decode from "jwt-decode";
const API = axios.create({
  baseURL: "http://antaresjm.pythonanywhere.com/",
});
API.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("access")) {
      delete req.headers.Authorization;
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("access"))}`;
      console.log(req.headers.Authorization);
      jwt_decode(localStorage.getItem("access")).user_id;
    }
    return req;
  },
  (err) => err
);
// const id = jwt_decode(localStorage.getItem("access")).user_id;
export const LogIn = (data) => API.post("/login/", data);
export const LogOut = () => API.post("logout/");
export const GetTickets = () => API.get("/api/tickets/");
export const GetOrders = () => API.get("api/order/");
export const DeleteOrder = (orderId) => API.delete(`/api/order/${orderId}`);
export const GetOrderDetail = (id) => API.get(`/api/order/${id}`);
export const PostTickets = (ticket) => API.post("/api/tickets/", ticket);
export const UpdateTicket = (ticketId, updatedStatus) =>
  API.put(`/api/tickets/${ticketId}/`, { status: updatedStatus });
export const GetUserDetail = () =>
  API.get(`/api/users/${jwt_decode(localStorage.getItem("access")).user_id}`);
export const GetUserList = (id) => API.get(`/api/users/${id}`);
export const PostOrder = (data) =>
  API.post("/api/order/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
