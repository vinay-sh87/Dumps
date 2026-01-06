import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="text-xl font-bold logo">Shop</div>

            <div className="hidden md:flex gap-6">
              <a href="#" className="hover:text-red-900 font-normal">
                Home
              </a>
              <a href="#" className="hover:text-red-900 font-normal">
                Products
              </a>
              <a href="#" className="hover:text-red-900 font-normal">
                About
              </a>
            </div>

            <div className="hidden md:flex gap-4">
              <button className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium shadow-sm tracking-wide ">
                Login
              </button>
              <div className="relative">
                <button className="text-xl">🛒</button>
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  0
                </span>
              </div>
            </div>

            <button
              className="md:hidden text-2xl p-2"
              onClick={() => setOpen(!open)}
            >
              {open ? "X" : "☰"}
            </button>
          </div>
          {open && (
            <div className="md:hidden border-t ">
              <div className="flex flex-col gap-4 p-4">
                <a href="#" onClick={() => setOpen(!open)}>
                  Home
                </a>
                <a href="#" onClick={() => setOpen(!open)}>
                  Products
                </a>
                <a href="#" onClick={() => setOpen(!open)}>
                  About
                </a>
                <button className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium shadow-sm">
                  Login
                </button>
                <div className="relative w-8 flex">
                  <button className="text-xl p-2">🛒</button>
                  <span className="absolute -top-2 -right-2 text-white bg-black text-xs rounded-full min-w-[18px] h-[16px] flex items-center justify-center">
                    0
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
