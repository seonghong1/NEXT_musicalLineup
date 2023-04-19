import { getAllEvents } from "@/helpers/api-utill";
import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import Head from "next/head";
import { useRouter } from "next/router";

function ALLEventPage(props) {
  const router = useRouter();
  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <div>
      <Head>
        <title>all Event</title>
        <meta name="description" content="all event page" />
      </Head>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={props.events} />
      <div className="visitor"></div>
    </div>
  );
}

export default ALLEventPage;

export async function getStaticProps() {
  const AllEvents = await getAllEvents();

  return {
    props: {
      events: AllEvents,
    },
    revalidate: 1800,
  };
}
