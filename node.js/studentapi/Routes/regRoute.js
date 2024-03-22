const express = require("express");
const regController = require("../Controller/regController");
const router = express.Router();

router.get("/getAllReg", regController.getAllReg);
router.get("/getReg/:id", regController.getReg);
router.post("/addReg", regController.addReg);
router.patch("/updateReg/:id", regController.updateReg);

module.exports = router;