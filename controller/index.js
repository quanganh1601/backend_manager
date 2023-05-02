const action = require("../action/index")

const controller = {
  get_student: async(req, res) => {
  await action.get_student
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err))
  },
  get_info_student: async(req, res) => {
    await action.get_info_student
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err))
  },
  get_bill_student: async(req, res) => {
    await action.get_bill_student
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json(err))
  },
  get_room: async(req, res) => {
    await action.get_room
      .then(async(result) => res.json(result)
      )
      .catch((err) => res.status(500).json(err));
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
  }
}

module.exports = controller;