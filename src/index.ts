import express from "express";
import cors from "cors";
import ReportsRouter from "./routers/ReportsRouter";
import UsersRouter from "./routers/UsersRouter";

require('./db/mongoose');

const app = express();
const port = process.env.PORT || 23434;

app.use(express.json());
app.use(cors());
app.use(ReportsRouter);
app.use(UsersRouter);

app.listen(port, () => {
    console.log("Server connected on port:", port);
});
