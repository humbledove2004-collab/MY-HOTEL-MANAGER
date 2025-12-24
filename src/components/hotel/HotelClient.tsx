// ✅ NEW FILE: src/components/hotel/HotelPageClient.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import BookingCard from "@/components/hotel/BookingCard";
import ConfirmBookingCard from "@/components/cards/ConfirmBookingCard";

type Props = {
  hotelId: string;
};

export default function HotelPageClient({ hotelId }: Props) {
  const [, setShowCompleted] = useState(false);
  const [open] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    setShowConfirm(false);
    setShowCompleted(true);
    toast.success("Room Booked");
  };

  const close = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <BookingCard
        params={{ hotel: hotelId }}
        onCompleted={() => {
          setShowConfirm(true);
        }}
      />

      {showConfirm && (
        <ConfirmBookingCard
          open={open}
          onClose={close}
          onConfirm={handleConfirm}
          title="Are you sure you want to book this room?"
          confirmText="Confirm"
          cancelText="Cancel"
          loading={false}
        />
      )}
    </>
  );
}