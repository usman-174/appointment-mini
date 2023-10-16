"use client";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Details = ({ data }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/appointments?status=${
            status === "all" ? "" : status
          }`
        );
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch appointments", { autoClose: 3000 });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    if (appointments) {
      fetchAppointments();
    } else {
      setAppointments(data);
      setLoading(false);
    }
  }, [status]);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment((prev) =>
      prev === appointment ? null : appointment
    );
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
  };
  const handleDeleteAppointment = async (id) => {
    const appointmetId = id;
    try {
      await axios.delete(
        "http://localhost:5000/api/appointments/" + appointmetId
      );
      toast.success("Deleted Appointment", { autoClose: 3000 });
      setSelectedAppointment(null);
      const filteredAppointments = appointments.filter(
        (x) => x.id !== appointmetId
      );
      setAppointments(filteredAppointments);
      // setRefetch((x) => !x);
    } catch (error) {
      toast.error("Failed to Delete Appointment", { autoClose: 3000 });
    }
  };
  function bringLastElementToFirst(arr) {
    if (arr.length <= 1) {
      return arr; // No need to move elements if the array has 0 or 1 element.
    }

    const lastElement = arr.pop(); // Remove the last element
    arr.unshift(lastElement); // Add the removed element to the beginning of the array

    return arr;
  }

  const handleUpdateStatus = async () => {
    const updatedStatus =
      selectedAppointment.status === "confirmed" ? "pending" : "confirmed";
    try {
      const { data: res } = await axios.put(
        "http://localhost:5000/api/appointments/" + selectedAppointment.id,
        { status: updatedStatus }
      );
      toast.success("Status updated successfully", { autoClose: 3000 });
      const filteredAppointments = appointments.filter(
        (x) => x.id !== selectedAppointment.id
      );

      const updated = res;
      setAppointments(
        bringLastElementToFirst([...filteredAppointments, updated])
      );
      setSelectedAppointment(null);
    } catch (error) {
      toast.error("Failed to update status", { autoClose: 3000 });
    }
  };

  return (
    <div className="px-5 pt-10">
      <center>
        <h3 className="text-3xl font-semibold">Appointments</h3>
      </center>

      <div className="details mt-4">
        <select
          name="status"
          value={status}
          onChange={handleStatusChange}
          className="w-32 p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
        </select>
        <button
          disabled={!selectedAppointment}
          onClick={handleUpdateStatus}
          className="update-btn ml-2 disabled:cursor-not-allowed disabled:bg-gray-900 disabled:text-gray-400
          
          bg-black text-white py-2 px-4 
            rounded-lg hover:shadow-md hover:bg-white hover:text-black transition
             duration-300 ease-in-out"
        >
          Update Status
        </button>
        {loading && !appointments.length ? (
          <div>
            <p className="mx-auto text-center text-3xl text-black p-5  w-10/12">
              Loading...
            </p>
          </div>
        ) : !data && !appointments.length ? (
          <p className="mx-auto text-center text-3xl p-5  text-black ">
            No appointments available
          </p>
        ) : (
          <div className="my-5">
            {appointments.map((appointment) => {
              const isSelected = selectedAppointment === appointment;

              return (
                <div
                  key={appointment.title}
                  className={`p-3 my-3 shadow-md rounded-sm flex flex-col sm:flex-row 
                  justify-between w-10/12 ${
                    isSelected ? "bg-gray-300 " : "bg-gray-100"
                  } cursor-pointer hover:bg-gray-300 `}
                  onClick={() => handleAppointmentClick(appointment)}
                >
                  <div className="flex flex-col text-center sm:text-left">
                    <p className="font-semibold text-2xl ">
                      {appointment.title}
                    </p>
                    <p className="text-gray-800 text-lg ml-1">
                      {moment(appointment.date).format("dddd, MMMM D, YYYY")}
                    </p>
                    <p className="ml-1 text-lg"> {appointment.time}</p>
                    <p className="font-semibold m-1">
                      {appointment.status.toUpperCase()}
                    </p>
                  </div>
                  <div className="flex items-center  justify-center">
                    <button
                      className="bg-gray-300 mx-2 text-black py-2 px-4 rounded-lg hover:bg-gray-400 hover:text-black transition duration-300 ease-in-out"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      <RiDeleteBin6Line className="" />
                    </button>
                    <div className="text-center m-2">
                      <Link
                        className=" bg-black text-white py-2 px-4 rounded-lg hover:shadow-md hover:bg-white hover:text-black transition duration-300 ease-in-out"
                        href={"/manage/" + appointment.id + "?path=manage"}
                      >
                        Show Payment Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
