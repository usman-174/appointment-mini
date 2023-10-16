import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="py-20 h-[50vh] ">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-800">
          Hospital Appointment System
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Book your appointments with ease.
        </p>
        <div className="my-5">
          <Link
            href="/book-appointment"
            className=" bg-black text-white py-3 px-6 font-xl
            rounded-lg hover:shadow-md hover:bg-white hover:text-black transition
             duration-300 ease-in-out"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
