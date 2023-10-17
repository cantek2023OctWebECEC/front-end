import axios from "axios";
import { env } from "../config/env";
export const http = axios.create({ baseURL: env.API_HOST });
http.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		// TODO:inject token if loggedin replace the hard coded credential
		config.headers.Authorization = `Basic ${btoa(
			"superadmin@gmail.com:1234567890"
		)}`;
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);
