import express from "express";
import api from "./api";

const app = express();
const port = 3000;
const { sequelize } = require("../models");

app.use(express.json());
app.use("/api", api);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});