const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const ConfirmModal = require("../model/confirmModel");
const User = require("../model/userModel");

const addConfirmationModal = asyncHandler(async (req, res) => {
  const { price, modalName, email } = req.body;

  try {
    if (!email || !modalName || !price) {
      res.status(400);
      throw new Error("Each field is required!");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("You have to provide a valid email address");
    } else {
      const confirmationOrder = {
        price,
        modalName,
        email,
        username: user.username,
        mobileNumber: user.mobileNumber,
        address: user.address,
      };

      // Find the existing ConfirmModal document
      let confirmModalDoc = await ConfirmModal.findOne({ "confirmOrder.email": email });

      if (!confirmModalDoc) {
        // If no document exists, create a new one with an array
        confirmModalDoc = new ConfirmModal({ confirmOrder: [confirmationOrder] });
      } else {
        // If a document exists, push the new confirmation order to the array
        confirmModalDoc.confirmOrder.push(confirmationOrder);
      }

      // Save the updated confirmation order to the database
      await confirmModalDoc.save();

      res.status(201).json({
        success: true,
        message: "Confirmation order added successfully",
        data: confirmationOrder,
      });
    }
  } catch (error) {
    console.error("Error in confirming the payment:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getConfirmationModal = asyncHandler(async (req, res) => {
  const confirmationOrder = await ConfirmModal.findOne({});
  
  res.status(200).json(confirmationOrder.confirmOrder);
})

module.exports = {
  addConfirmationModal,
  getConfirmationModal
};