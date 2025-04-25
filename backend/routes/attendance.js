const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const controller = require("../controllers/AttendanceController");

router.post("/punch-in", auth, controller.punchIn);
router.post("/punch-out", auth, controller.punchOut);
router.get("/", auth, controller.getHistory);
router.get("/summary", auth, controller.getSummary);

module.exports = router;
