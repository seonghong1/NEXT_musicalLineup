import { getFilteredEvents } from "@/data";
import { useRouter } from "next/router";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";

function FilteredEventsPage() {
  const router = useRouter();
  const filterDate = router.query.slug;
  if (!filterDate) {
    return <p className="center">loading. . .. </p>;
  }
  const filteredYear = filterDate[0];
  const filterdMonth = filterDate[1];

  const numYear = Number(filteredYear);
  const numMonth = Number(filterdMonth);

  if (isNaN(numYear) || isNaN(numMonth)) {
    return <p>warning .. . .</p>;
  }

  const filterEvent = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  if (!filterEvent || filterEvent.length === 0) {
    return <p> not found filtered events</p>;
  }
  const date = new Date(numYear, numMonth - 1);
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filterEvent} />
    </div>
  );
}
export default FilteredEventsPage;
