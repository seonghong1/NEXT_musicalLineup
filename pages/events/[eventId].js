import { getEventById, getFeaturedEvents } from "@/helpers/api-utill";
import { getAllEvents } from "@/helpers/api-utill";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import Head from "next/head";
import Comments from "@/components/input/comments";
function EventDetailPage(props) {
  const event = props.event;

  if (!event) {
    return <p>Loading .. . . </p>;
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={`${event.description}`} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: { event: event },
    revalidate: 1800,
  };
}
export async function getStaticPaths() {
  const data = await getFeaturedEvents();
  const ids = data.map((item) => ({ params: { eventId: item.id } }));
  return {
    paths: ids,
    fallback: true,
  };
}
// export async function getServerSideProps(context) {
//   const eventId = context.params.eventId;
//   const event = await getEventById(eventId);

//   return {
//     props: { event: event },
//   };
// }
export default EventDetailPage;
