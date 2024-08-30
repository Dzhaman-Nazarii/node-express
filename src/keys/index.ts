import prodKeys from "./keys.prod.js";
import devKeys from "./keys.dev.js";

const keys = process.env.NODE_ENV === "production" ? prodKeys : devKeys;

export default keys;