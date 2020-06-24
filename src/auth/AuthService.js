import axios from "axios";

const API_URL = "https://courses4me.herokuapp.com";

class AuthService {
  login(username, password) {
    return axios
      .post(`${API_URL}/login`, {
        username,
        password,
      })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem("user-jwt", JSON.stringify(res.data.token));
        }
        return [username, API_URL];
      });
  }

  logout() {
    localStorage.removeItem("user-jwt");
    localStorage.removeItem("user-info");
  }

  setJwt(myToken) {
    localStorage.setItem("user-jwt", JSON.stringify(myToken));
  }

  register(data) {
    return axios.post(`${API_URL}/register`, data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user-info"));
  }

  getAuthHeader() {
    const jwToken = JSON.parse(localStorage.getItem("user-jwt"));
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    if (jwToken && userInfo) {
      return `token ${jwToken}`;
    } else {
      return {};
    }
  }
}

export default new AuthService();
