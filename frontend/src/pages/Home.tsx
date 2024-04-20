import { useQuery } from "react-query";
import { HotelType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  const { data: hotels } = useQuery<HotelType[]>("fetchHotels", () =>
    apiClient.fetchHotels()
  );

  if (!hotels) return <></>;

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className="grid md:grid-cols-3 gap-4">
        {hotels.map((hotel) => (
          <LatestDestinationCard hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Home;
