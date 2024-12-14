import axios from "axios";
const API = import.meta.env.VITE_API_URL;

// Helper function to include the authentication token in the headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Assume token is stored in localStorage
  return { Authorization: `Bearer ${token}` };
};

const messageService = {
  // Create a new message
  addMessage: (data) => axios.post(`${API}/messages`, data),

  getMessages: () =>
    axios.get(`${API}/messages`, { headers: getAuthHeaders() }),

  deleteMessage: (id) => {
    axios.delete(`${API}/messages/${id}`, { headers: getAuthHeaders() });
  },
};

export default messageService;
