const action = require("../action/index")
const middleware = require("../controller/middleware");

const controller = {
  get_student: async(req, res, next) => {
    await action.get_student
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err))
  },
  get_info_student: async(req, res) => {
    await action.get_info_student(req)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err))
  },
  get_bill_student: async(req, res) => {
    await action.get_bill_student
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err))
  },
  get_room: async(req, res) => {
    await action.get_room(req)
      .then((result) => res.json(result))
      .catch((err) => res.status(500).json({ message: "error server" }));
  },
  get_room_by_id: async(req, res) => {
    await action.get_room_by_id(req)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err))
  },
  get_building: async(req, res) => {
    await action.get_building
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err))
  },
  sig_in: async(req, res) => {
    await action.sigIn(req)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err))
  },
  register: async(req, res) => {
    await action.register(req)
      .then(() => res.status(200).json({ message: "register susscess!" }))
      .catch((err) => res.status(500).json({ message: "register error!" }))
  },
  get_user: async(req, res, next) => {
    await action.get_info_user(req, res, next)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err)) 
  },
  insert_info_user: async(req, res) => {
    await action.insert_info_user(req)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(200).json({ message: "insert false!" }))
  }
}

module.exports = controller;