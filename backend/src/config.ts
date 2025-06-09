import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_WORKER_SALT = process.env.JWT_WORKER_SALT;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}
if (!JWT_WORKER_SALT) {
  throw new Error("JWT_WORKER_SALT is not defined in .env");
}

export const JWT_SECRET_STRING = JWT_SECRET;
export const WORKER_JWT_SECRET = JWT_SECRET + JWT_WORKER_SALT;
export const TOTAL_DECIMALS = 1000_000_000;
