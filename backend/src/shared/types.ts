export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  pricePerNight: number;
  starRating: number;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  imageUrls: string[];
  lastUpdated: Date;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
