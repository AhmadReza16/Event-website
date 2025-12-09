import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";

const Page = async () => {
  // Build safe base URL with fallbacks
  let base = "http://localhost:3000"; // Default fallback

  // Priority 1: Use explicitly set NEXT_PUBLIC_BASE_URL
  if (process.env.NEXT_PUBLIC_BASE_URL?.trim()) {
    base = process.env.NEXT_PUBLIC_BASE_URL.trim();
  }
  // Priority 2: Use Vercel URL with https protocol
  else if (process.env.VERCEL_URL?.trim()) {
    base = `https://${process.env.VERCEL_URL.trim()}`;
  }

  // Safety check: ensure base always has a protocol
  if (!base.startsWith("http://") && !base.startsWith("https://")) {
    base = `https://${base}`;
  }

  const apiUrl = new URL("/api/events", base).toString();

  let events: IEvent[] = [];

  try {
    const response = await fetch(apiUrl, { next: { revalidate: 60 } });
    if (response.ok) {
      const data = await response.json();
      events = data.events || [];
    } else {
      console.error(
        "Failed to fetch events from",
        apiUrl,
        "status:",
        response.status
      );
    }
  } catch (e) {
    console.error("Error fetching events from", apiUrl, ":", e);
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
