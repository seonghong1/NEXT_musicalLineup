import { getFeaturedEvents } from "../data";
import EventList from "@/components/events/event-list";

function HomePage() {
  const featureEvent = getFeaturedEvents();

  return (
    <>
      <EventList items={featureEvent} />
    </>
  );
}

export default HomePage;
