import Payments from "@/components/payment/payments";
import axios from "axios";
import React from "react";
export const metadata = {
  title: "Paymend of Appointments",
  description: "Book you Appointment for a better future",
};

const fetchPayments = async () => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/payments`);
    
    return data;
  } catch (error) {
    return [];
  }
};
const page = async () => {
  const data = await fetchPayments();
  return (
    <div className="container mx-auto">
    
      <Payments payments={data} />
    </div>
  );
};

export default page;
