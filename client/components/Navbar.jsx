"use client"
import {  useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="fixed w-full">
      <nav className=" flex shadow-md items-center  flex-col md:flex-row md:justify-between py-2 bg-slate-50">
        <div className="logo">
          <Link href={"/"}>
            <h2 className="text-left md:text-center text-3xl px-2 py-4 font-bold">
              AppointmentHub
            </h2>
          </Link>
        </div>
        <div className="link ">
          <ul className="flex items-center justify-around gap-28 mr-5">
            <Link href={"/book-appointment"}>
              <li className="text-xl font-mono font-bold cursor-pointer">
                Book Appointment
              </li>
            </Link>
            <Link href={"/manage"}>
              <li className="text-xl font-mono font-bold cursor-pointer">
                Manage
              </li>
            </Link>
            <Link href={"/payments"}>
              <li className="text-xl font-mono font-bold cursor-pointer">
                Payments
              </li>
            </Link>
            {isSignedIn ? (
              <li>
                <UserButton afterSignOutUrl="/" appearance={""} />
              </li>
            ) : 
            
            <Link href={"/signin"}>
            <li className="w-full bg-black text-white py-2 px-4 
            rounded-lg hover:shadow-md hover:bg-white hover:text-black transition
             duration-300 ease-in-out">
              LogIn
            </li>
          </Link>}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
