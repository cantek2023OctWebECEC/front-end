import axios from "axios";
import { env } from "../config/env";
import { store } from "../redux/configureStore";
export const http = axios.create({ baseURL: env.VITE_API_HOST });
http.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		// TODO:inject token if loggedin replace the hard coded credential
		config.headers.Authorization = `Basic ${store.getState().Auth.token}`;
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);
export const authHttp = axios.create({ baseURL: env.VITE_API_HOST });
