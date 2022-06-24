import express from "express";
import api from "./api";
import { sequelize } from "../models";
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();
const port = 4000;

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));

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