// src/types/hotel.ts

import { LucideIcon } from "lucide-react";

export interface Room {
  id: number;
  bookingPrices: {
    "one per room"?: number;
    "two per room"?: number;
    "three per room"?: number;
    "four per room"?: number;
    "six per room"?: number;
  };
  bed: string[];
  availableBeds: number;
  features: string[];
}

export interface Location {
  address: string;
  city: string;
  region: string;
  distanceFromCampus: string;
}

export interface Contact {
  manager: string;
  phone: string;
  email: string;
}
export interface Amenity {
  name: string;
  icon: LucideIcon;
}
export interface Hotels {
  id: string;
  name: string;
  description: string;
  location: Location;
  images: string[];
  amenities: string[];
  contact: Contact;
  rooms: Room[];
  hotel_rules: string[];
  badge: string;
  roomType: string;
  rating: number;
  reviews: number;
  priceLabel: string;
  basePrice: number;
  area: string;
  title: string;
  distance: string;
  image: string;
}

export type allhotels = Hotels[];
