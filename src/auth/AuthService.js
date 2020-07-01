import apiCall from "../service/apiCall";

const API_URL = "https://courses4me.herokuapp.com";

class AuthService {
  login(username, password) {
    return apiCall
      .post("/login", {
        username,
        password,
      })
      .then(res => {
        if (res.data.accessToken) {
          console.log(res.data);
          localStorage.setItem(
            "user-jwt",
            JSON.stringify(res.data.accessToken)
          );
          localStorage.setItem(
            "refresh-jwt",
            JSON.stringify(res.data.refreshToken)
          );
        }
        return [username, API_URL];
      });
  }

  logout() {
    localStorage.removeItem("user-jwt");
    localStorage.removeItem("refresh-jwt");
    localStorage.removeItem("user-info");
  }

  setJwt(myToken) {
    localStorage.setItem("user-jwt", JSON.stringify(myToken));
  }

  register(data) {
    return apiCall.post("/register", data);
  }

  getRefreshToken() {
    return JSON.parse(localStorage.getItem("refresh-jwt"));
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
