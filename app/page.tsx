import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
  const base =
    BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined) ||
    "http://localhost:3000";

  const apiUrl = new URL("/api/events", base).toString();

  let events: IEvent[] = [];

  try {
    const response = await fetch(apiUrl, { next: { revalidate: 60 } });
    if (response.ok) {
      const data = await response.json();
      events = data.events || [];
    } else {
      console.error("Failed to fetch events", response.status);
    }
  } catch (e) {
    console.error("Error fetching events:", e);
  }

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event.title} className="list-none">
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
