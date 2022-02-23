// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// // const User = require("../models/user");

// interface IUser {
//     _id: string;
// }

// const auth = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = <string>req.headers["Authorization"] || req.query.token;
//         if (typeof token !== "string") throw new Error("Token must be a string");

//         const data = jwt.verify(token, process.env.TOKEN_SECRET || "");

//         // const user = await User.findOne({
//         //     _id: data._id,
//         //     "tokens.token": token,
//         // });

//         if (!user) throw new Error("User not found");

//         req.user = user;
//         req.token = token;
//         next();
//     } catch (err) {
//         res.status(403).send({
//             status: 403,
//             message: "Not authenticated",
//         });
//     }
// };

// export default auth;
