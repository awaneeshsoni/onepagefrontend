import axios from "axios";
const API = import.meta.env.VITE_API_URL

// Helper function to include the authentication token in the headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Assume token is stored in localStorage
  return { Authorization: `Bearer ${token}` };
};

const pageService = {
  // Create a new page
  createPage: (data) =>
    axios.post(`${API}/pages`, data, { headers: getAuthHeaders() }),

  // Fetch a specific public page by its slug
  getPage: (slug) => axios.get(`${API}/pages/${slug}`),
  //edit page
  editPage: (data) =>
    axios.put(`${API}/pages/${data.slug}`, data, { headers: getAuthHeaders() }),

  // delete
  deletePage: (slug) => {
    axios.delete(`${API}/pages/${slug}`, { headers: getAuthHeaders() });
  },
  // Optionally, fetch all pages created by the current user
  getUserPages: () => axios.get(`${API}/pages`, { headers: getAuthHeaders() }),
};

export default pageService;
