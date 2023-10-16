import Link from "next/link";
import React from "react";

const PaymentItem = ({ payment }) => (
  <div className="border p-4 mb-4 shadow-md rounded-md">
    <div className="flex justify-between items-center ">
      <div>
        <Link href={`/manage/` + payment.appointment?.id+"?path=payments"}>
          <h2 className="text-xl font-semibold ">
            Appointment ID: <i>{payment.appointment?.id}</i>
          </h2>
        </Link>
        <h2 className="text-lg font-semibold my-2">
          Customer ID: {payment.customerId}
        </h2>
      </div>

      <p
        className={`text-lg ${
          payment.paid ? "text-green-600" : "text-red-600"
        }`}
      >
        {payment.paid ? "Paid" : "Not Paid"}
      </p>
    </div>
    <div className="mt-2">
      <p className="mb-1">
        <strong>Amount:</strong> ${payment.amount}
      </p>
      <p className="mb-1">
        <strong>Email:</strong> {payment.email}
      </p>
      <p className="mb-1">
        <strong>Name:</strong> {payment?.name || "N/A"}
      </p>
      <p className="mb-1">
        <strong>Country:</strong> {payment.country || "N/A"}
      </p>
    </div>
  </div>
);

const Payments = ({ payments }) => (
  <div className="container mx-auto my-5">
    <h1 className="text-3xl font-semibold mb-5">All Payments</h1>

    {payments?.map((payment, index) => (
      <PaymentItem key={index} payment={payment} />
    ))}
  </div>
);

export default Payments;
