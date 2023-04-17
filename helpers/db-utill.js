import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://joseonghong:whtjdghd0127@cluster0.xplbrps.mongodb.net/events?retryWrites=true&w=majority"
  );
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
