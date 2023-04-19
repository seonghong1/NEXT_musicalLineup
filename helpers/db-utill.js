import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  return client;
}
export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = db.collection(collection).insertOne(document);
  return result;
}

export async function getallDocument(client, collection, filter) {
  const db = client.db();
  const allContents = await db
    .collection(collection)
    .find(filter)
    .sort({ _id: -1 })
    .toArray();
  return allContents;
}

export async function getregister(client, collection) {
  const db = client.db();
  const allRegister = await db
    .collection(collection)
    .find()
    .sort({ _id: -1 })
    .toArray();
  return allRegister;
}
