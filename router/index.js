const express = require("express");
const controller = require("../controller");
const router = express.Router();

//Get
router.get("/get_student", controller.get_student);
router.get("/get_info_student", controller.get_info_student);
router.get("/get_bill_student", controller.get_bill_student);
router.get("/get_room", controller.get_room);
router.get("/get_room_id", controller.get_room_by_id);
router.get("/get_building", controller.get_building);

//post;

//put

//delete

module.exports = router;