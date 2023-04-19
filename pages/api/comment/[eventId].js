import {
  connectDatabase,
  insertDocument,
  getallDocument,
} from "@/helpers/db-utill";

async function comment(req, res) {
  const eventId = req.query.eventId;
  let client;

  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "GET") {
    try {
      const allContents = await getallDocument(client, "comments", {
        "comment.eventId": eventId,
      });
      res.status(200).json({ message: "success", comments: allContents });
    } catch (err) {
      res.status(500).json({ message: "get allContents fail" });
    }
  } else if (req.method === "POST") {
    const { email, name, text } = req.body;
    const newComment = {
      email: email,
      name: name,
      text: text,
      eventId: eventId,
    };
    let result;
    try {
      result = await insertDocument(client, "comments", {
        comment: newComment,
      });
      newComment.id = result.insertedId;
      res.status(200).json({ message: "added comment", comment: newComment });
    } catch (err) {
      res.status(500).json({ message: "insert faild" });
    }
  }
  client.close();
}
export default comment;
