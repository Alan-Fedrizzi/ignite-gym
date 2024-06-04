import axios from "axios";
import { AppError } from "@utils/AppError";

const api = axios.create({
  baseURL: "http://192.168.1.81:3333",
  timeout: 5_000, // quantidade de tempo em milissegundos
});
// }).interceptors; // poderíamos usar o interceptor direto aqui
// podemos interceptar o request e o response também

/*
// config, temos todas as infos da request
// segundo parâmetro pegamos o error
api.interceptors.request.use(
  (config) => {
    console.log("Dados enviados", config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Interceptor response", response);
    return response;
  },
  (error) => {
    console.log("Interceptor response error", error);
    return Promise.reject(error);
  }
);
*/

api.interceptors.response.use(
  // se deu td certo, só retorna a response mesmo
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };
