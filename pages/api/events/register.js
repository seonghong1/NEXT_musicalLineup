import { MongoClient } from "mongodb";

async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://joseonghong:whtjdghd0127@cluster0.xplbrps.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}
async function insertDocument(client, document) {
  const db = client.db();
  await db.collection("newsletter").insertOne(document);
}
async function register(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "plese check email" });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "connecting failed" });
      return;
    }

    try {
      await insertDocument(client, { email: email });
    } catch (err) {
      res.status(500).json({ message: "inserting failed" });
      return;
    }
    client.close();
    res.status(201).json({ email: email });
  }
}
export default register;
