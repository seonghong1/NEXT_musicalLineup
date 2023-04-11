import { getAllEvents, getFilteredEvents } from "@/data";
import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { useRouter } from "next/router";


function ALLEventPage() {
  const events = getAllEvents();
  const router = useRouter();
  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <div>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </div>
  );
}
export default ALLEventPage;
