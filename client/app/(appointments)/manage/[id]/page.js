import React from "react";
import axios from "axios";
import Link from "next/link";
import PaymentDetails from "@/components/appointments/PaymentDetails";
export async function generateMetadata({ params }) {
  // read route params
  const id = params.id;
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/appointments/${id}`
    );
    return {
      title: data.title.length < 5 ?  data.title+ "- Appointment":data.title,
      desccription: data.title + " " + "Appointments",
    };
  } catch (error) {
console.log(error.message);
    return {
      title: "Appointment" +error.message,
      desccription: "Appointments",
    };
  }
}

const getDetails = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/payment/${id}`);
    return data;
  } catch (error) {
    return {};
  }
};

const ErrorPage = ({ path }) => (
  <div className="mx-auto p-3 container">
    <Link href={`/${path}`} className="block my-4">
      <span className="mt-4 text-black hover:underline">Go Back</span>
    </Link>
    <h1 className="text-2xl text-center p-3">Not Paid</h1>
  </div>
);

const PaymentPage = ({ details, path }) => (
  <div className="mx-auto container my-5">
    <Link href={`/${path}`} className="block my-4">
      <span className="mt-4 text-black hover:underline">Back</span>
    </Link>
    <PaymentDetails paymentData={details} />
  </div>
);

const Page = async ({ params, searchParams }) => {
  const details = await getDetails(params.id);

  if (!details) {
    return <ErrorPage path={searchParams.path} />;
  }

  return <PaymentPage details={details} path={searchParams.path} />;
};

export default Page;
