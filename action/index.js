const { query } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../modal/connection");
const middleware = require("../controller/middleware");
const LIMIT = 2;

const action = {
  get_student: new Promise((resolve, reject) => {
    const sql = "select * from user";
    db.query(sql, (err, result) => {
      if (err) reject(err)
      resolve(result);
    })
  }),
  get_info_student: (req) => {
    let page = req.query.page;
    const offset = (page - 1) * LIMIT;
    return new Promise((resolve, reject) => {
      const sql = 
        `select
          user.name, 
          user.email, 
          room.name_room,
          room.id
        from user
        inner join room
        on user.id_room = room.id
        limit ${LIMIT}
        offset ${offset}`

      const sqlTotal =
        `select count(id) as total
        from user`
  
      db.query(sqlTotal, (err, res) => {
        if (err) reject(err);
        db.query(sql, (err, result) => {
          if (err) reject(err)
          const total = res[0].total;
          resolve({
            data: result,
            total,
            limit: LIMIT
          });
        })
      })
    })
  },
  get_bill_student: new Promise((resolve, reject) => {
    const sql = 
      `select 
        bill_student.name_employee, 
        bill_student.amount_of_consumption, 
        bill_student.electric_price, 
        bill_student.amount_of_water, 
        bill_student.water_price, 
        bill_student.total_money, 
        user.name,
        room.name_room
      from bill_student
      inner join user
      on bill_student.student_id = user.id
      inner join room
      on bill_student.room_id = user.id`

    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result)
    })
  }),
  get_room: (req) => {
    let page = req.query.page;
    page = parseInt(page) || false;
    page = (page < 0 || !page) ? 1 : page;
    const offset = (page - 1) * LIMIT;

    return new Promise((resolve, reject) => {
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
          from user 
          where id_room = p.id)) as user
       from room p
       LIMIT ${LIMIT}
       OFFSET ${offset}`;
  
      db.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result)
      })
    })
  },
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
            from user s
            where s.id_room = room.id)
          ) as user
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
  }),
  sigIn: (req) => {
    const { email, password } = req.body;
    return new Promise((reslove, reject) => {
      const query = 
        `Select * 
        from login 
        where email = ?`

      const queryUser = `
        Select *
        from user
        where email = ?`

      db.query(query, [email], ((err, result) => {
        if (err) reject(err);
        const match = result[0] && bcrypt.compareSync(`${password}`, result[0].password)
        if(match) {
          const token = jwt.sign(result[0].id, "mk");
          db.query(queryUser, [email], ((err, result) => {
            if (err) reject(err)
            reslove({
              message: "login success!",
              token,
              role: result[0]?.role || 0
            })
          }))
        }
        else reject({ message: "login false !" })
      }))
    });
  },
  register: (req) => {
    let { user_name, email, password, enter_password } = req.body;
    password = bcrypt.hashSync(password, 10);

    return new Promise((reslove, reject) => {
      const query =
        `insert into login(user_name, email, password, enter_password)
        values("${user_name}", "${email}", "${password}", "${enter_password}")`
        db.query(query, (err, result) => {
          if (err) reject(err);
          reslove(result);
        })
    })
  },
  get_info_user: (req, res, next) => {
    return new Promise((reslove, reject) => {
      const id = req.data[0].id;
      const query = 
        `Select user.*, room.name_room
        from user
        left join room
        on user.id_room = room.id
        where user.id = ?`
      db.query(query, [id],(err, result) => {
        if (err) reject(err);
        reslove(result);
      })
    })
  },
  insert_info_user: (req, res, next) => {
    const {
      name,
      gender,
      yearn_of_bỉrth,
      phone,
      email,
      conscious,
      district,
      role,
      avatar
    } = req.body;
    let status = 1;
    if (req.data[0]?.role != 0)
      // 2 susscess!
      status = 2;
    const data = [
      name,
      gender,
      yearn_of_bỉrth,
      phone,
      email,
      conscious,
      district,
      role,
      avatar,
      status
    ];
    const query =
      `insert into user(name, gender, yearn_of_birth, phone, email, conscious, district, role, avatar, status) 
      values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
      db.query(query, data, ((err, result) => {
        if (err) reject(err);
        resolve(result);
      }))
    })
  }
}

module.exports = action;