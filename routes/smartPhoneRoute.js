const express = require("express");
const router = express.Router();
const {
  addSmartphone,
  getAllSmartphones,
  getSmartphonesById,
  getDistinctTypes,
  getDistinctOS,
  getDistinctMemory,
  getDistinctProcessor,
  getDistinctName,
  getDistinctPrice,
} = require("../controller/smartphoneController");

router.post("/addSmartphone", addSmartphone);

router.get("/getAllSmartphones", getAllSmartphones);
router.get("/getSmartphonesById/:id", getSmartphonesById);
router.get("/getDistinctTypes", getDistinctTypes);
router.get("/getDistinctoS", getDistinctOS);
router.get("/getDistinctMemory", getDistinctMemory);
router.get("/getDistinctProcessor", getDistinctProcessor);
router.get("/getDistinctName", getDistinctName);
router.get("/getDistinctPrice", getDistinctPrice);

module.exports = router;
