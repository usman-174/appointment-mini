"use client";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import PaymentForm from "@/components/payment/paymentForm";
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserDetailsForm from "@/components/payment/userDetailsForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY);

const bookAppointmentPage = () => {

  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    appointmentId: "",
    title: "",
    time: "",
    date: new Date(),
    customerId: "",
    name: "",
    email: "",
    country: "",
  });
  const renders = {
    1: (
      <AppointmentForm
        step={step}
        setStep={setStep}
        data={data}
        setData={setData}
      />
    ),
    2: (
      <UserDetailsForm
        data={data}
        setStep={setStep}
        setData={setData}
        step={step}
      />
    ),
    3: (
      <Elements stripe={stripePromise}>
        <PaymentForm
          data={data}
          setStep={setStep}
          setData={setData}
          step={step}
        />
      </Elements>
    ),
  };
  return <div className="container mx-auto">{renders[String(step)]}</div>;
};

export default bookAppointmentPage;
