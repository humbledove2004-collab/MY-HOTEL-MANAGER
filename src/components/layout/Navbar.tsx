"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, ChevronRight } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Browse Hotels", href: "/hotels" },
  { label: "My Bookings", href: "/bookings" },
  // { label: "Saved", href: "/saved" },
  { label: "Contact Us", href: "/contact" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="MYHSEARCH"
        >
          <Image
            src="/logo.png"
            alt="MYHSEARCH Logo"
            width={160}
            height={40}
            priority
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop nav (centered) */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href} className="relative">
              <Link
                href={l.href}
                className={[
                  "relative text-sm transition-colors",
                  isActive(l.href)
                    ? "text-[#1E6FB0]"
                    : "text-muted-foreground hover:text-[#1E6FB0]",
                ].join(" ")}
              >
                {l.label}
                {/* underline indicator */}
                <span
                  className={[
                    "absolute -bottom-2 left-0 h-[2px] w-full rounded-full transition-opacity",
                    isActive(l.href)
                      ? "bg-[#1E6FB0]/90 opacity-100"
                      : "opacity-0",
                  ].join(" ")}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <div className="mt-4">
            <Link href="/hotels" onClick={() => setOpen(false)}>
              <Button
                className="w-full rounded-full cursor-pointer bg-[#1E6FB0] hover:bg-[#184a74]"
                onClick={() => setOpen(false)}
              >
                Book Your Hotel
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-screen sm:w-96 p-0">
              <SheetHeader className="px-5 pt-5 pb-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex items-center justify-between">
                  <Image
                    src="/logo.png"
                    alt="MYHSEARCH"
                    width={140}
                    height={36}
                    className="h-8 w-auto"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </SheetHeader>

              {/* Mobile links */}
              <div className="mt-4 px-3 pb-4">
                <ul className="grid gap-1">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={[
                          "flex items-center justify-between rounded-xl px-3 py-3 text-sm",
                          isActive(l.href)
                            ? "bg-muted text-foreground"
                            : "text-foreground hover:bg-muted/70",
                        ].join(" ")}
                      >
                        {l.label}
                        <ChevronRight className="h-4 w-4 opacity-60" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-4">
                  <Link href="/hotels" onClick={() => setOpen(false)}>
                    <Button
                      className="w-full rounded-full cursor-pointer bg-[#1E6FB0] hover:bg-[#184a74]"
                      onClick={() => setOpen(false)}
                    >
                      Book Your Hotel
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
