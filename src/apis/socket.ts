import { io } from "socket.io-client";
import { env } from "../config/env";

// "undefined" means the URL will be computed from the `window.location` object

export const socket = io(env.VITE_API_HOST);
