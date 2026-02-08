import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // IMPORTANT for refresh token cookie
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    if (
      error.response?.status === 401 &&
      !originalReq._retry
    ) {
      originalReq._retry = true;

      try {d
        const res = await api.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        localStorage.setItem("accessToken", res.data.accessToken);

        originalReq.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return api(originalReq);
      } catch (err) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
