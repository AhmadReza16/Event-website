import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <main>
      <Suspense
        fallback={
          <div className="text-center p-8">Loading event details...</div>
        }
      >
        <EventDetails slug={slug} />
      </Suspense>
    </main>
  );
};
export default EventDetailsPage;
