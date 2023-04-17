import { MongoClient } from "mongodb";

async function comment(req, res) {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(
    "mongodb+srv://joseonghong:whtjdghd0127@cluster0.xplbrps.mongodb.net/events?retryWrites=true&w=majority"
  );
  const db = client.db();

  if (req.method === "GET") {
    const allContents = await db
      .collection("comments")
      .find({ "comments.eventId": eventId })
      .sort({ _id: -1 })
      .toArray();
    res.status(200).json({ message: "success", comments: allContents });
  } else if (req.method === "POST") {
    const { email, name, text } = req.body;
    const newComment = {
      email: email,
      name: name,
      text: text,
      eventId: eventId,
    };

    const result = await db
      .collection("comments")
      .insertOne({ comments: newComment });

    newComment.id = result.insertedId;
    res.status(200).json({ message: "added comment", comment: newComment });
  }
  client.close();
}
export default comment;
