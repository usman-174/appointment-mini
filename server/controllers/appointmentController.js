const NotFoundError = require("../errors/NotFound");
const ValidationError = require("../errors/ValidationError");
const Appointment = require("../models/appointment");

const createAppointment = async (req, res) => {
  const { title, date, time, status } = req.body;

  // Check if an appointment with the same date and time already exists
  const existingAppointment = await Appointment.findOne({ date, time });

  if (existingAppointment) {
    throw new ValidationError(
      "An appointment at the same date and time already exists."
    );
  }

  // Create and save a new appointment
  const newAppointment = new Appointment({
    title,
    date,
    time,
    status,
  });

  const savedAppointment = await newAppointment.save();
  res.json(savedAppointment);
};
const getAppointments = async (req, res) => {
  let filters = {};
  if (req.query.status) {
    filters.status = req.query.status;
  }
  if (req.query.title) {
    filters.title = req.query.title;
  }
  if (req.query.date) {
    filters.date = req.query.date;
  }
  if (req.query.time) {
    filters.time = req.query.time;
  }
  try {
    const appointments = await Appointment.find(filters);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching appointments" });
  }
};
const paidAppointment = async (req, res) => {
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { paid: true },
    { new: true }
  );

  if (!updatedAppointment) {
    throw new NotFoundError("Appointment not found");
  }
  res.json(updatedAppointment);
};
const getAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    throw new NotFoundError("Appointment not found");
  }
  res.status(200).json(appointment);
};
const updateAppointment = async (req, res) => {
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedAppointment) {
    throw new NotFoundError("Appointment not found");
  }
  res.json(updatedAppointment);
};

const deleteAppointment = async (req, res) => {
  const deletedAppointment = await Appointment.findByIdAndRemove(req.params.id);
  if (!deletedAppointment) {
    throw new NotFoundError("Appointment not found");
  }
  res.json(deletedAppointment);
};
module.exports = {
  createAppointment,
  getAppointments,
  paidAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointment,
};
