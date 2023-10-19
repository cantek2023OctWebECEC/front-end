import { cleanEnv, str, url } from "envalid";
console.log(import.meta.env);
export const env = cleanEnv(import.meta.env, {
	VITE_NODE_ENV: str(),
	VITE_API_HOST: url(),
});
