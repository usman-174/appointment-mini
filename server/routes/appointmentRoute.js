const express = require("express");
const appointmentRouter = express.Router();
const Appointment = require("../models/appointment");
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  paidAppointment,
} = require("../controllers/appointmentController");
const asyncHandler = require("express-async-handler");
const validateCreateAppointment = require("../validations/appointmentValidation");
// // Create a new appointment
appointmentRouter.post(
  "/appointments",
  validateCreateAppointment,
  asyncHandler(createAppointment)
);

// // Get all appointments
appointmentRouter.get("/appointments", asyncHandler(getAppointments));

// // Get a single appointment by ID
appointmentRouter.get("/appointments/:id", asyncHandler(getAppointment));

// // Update an appointment by ID
appointmentRouter.put("/appointments/:id", asyncHandler(updateAppointment));

appointmentRouter.post("/appointments/paid/:id", asyncHandler(paidAppointment));

// // Delete an appointment by ID
appointmentRouter.delete("/appointments/:id", asyncHandler(deleteAppointment));

module.exports = appointmentRouter;
