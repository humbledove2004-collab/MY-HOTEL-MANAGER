export type Details = {
  checkIn: string;
  checkOut: string;
  roomLabel: string;
  status: "completed" | "cancelled";
  bedLabel: string;
};

export type Bookings = {
  id: string;
  status: "completed" | "cancelled";
  price: number;
  image: string;
  title: string;
  area: string;
  distance: string;
  rating: number;
  reviews: number;
  tags: string[];
  bookingDetails: Details;
};