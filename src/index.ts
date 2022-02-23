import express from "express";
import cors from "cors";
import axios from "axios";
import ReportsRouter from "./routers/ReportsRouter";
// import userRouter from "./routers/user";

const app = express();
const port = process.env.PORT || 23434;

app.use(express.json());
app.use(cors());
app.use(ReportsRouter);
// app.use(userRouter);

app.listen(port, () => {
    console.log("Server connected on port:", port);
});
