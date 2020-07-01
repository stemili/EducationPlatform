import axios from "axios";
import AuthService from "../auth/AuthService";

const apiUrl = "https://courses4me.herokuapp.com";
const eduApi = axios.create({
  baseURL: apiUrl,
});

// eduApi.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (401 === error.response.status) {
//       window.location = "/login";
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

// function isTokenRefreshed(oldToken) {
//   return oldToken !== AuthService.getRefreshToken();
// }
function refreshToken() {
  console.log("inside refresh");
  const token = AuthService.getRefreshToken();
  return axios({
    url: apiUrl + "/token",
    method: "POST",
    data: JSON.stringify({
      refreshToken: token,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then(({ data }) => {
      data.refresh = token;
      console.log("inside resolving");
      AuthService.setJwt(data.accessToken);
      eduApi.defaults.headers.common[
        "authorization"
      ] = AuthService.getAuthHeader();
    })
    .catch(err => {
      console.log("req is not good");
      console.log(err);
    });
}

eduApi.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    let result = Promise.reject(error);
    let failedRequest = "";
    if (
      error.response &&
      error.response.status === 420 &&
      AuthService.getAuthHeader()
    ) {
      try {
        failedRequest = error.response.config;
        await refreshToken();
        failedRequest.headers.authorization = AuthService.getAuthHeader();
        const response = await axios(failedRequest);
        result = Promise.resolve(response);
      } catch (error) {
        if (error.response.status === 401) {
          AuthService.logout();
          window.location.reload();
        }
        // AuthService.logout();
        // window.location.reload();
        // const oldToken =
        //   error.response && error.response.config.data
        //     ? error.response.config.data.get("refreshToken")
        //     : AuthService.logout();
        // window.location.reload();
        // if (error.response.status === 401) {
        //   if (isTokenRefreshed(oldToken)) {
        //     failedRequest.headers.authorization = AuthService.getAuthHeader();
        //     const response = await axios(failedRequest);
        //     result = Promise.resolve(response);
        //   } else {
        //     AuthService.logout();
        //     window.location.reload();
        //   }
        // }
      }
    }
    return result;
  }
);

export default eduApi;
