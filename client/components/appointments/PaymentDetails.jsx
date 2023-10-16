"use client"
import React from 'react';

const PaymentDetails = ({ paymentData }) => {
  const {
    customerId,
    amount,
    email,
    country,
    paid,
    appointment,name,
  } = paymentData;

  const {
    title,
    date,
    time,
    status,
  } = appointment;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

      <div className="mb-4">
        <strong>Customer ID:</strong> {customerId}
      </div>

      <div className="mb-4">
        <strong>Amount:</strong> ${amount}
      </div>

      <div className="mb-4">
        <strong>Email:</strong> {email}
      </div>
      <div className="mb-4">
        <strong>Name:</strong> {name || 'Not specified'}
      </div>
      <div className="mb-4">
        <strong>Country:</strong> {country || 'Not specified'}
      </div>

      <div className="mb-4">
        <strong>Paid:</strong> {paid ? 'Yes' : 'No'}
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-4">Appointment Details</h2>

      <div className="mb-4">
        <strong>Title:</strong> {title}
      </div>

      <div className="mb-4">
        <strong>Date:</strong> {new Date(date).toLocaleDateString()}
      </div>

      <div className="mb-4">
        <strong>Time:</strong> {time}
      </div>

      <div className="mb-4">
        <strong>Status:</strong> {status}
      </div>
    </div>
  );
};

export default PaymentDetails;
