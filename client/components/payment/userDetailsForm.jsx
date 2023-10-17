"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const UserDetailsForm = ({ setData, data, setStep }) => {
  const { user, isLoaded, } = useUser();


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (data.customerId) {
      setStep((x) => ++x);
      return;
    }
    setLoading(true);

    try {
      const { data: res } = await axios.post(
        "http://localhost:5000/api/customer",
        {
          name: data.name,
          email: data.email,
          country: data.country,
        }
      );

      if (res) {
        const customerId = res.id;

        setData({ ...data, customerId });

        setStep((stepx) => stepx + 1);
      }
    } catch (error) {
      setError(
        error?.response?.data?.error || error.message || "Error occurred :("
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      setData((e) => ({
        ...e,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
      }));
    }
  }, [user, isLoaded]);
  if(!isLoaded) return null
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-md  w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h3 className="text-4xl font-bold text-gray-800 text-center">
          Enter Payment Details
        </h3>

        <form onSubmit={handleFormSubmit} className="mt-4 p-4">
          {error && <p className="text-red-500 my-4 text-left">{error}*</p>}

          <div className="mb-4 text-left">
            <label
              htmlFor="title"
              className="block text-gray-600 text-sm font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 text-left">
            <label
              htmlFor="date"
              className="block text-gray-600 text-sm  font-semibold"
            >
              Name<small className="text-xs text-gray-700"> (optional)</small>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={data.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 text-left">
            <label
              htmlFor="time"
              className="block text-gray-600 text-sm font-semibold"
            >
              Country{" "}
              <small className="text-xs text-gray-700"> (optional)</small>
            </label>
            <input
              type="text"
              name="country"
              id="country"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={data.country}
              onChange={handleChange}
            />
          </div>
          <center>
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
              {loading ? "Submitting..." : "Continue"}
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsForm;
