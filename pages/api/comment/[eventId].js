import {
  connectDatabase,
  insertDocument,
  getallDocument,
} from "@/helpers/db-utill";

async function comment(req, res) {
  const eventId = req.query.eventId;
  const client = await connectDatabase();

  if (req.method === "GET") {
    try {
      const allContents = await getallDocument(client, "comments", {
        "comments.eventId": eventId,
      });
      res.status(200).json({ message: "success", comments: allContents });
    } catch (err) {
      res.status(500).json({ message: "get allContents fail" });
    }
    client.close();
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
      result = insertDocument(client, "comments", {
        comment: newComment,
      });
    } catch (err) {
      res.status(500).json({ message: "insert faild" });
      return;
    }

    newComment.id = result.insertedId;
    res.status(200).json({ message: "added comment", comment: newComment });
  }
  client.close();
}
export default comment;
