import { getFeaturedEvents } from "@/helpers/api-utill";
import EventList from "@/components/events/event-list";
import Head from "next/head";
import NewsletterRegistration from "@/components/input/newsletter-registration";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Main Event</title>
        <meta name="description" content="main page" />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </>
  );
}

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
