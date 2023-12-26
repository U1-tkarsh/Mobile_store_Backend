const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const confirmationSchema = new Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    modalName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: validator.isEmail,
    },
    username: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const confirmModalSchema = new Schema(
  {
    confirmOrder: [confirmationSchema],
  },
  { timestamps: true }
);

const ConfirmModal = mongoose.model("ConfirmModal", confirmModalSchema);

module.exports = ConfirmModal;