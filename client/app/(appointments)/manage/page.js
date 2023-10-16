import Details from "@/components/appointments/Details";
import React from "react";
export const metadata = {
  title: "Manage Appointments",
  description: "Book you Appointment for a better future",
};

const fetchAppointments = async () => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/appointments`);
    return data;
  } catch (error) {
    return [];
  } 
};
const page = async() => {
    const data = await fetchAppointments()
  return (
    <div className="container mx-auto">
      <Details apointments={data} />
    </div>
  );
};

export default page;
