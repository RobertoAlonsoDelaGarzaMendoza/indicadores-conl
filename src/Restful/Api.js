import axios from "axios";

export default axios.create({
  baseURL: "https://api-rest-indicador-dev.herokuapp.com/api",
});
