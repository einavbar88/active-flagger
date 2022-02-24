import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const User = require("../models/UsersModel");


const auth = async (req: any, res: Response, next: NextFunction) => {
    try {

        const token = req.headers.authorization;
        if (typeof token !== "string") throw new Error("Token must be a string");

        const data : any = jwt.verify(token, process.env.TOKEN_SECRET || "");

        const user = await User.findOne({
            _id: data._id,
            "tokens.token": token,
        });

        if (!user) throw new Error("User not found");

        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(403).send({
            status: 403,
            message: "Not authenticated",
        });
    }
};

export default auth;
