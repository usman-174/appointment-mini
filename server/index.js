const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { config } = require("dotenv");
const { connectDB } = require("./db/connectdb");
const appointmentRouter = require("./routes/appointmentRoute");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const paymentRoute = require("./routes/paymentRoute");

const app = express();

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  const { parsed } = config();
  console.table(parsed);
  app.use(morgan("dev"));
}

let corsOptions = isProduction
  ? { origin: JSON.parse(process.env.ORIGIN) }
  : { origin: ['http://localhost:3000'] };

const port = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

app.use(cors(corsOptions));

// Parse JSON request bodies
app.use(express.json());

// Define a route for the root URL
app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

// Use the appointmentRouter for all routes starting with /api
app.use("/api", appointmentRouter);
app.use("/api", paymentRoute);

app.use(errorHandlerMiddleware);

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("ERROR =>", error.message, "<=");
  console.error("---------Exiting App---------");
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("ERROR =>", error.message, "<=");
  console.error("---------Exiting App---------");
  process.exit(1);
});

// Start the server and connect to the database
app.listen(port, () => {
  console.log(`Server Listening to Port -> ${port}`);
  connectDB(URI);
});
