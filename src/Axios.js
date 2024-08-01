import axios from "axios";
import BaseURL from "./BaseURL";
 
const instance = axios.create({
  baseURL: BaseURL + ":8000",
  // headers: {
  //   Authorization: {
  //     toString() {
  //       return `Token ${localStorage.getItem("token")}`;
  //     },
  //   },
  //   "Cache-Control": "no-cache",
  // },
});
 
export default instance;