const Mobile = require("../model/smartPhone");
const asyncHandler = require("express-async-handler");

const addSmartphone = asyncHandler(async (req, res) => {
  const { name, price, type, processor, operating_system, memory, image } =
    req.body;

  try {
    // Find the document with smartphones array
    let mobileDocument = await Mobile.findOne();

    // If no document exists, create a new one
    if (!mobileDocument) {
      mobileDocument = await Mobile.create({ smartphones: [] });
    }

    // Create a new smartphone
    const newSmartphone = {
      name,
      price,
      type,
      processor,
      operating_system,
      memory,
      image,
    };

    // Add the new smartphone to the array
    mobileDocument.smartphones.push(newSmartphone);

    // Save the updated document
    await mobileDocument.save();

    res.status(200).json(newSmartphone);
  } catch (error) {
    console.error("Error adding smartphone:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getAllSmartphones = asyncHandler(async (req, res) => {
  const mobileDocument = await Mobile.findOne();
  const smartphones = mobileDocument ? mobileDocument.smartphones : [];

  res.status(200).json({ success: true, smartphones });
});

const getSmartphonesById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const mobileDocument = await Mobile.findOne({ 'smartphones._id': id }, { 'smartphones.$': 1 });

    if (!mobileDocument) {
      res.status(404);
      throw new Error("Mobile document not found");
    }

    const smartphones = mobileDocument.smartphones || [];
    res.status(200).json({ success: true, smartphones });
  } catch (error) {
    console.error("Error getting smartphones by ID", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getDistinctTypes = asyncHandler(async (req, res) => {
  try {
    const distinctTypes = await Mobile.aggregate([
      { $unwind: "$smartphones" },
      { $group: { _id: "$smartphones.type" } },
      { $project: { _id: 0, type: "$_id" } },
    ]);

    res.status(200).json({ success: true, distinctTypes });
  } catch (error) {
    console.error("Error getting distinct types:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getDistinctProcessor = asyncHandler(async (req, res) => {
  try {
    const distinctprocessor = await Mobile.aggregate([
      { $unwind: "$smartphones" },
      { $group: { _id: "$smartphones.processor" } },
      { $project: { _id: 0, processor: "$_id" } },
    ]);

    res.status(200).json({ success: true, distinctprocessor });
  } catch (error) {
    console.error("Error getting distinct processor:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getDistinctOS = asyncHandler(async (req, res) => {
  try {
    const distinctOS = await Mobile.aggregate([
      { $unwind: "$smartphones" },
      { $group: { _id: "$smartphones.operating_system" } },
      { $project: { _id: 0, operating_system: "$_id" } },
    ]);

    res.status(200).json({ success: true, distinctOS });
  } catch (error) {
    console.error("Error getting distinct operating_system:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getDistinctMemory = asyncHandler(async (req, res) => {
  try {
    const distinctmemorys = await Mobile.aggregate([
      { $unwind: "$smartphones" },
      { $group: { _id: "$smartphones.memory" } },
      { $project: { _id: 0, memory: "$_id" } },
    ]);

    res.status(200).json({ success: true, distinctmemorys });
  } catch (error) {
    console.error("Error getting distinct memorys:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getDistinctName = asyncHandler(async (req, res) => {
  try {
    const distinctName = await Mobile.aggregate([
      { $unwind: "$smartphones" },
      { $group: { _id: "$smartphones.name" } },
      { $project: { _id: 0, name: "$_id" } },
    ]);

    res.status(200).json({ success: true, distinctName });
  } catch (error) {
    console.error("Error getting distinct name:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getDistinctPrice = asyncHandler(async (req, res) => {
  try {
    const distinctPrices = await Mobile.aggregate([
      { $unwind: "$smartphones" },
      { $group: { _id: "$smartphones.price" } },
      { $project: { _id: 0, price: "$_id" } },
    ]);

    res.status(200).json({ success: true, distinctPrices });
  } catch (error) {
    console.error("Error getting distinct memorys:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = {
  addSmartphone,
  getAllSmartphones,
  getSmartphonesById,
  getDistinctTypes,
  getDistinctMemory,
  getDistinctOS,
  getDistinctProcessor,
  getDistinctName,
  getDistinctPrice
};
