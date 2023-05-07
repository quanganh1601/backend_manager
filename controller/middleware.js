
const jwt = require("jsonwebtoken");
const db = require("../modal/connection");

const middleware = {
    verifyToken: (req, res, next) => {
      try {
        const token = req.cookies.token_3;
        const decoded = jwt.verify(token, "mk");
        db.query("select * from user where id = ?", [decoded], (err, result) => {
          if (err) res.json({ message: "error" });
          req.data = result;
          next();
        })
      } catch (error) {
        res.status(401).json("You're not authenticated");
      }
    },
    returnId: (req, res) => {
      try {
        const token = req.cookies.token_3;
        const decoded = jwt.verify(token, "mk");
        return decoded;
      } catch (error) {
        res.status(401).json("You're not authenticated");
      }
    },
    check_manager: (req, res, next) => {
      if (req.data[0].role == 1) next()
      else res.status(401).json({ message: "not authorization" })
    },
    check_admin: (req, res, next) => {
      if (req.data[0].role == 2) next()
      else res.status(401).json({ message: "not authorization" })
    }
}
module.exports = middleware