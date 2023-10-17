import { cleanEnv, str, url } from "envalid";
export const env = cleanEnv(import.meta.env, {
	NODE_ENV: str(),
	API_HOST: url(),
});
