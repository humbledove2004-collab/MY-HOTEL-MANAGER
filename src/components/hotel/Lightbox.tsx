"use client";

import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Download,
} from "lucide-react";

type Props = {
  images: string[];
  index: number; // initial index to show
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onIndexChange: (idx: number) => void;
  captions?: string[];
};

export default function Lightbox({
  images,
  index,
  open,
  onOpenChange,
  onIndexChange,
  captions = [],
}: Props) {
  /* -------------------- state -------------------- */
  const [current, setCurrent] = React.useState(index);
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);

  // zoom/pan
  const [zoom, setZoom] = React.useState(1);
  const [offset, setOffset] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const draggingRef = React.useRef(false);
  const lastRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // swipe detection
  const touchStart = React.useRef<number | null>(null);
  const total = images.length;

  React.useEffect(() => setCurrent(index), [index]);
  React.useEffect(() => {
    // reset view state on image change
    setLoaded(false);
    setErrored(false);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, [current]);

  /* -------------------- navigation -------------------- */
  const go = React.useCallback(
    (delta: number) => {
      const next = (current + delta + total) % total;
      setCurrent(next);
      onIndexChange(next);
    },
    [current, total, onIndexChange]
  );

  /* -------------------- keyboard -------------------- */
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, go, onOpenChange]);

  /* -------------------- zoom handlers -------------------- */
  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const next = clamp(zoom + (e.deltaY > 0 ? -0.15 : 0.15), 1, 4);
    setZoom(next);
    if (next === 1) setOffset({ x: 0, y: 0 });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom === 1) return;
    draggingRef.current = true;
    lastRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || zoom === 1) return;
    const dx = e.clientX - lastRef.current.x;
    const dy = e.clientY - lastRef.current.y;
    lastRef.current = { x: e.clientX, y: e.clientY };
    setOffset((p) => ({ x: p.x + dx, y: p.y + dy }));
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const toggleZoom = () => {
    setZoom((z) => {
      const next = z === 1 ? 2 : 1;
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  };

  /* -------------------- touch swipe -------------------- */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40 && zoom === 1) {
      go(dx > 0 ? -1 : 1);
    }
    touchStart.current = null;
  };

  /* -------------------- helpers -------------------- */
  const caption = captions[current] ?? "";

  const download = () => {
    const a = document.createElement("a");
    a.href = images[current] ?? "#";
    a.download = `image-${current + 1}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-none bg-transparent p-0 outline-none max-w-[96vw] sm:max-w-[94vw] lg:max-w-[92vw]"
        aria-label="Gallery viewer"
      >
        {/* Background gradient rails (for arrows) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black/35 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-black/35 to-transparent" />

        {/* Top controls */}
        <div className="absolute left-3 top-3 z-20 flex items-center gap-2">
          <span className="rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
            {current + 1} / {total}
          </span>
        </div>

        <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
          <button
            onClick={toggleZoom}
            aria-label="Toggle zoom"
            className="rounded-full bg-black/60 p-2 text-white hover:bg-black/75"
          >
            {zoom === 1 ? (
              <Maximize2 className="h-5 w-5" />
            ) : (
              <Minimize2 className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={download}
            aria-label="Download"
            className="rounded-full bg-black/60 p-2 text-white hover:bg-black/75"
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="rounded-full bg-black/60 p-2 text-white hover:bg-black/75"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Prev/Next */}
        <button
          aria-label="Previous image"
          onClick={() => go(-1)}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white hover:bg-black/75 focus:outline-none"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          aria-label="Next image"
          onClick={() => go(1)}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white hover:bg-black/75 focus:outline-none"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Image viewport */}
        <div
          className="relative mx-auto flex h-[68vh] w-full select-none items-center justify-center sm:h-[74vh] lg:h-[78vh]"
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onDoubleClick={toggleZoom}
          role="figure"
        >
          {/* shimmer while loading */}
          {!loaded && !errored && (
            <div className="absolute inset-0 m-auto h-24 w-24 animate-pulse rounded-xl bg-white/10 ring-1 ring-white/20" />
          )}

          {/* error placeholder */}
          {errored && (
            <div className="rounded-xl bg-white/10 p-6 text-white">
              Failed to load image
            </div>
          )}

          <div
            className={[
              "relative will-change-transform transition-transform duration-150 ease-out",
              loaded ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            }}
          >
            <Image
              src={images[current] ?? ""}
              alt={caption || `Photo ${current + 1} of ${total}`}
              width={2400}
              height={1800}
              onLoadingComplete={() => setLoaded(true)}
              onError={() => setErrored(true)}
              className="max-h-[78vh] max-w-[92vw] rounded-xl object-contain shadow-2xl cursor-pointer"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 94vw, 92vw"
              priority
            />
          </div>
        </div>

        {/* Caption */}
        {caption && (
          <div className="mx-auto mt-2 max-w-3xl px-4 text-center text-sm text-white/90">
            {caption}
          </div>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="mt-4 w-full overflow-x-auto">
            <div className="mx-auto flex w-max gap-2 px-6 pb-2">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => {
                    setCurrent(i);
                    onIndexChange(i);
                  }}
                  className={[
                    "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md cursor-pointer",
                    "ring-2 transition",
                    i === current
                      ? "ring-white"
                      : "ring-white/20 hover:ring-white/40",
                  ].join(" ")}
                  aria-label={`Go to image ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`Thumb ${i + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover cursor-pointer"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
