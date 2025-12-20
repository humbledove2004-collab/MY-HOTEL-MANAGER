"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WaitingRoomPage() {
  const [open, setOpen] = React.useState(false);
  const [room, setRoom] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  async function handleConfirm(e?: React.FormEvent) {
    e?.preventDefault();
    if (!room.trim()) {
      setError("Please enter your preferred room (e.g., B205).");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      // TODO: call your API here
      // await api.joinWaitingRoom({ room });
      console.log("Submitted preferred room:", room);
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="w-full flex items-center justify-center">
      <div className="w-full">
        <section className="rounded-[28px] border border-black/5 p-6">
          <div className="mx-auto w-full max-w-sm flex flex-col items-center gap-4">
            {/* Disabled pill */}
            <Button
              type="button"
              disabled
              className="w-full rounded-full border border-blue-400/60 bg-blue-50 text-blue-600/80 px-6 py-6 text-lg font-medium shadow-none hover:bg-blue-50"
              variant="outline"
            >
              No beds available
            </Button>
            
            {/* Primary CTA */}
            <Button
              type="button"
              onClick={() => setOpen(true)}
              className="w-full rounded-full cursor-pointer px-6 py-6 text-lg font-semibold shadow-md bg-[#2563EB] hover:bg-[#1D4ED8]">
              Join waiting List
            </Button>
          </div>
        </section>
      </div>

      {/* MODAL (shadcn/ui Dialog) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-2xl rounded-[28px] p-6 sm:p-8 md:p-10 border border-black/5"
          aria-describedby="waiting-room-desc"
        >
          <DialogHeader>
            <DialogTitle className="text-center text-[28px] md:text-[32px] font-semibold text-[#2563EB]">
              Enter Preferred Room
            </DialogTitle>
            <DialogDescription id="waiting-room-desc" className="sr-only">
              Provide the room number you prefer and confirm to join the waiting list.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConfirm} className="mt-6">
            <div className="space-y-2">
              <Label htmlFor="room" className="text-gray-700 font-medium">
                Room Number
              </Label>
              <Input
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="e.g. (B205)"
                className="rounded-full px-5 py-6 text-[17px]"
              />
            </div>

            <p className="mt-3 text-sm text-[#2563EB]/80">
              You will be assigned to your preferred room once rooms are available.
            </p>

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            <DialogFooter className="mt-6 flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer sm:w-auto rounded-full px-8 py-6 text-base font-semibold bg-[#2563EB] hover:bg-[#1D4ED8]"
              >
                {submitting ? "Confirming..." : "Confirm"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
