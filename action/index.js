const { query } = require("express");
const db = require("../modal/connection");

const action = {
  get_student: new Promise((resolve, reject) => {
    const sql = "select * from student";
    db.query(sql, (err, result) => {
      if (err) reject(err)
      resolve(result);
    })
  }),
  get_info_student: new Promise((resolve, reject) => {
    const sql = 
      `select 
        student.name, 
        student.email, 
        room.name_room, 
        room.id
      from student 
      inner join room 
      on student.id_room = room.id`

    db.query(sql, (err, result) => {
      if (err) reject(err)
      resolve(result);
    })
  }),
  get_bill_student: new Promise((resolve, reject) => {
    const sql = 
      `select 
        bill_student.name_employee, 
        bill_student.amount_of_consumption, 
        bill_student.electric_price, 
        bill_student.amount_of_water, 
        bill_student.water_price, 
        bill_student.total_money, 
        student.name, 
        room.name_room
      from bill_student
      inner join student
      on bill_student.student_id = student.id
      inner join room
      on bill_student.room_id = student.id`

    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result)
    })
  }),
  get_room: new Promise((resolve, reject) => {
    const sql = 
    `select 
      p.id,
      p.name_room,
      json_array(
        (select GROUP_CONCAT(
          json_object(
            'id', id,
            'parent_id', name
          )
        ) 
        from student 
        where id_room = p.id)) as student
     from room p`;

    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result)
    })
  }),
  get_room_by_id: (req) => {
    const { id } = req.query;
    return new Promise((reslove, reject) => {
      const query = 
        `select 
          name_room,
          json_array((
            select group_concat(
              json_object("name", s.name)
            )
            from student s
            where s.id_room = room.id)
          ) as student
        from room
        where id = ${id}
        `
      db.query(query, (err, result) => {
        if (err) reject(err);
        reslove(result);
      })
    })
  },
  get_building: new Promise((resolve, reject) => {
    const query = 
      `Select name_building
      from building`;
    db.query(query, (err, result) => {
      if (err) reject(err);
      resolve(result);
    })
  })
};


module.exports = action;