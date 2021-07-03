// api/new-meetup
// POST/api/new-meetup
import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://sahil_7383:sahil_7383@cluster0.xp1la.mongodb.net/meetups?retryWrites=true&w=majority",
    );

    const db = client.db();
    const meetUpCollections = db.collection("meetups");
    const result = await meetUpCollections.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({ message: "MeetUp Inserted" });
  }
};

export default handler;
