const express = require("express");
const { addConfirmationModal, getConfirmationModal } = require("../controller/confirmController");
const router = express.Router();

router.post('/addConfirmation', addConfirmationModal)
router.get('/getConfirmation', getConfirmationModal)

module.exports = router;
