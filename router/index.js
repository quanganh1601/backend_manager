const express = require("express");
const controller = require("../controller");
const router = express.Router();

//Get
router.get("/api/get_student", controller.get_student);
router.get("/api/get_info_student", controller.get_info_student);
router.get("/api/get_bill_student", controller.get_bill_student);
router.get("/api/get_room", controller.get_room);
router.get("/api/get_room_id", controller.get_room_by_id);
router.get("/api/get_building", controller.get_building);
router.get("/api/get_user", controller.get_user)

//post;
router.post("/sig_in", controller.sig_in);
router.post("/register", controller.register);
router.post("/api/insert_info_user", controller.insert_info_user);


//put

//delete

module.exports = router;