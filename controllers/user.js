import { client } from "../db.js";
import Jwt from "jsonwebtoken";

export function addUser(userInfo) {
  return client.db("cars").collection("users").insertOne(userInfo);
}

export function getUser(userEmail) {
  return client.db("cars").collection("users").findOne({ email: userEmail });
}

export function generateJwtToken(id) {

return Jwt.sign({ id }, process.env.SECERETKEY, { expiresIn: "30d" });
}
