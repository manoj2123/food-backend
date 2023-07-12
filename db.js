import { MongoClient } from "mongodb";
import Obj from "mongodb";
 
const MongoURL = "mongodb+srv://kumar:Manoj1234@cluster0.vqxaak1.mongodb.net/?retryWrites=true&w=majority";
 async function createConnection() {
  const client = new MongoClient(MongoURL);
  await client.connect();
  console.log("MongoDB is connected successfully");
  return client;
}
 
export var ObjectId = Obj.ObjectId;
export const client=await createConnection()