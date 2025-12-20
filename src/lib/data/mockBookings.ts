import { Bookings } from "../types/bookings";


const BOOKINGS: Bookings[] = [
  {
    id: "1",
    status: "completed",
    price: 3500,
    image: "/images/hostel_image_1.jpg",
    title: "Campus Lodge Downtown",
    area: "UMaT Area",
    distance: "0.3 miles from campus",
    rating: 4.6,
    reviews: 89,
    tags: ["Wi-Fi", "Kitchen", "Common Area", "Security", "Shared"],
    bookingDetails: 
      {
        checkIn: "2025-02-10",
        checkOut: "2025-04-15",
        roomLabel: "Two per room",
        status: "cancelled",
        bedLabel: "B210B",
      },
    
  },
  {
    id: "2",
    status: "completed",
    price: 2500,
    image: "/images/hostel_image_2.jpg",
    title: "Glass Hotel",
    area: "Tesano Area",
    distance: "0.3 miles from campus",
    rating: 4.6,
    reviews: 89,
    tags: ["Wi-Fi", "Kitchen", "Common Area", "Security", "Shared"],
    bookingDetails: 
      {
        checkIn: "2025-02-10",
        checkOut: "2025-04-15",
        roomLabel: "Two per room",
        status: "cancelled",
        bedLabel: "B210B",
      },
    
  },
  {
    id: "3",
    status: "completed",
    price: 4500,
    image: "/images/hostel_image_3.jpg",
    title: "University Heights Residence",
    area: "Tema Area",
    distance: "0.3 miles from campus",
    rating: 4.6,
    reviews: 89,
    tags: ["Wi-Fi", "Kitchen", "Laundry", "Common Area", "Security", "Shared"],
    bookingDetails: 
      {
        checkIn: "2025-02-10",
        checkOut: "2025-04-15",
        roomLabel: "Two per room",
        status: "completed",
        bedLabel: "B210B",
      },
    
  },
];

export default BOOKINGS;