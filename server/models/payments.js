const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment", // Reference to the Appointment model
    },
  },
  {
    timestamps: true,
  }
);
paymentSchema.set("toJSON", {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
