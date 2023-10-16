"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function PaymentForm({ data, setStep, setData }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    const cardElement = elements?.getElement("card");

    e.preventDefault();

    try {
      if (!stripe || !cardElement) return alert("invalid value");
      setLoading(true);

      const { data: res } = await axios.post(
        "http://localhost:5000/api/payment",
        { id: data.customerId },
        { withCredentials: true }
      );
      const clientSecret = res.secret;

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (error) {
        console.error(error);
        setLoading(false);
      } else if (paymentIntent.status === "succeeded") {
        const body = {
          customerId: data.customerId,
          email: data.email,
          country: data.country,
          name: data.name,
          appointment: data.appointmentId,
          paid: true,
          amount: 50,
        };
        const { data: response } = await axios.post(
          "http://localhost:5000/api/payment/create",
          body
        );
     
        setLoading(false);
        setSuccess(true);
        toast.success("Payment Successfull", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setData({
          appointmentId: "",
          title: "",
          time: "",
          date: new Date(),
          customerId: "",
          name: "",
          email: "",
          country: "",
        });
        setStep(1);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto shadow-md rounded-md w-1/2 mt-10">
      <h1 className="text-center text-2xl font-bold">Payment Form</h1>

      <form onSubmit={onSubmit} className="mx-auto p-5 my-3">
        {success ? (
          <h3 className="mx-auto text-center text-2xl text-green-600 p-2">
            Payment Successfull
          </h3>
        ) : null}
        {/* <div className="mx-auto text-center w-3/4 my-5">
          <input
            type="number"
            placeholder="Enter Amount"
            min={1}
            minLength={1}
            className="p-2 rounded-md border border-gray-300 w-full"
            onChange={(e) => {
              setSuccess(false);
              setAmount(e.target.value);
            }}
            disabled={loading}
          />
        </div> */}

        <CardElement
          className="w-3/4 mx-auto border border-gray-300 focus:border-gray-400 p-3 rounded-md"
          options={{
            style: {
              base: {
                fontSize: "16px",
              },
            },
          }}
          onChange={() => setSuccess(false)}
          disabled={loading}
        />
        <center className="my-3">
          <button
            type="submit"
            className="bg-gray-300 mx-2 text-black py-2 px-4 rounded-lg hover:bg-gray-400 hover:text-black transition duration-300 ease-in-out"
            onClick={() => setStep((x) => --x)}
          >
            Back
          </button>
          <button
            type="submit"
            className=" bg-black text-white py-2 px-4 rounded-lg hover:shadow-md hover:bg-white hover:text-black transition duration-300 ease-in-out"
             disabled={loading}
          >
            {loading ? "Processing..." : "Pay"}
          </button>
        </center>
      </form>
    </div>
  );
}
