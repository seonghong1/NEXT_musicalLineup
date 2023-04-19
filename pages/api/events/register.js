import {
  connectDatabase,
  insertDocument,
  getregister,
} from "@/helpers/db-utill";

async function register(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "connecting failed" });
    return;
  }

  if (req.method === "POST") {
    const email = req.body.email;
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "plese check email" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: email });
    } catch (err) {
      res.status(500).json({ message: "inserting failed" });
    }
    res.status(201).json({ email: email });
  } else if (req.method === "GET") {
    try {
      const allRegister = await getregister(client, "newsletter");
      res.status(200).json({ message: "success", allRegister: allRegister });
    } catch (err) {
      res.status(500).json({ message: "getregister failed" });
    }
  }
  client.close();
}
export default register;
