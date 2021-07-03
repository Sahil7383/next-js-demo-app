import { MongoClient, ObjectId } from "mongodb";
import MeetupDetailPage from "../../components/meetups/MeetupDetailPage";
import { Fragment } from "react";
import Head from "next/head";

const MeetupDetailsPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetUpData.title}</title>
        <meta name="description" content={props.meetUpData.description} />
      </Head>
      <MeetupDetailPage
        image={props.meetUpData.image}
        title={props.meetUpData.title}
        address={props.meetUpData.address}
        description={props.meetUpData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://sahil_7383:sahil_7383@cluster0.xp1la.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetUpCollections = db.collection("meetups");
  const meetups = await meetUpCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        newmeetupid: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetUpId = context.params.newmeetupid;
  const client = await MongoClient.connect(
    "mongodb+srv://sahil_7383:sahil_7383@cluster0.xp1la.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetUpCollections = db.collection("meetups");
  const selectedMeetup = await meetUpCollections.findOne({
    _id: ObjectId(meetUpId),
  });

  console.log(selectedMeetup);

  return {
    props: {
      meetUpData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetailsPage;
