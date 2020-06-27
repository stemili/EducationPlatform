import axios from "axios";
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

export default eduApi;
