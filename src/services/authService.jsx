import axios from "axios";

const API = import.meta.env.VITE_API_URL
const authService = {
  /**
   * Signup a new user.
   * Saves the token if the signup is successful.
   * @param {Object} data - User details for signup (name, email, password).
   */
  signup: async (data) => {
    const response = await axios.post(`${API}/auth/signup`, data);
    const { token } = response.data;
    if (token) {
      localStorage.setItem("token", token); // Save token to localStorage
    }
    return response.data;
  },

  /**
   * Log in an existing user.
   * Saves the token if the login is successful.
   * @param {Object} data - User credentials (email, password).
   */
  login: async (data) => {
    const response = await axios.post(`${API}/auth/login`, data);
    const { token } = response.data;
    if (token) {
      localStorage.setItem("token", token); // Save token to localStorage
    }
    return response.data;
  },

  /**
   * Log out the user by removing the token from localStorage.
   */
  logout: () => {
    localStorage.removeItem("token");
  },

  /**
   * Check if the user is authenticated by verifying the presence of a token.
   * @returns {boolean} - True if a token exists in localStorage.
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authService;

