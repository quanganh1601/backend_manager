const express = require("express");
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require("./router");
const middleware = require("./controller/middleware")
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());
app.use("/api", middleware.verifyToken, router);
app.use(router);

app.listen(3000, () => console.log("app listen port 3000"));