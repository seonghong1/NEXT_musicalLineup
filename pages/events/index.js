import { getAllEvents } from "@/helpers/api-utill";
import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { useRouter } from "next/router";

function ALLEventPage(props) {
  const router = useRouter();
  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <div>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={props.events} />
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
