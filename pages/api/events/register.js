import { connectDatabase, insertDocument } from "@/helpers/db-utill";

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
      await insertDocument(client, "newsletter", { email: email });
    } catch (err) {
      res.status(500).json({ message: "inserting failed" });
      return;
    }
    client.close();
    res.status(201).json({ email: email });
  }
}
export default register;
