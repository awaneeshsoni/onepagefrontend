import axios from "axios";

const API = import.meta.env.VITE_API_URL

const token = localStorage.getItem("token");
const Authorization = `Bearer ${token}`;

const linkService = {
  getLinks: () =>
    axios.get(`${API}/links`, {
      headers: {
        Authorization: Authorization,
      },
    }),
  getLink: (slug) =>
    axios.get(`${API}/links/${slug}`, {
      headers: {
        Authorization: Authorization,
      },
    }),
  addLink: (data) =>
    axios.post(`${API}/links`, data, {
      headers: {
        Authorization: Authorization,
      },
    }),
  editLink: (data) =>
    axios.put(`${API}/links/${data.slug}`, data, {
      headers: {
        Authorization: Authorization,
      },
    }),
  deleteLink: (slug) =>{
    axios.delete(`${API}/links/${slug}`, {
      headers: {
        Authorization: Authorization,
      },
    }) },
};

export default linkService;
