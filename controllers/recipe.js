import { ObjectId } from "mongodb";
import { client } from "../db.js";

export function getAllRecipe(req) {
  return client.db("recipe").collection("recipe").find(req.query).toArray();
}

export function getRecipeById(id) {
  return client.db("recipe").collection("recipe").findOne({ _id: new ObjectId(id) });
}

export function addRecipeData(data) {
  return client.db("recipe").collection("recipe").insertOne(data);
}

export function updateRecipeData(id, updateRecipeData) {
  return client.db("recipe").collection("recipe").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateRecipeData }
  );
}

export function deleteRecipeData(id) {
  return client.db("recipe").collection("recipe").deleteOne({ _id: new ObjectId(id) });
}
