"use client";
import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { convertToAMPM } from "@/utils/convertTime";
import { toast } from "react-toastify";

const AppointmentForm = ({ setData, data, step, setStep }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (!e.target) {
      setData({ ...data, date: e });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if(data.appointmentId){
      setStep(x=>++x)
      return
    }
    setLoading(true);

    try {
      const { data: res } = await axios.post(
        "http://localhost:5000/api/appointments",
        {
          title: data.title,
          date: moment(data.date).format("dddd, MMMM D, YYYY"),
          time: convertToAMPM(data.time),
          status: "pending",
        }
      );

      if (res) {
        const appointmentId = res.id;
        setData({...data,appointmentId})
        setStep((stepx) => stepx + 1);
        toast.success("You Booked an appointment", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      setError(
        error?.response?.data?.error || error.message || "Error occurred :("
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-md  w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h3 className="text-4xl font-bold text-gray-800 text-center">
          Make Appointment
        </h3>
        <form onSubmit={handleFormSubmit} className="mt-4 p-4">
          {error && <p className="text-red-500 my-4 text-left">{error}*</p>}

          <div className="mb-4 text-left">
            <label
              htmlFor="title"
              className="block text-gray-600 text-sm font-semibold"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={data.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 text-left">
            <label
              htmlFor="date"
              className="block text-gray-600 text-sm  font-semibold"
            >
              Date
            </label>
            <DatePicker
              selected={data.date}
              onChange={handleChange}
              minDate={new Date()}
              name="date"
              className=" p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4 text-left">
            <label
              htmlFor="time"
              className="block text-gray-600 text-sm font-semibold"
            >
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={data.time}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 
            rounded-lg hover:shadow-md hover:bg-white hover:text-black transition
             duration-300 ease-in-out"

            disabled={loading}
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
