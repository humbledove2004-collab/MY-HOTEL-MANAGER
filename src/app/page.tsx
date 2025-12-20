"use client";

import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className=" items-center justify-center mt-80 text-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">Welcome to My Hotel Management System Portal</h1>
         
          <div className="flex justify-center gap-4 space-x-4">
            <Link href="/hotels/">
              <button className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded">
                Explore
              </button>
            </Link>
            {/* <Link href="/signin">
              <button className="bg-gray-200 px-4 py-2 cursor-pointer rounded text-black">
                Sign In
              </button>
            </Link> */}
          </div>
        </div>
      </main>
    </>
  );
}
