import { HotelType } from "../../../backend/src/shared/types";

type BookingProps = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  nights: number;
  hotel: HotelType;
};

const BookingDetailSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  nights,
  hotel,
}: BookingProps) => {
  return (
    <div className="flex flex-col border border-slate-300 rounded-lg gap-6">
      <h3 className="text-2xl font-bold mt-3 py-2 px-3">
        Your Booking Details
      </h3>
      <div className="border-b px-3 pb-2">
        <p>Location:</p>
        <p className="font-bold">
          {`${hotel.name}, ${hotel.city}, ${hotel.country}`}
        </p>
      </div>
      <div className="grid grid-cols-2 border-b px-3 pb-2">
        <div className="">
          <p>Check-in</p>
          <p className="font-bold">{checkIn.toDateString()}</p>
        </div>
        <div className="">
          <p>Check-out</p>
          <p className="font-bold">{checkOut.toDateString()}</p>
        </div>
      </div>
      <div className="border-b px-3 pb-2">
        <p>Total length of stay:</p>
        <p className="font-bold">{nights} nights</p>
      </div>
      <div className="border-b px-3 pb-2">
        <p>Guests</p>
        <p className="font-bold">
          {adultCount} adults & {childCount} Children
        </p>
      </div>
    </div>
  );
};

export default BookingDetailSummary;
