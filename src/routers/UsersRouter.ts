import express from "express";
const User = require("../models/UsersModel");
import auth from "../middleware/auth";

const router = express.Router();

router.post("/login", async (req: any, res: any) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.status(200).send({ user, token });
    } catch (err: any) {
        res.status(400).send(err.message || err);
    }
});

router.post("/signup", async (req: any, res: any) => {
    try {
        const user = new User({ ...req.body });

        await user.save();

        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (err: any) {
        console.log(err);
        if (err.code === 11000 && Object.keys(err.keyValue).includes("email")) {
            return res.status(409).send({
                status: 409,
                message: "Email already registered",
            });
        }
        res.status(400).send(err);
    }
});

router.post("/logout", async (req: any, res: any) => {
    try {
        const user = req.user;
        user.tokens = user.tokens.filter((tokenObj: any) => tokenObj.token !== req.token);
        await user.save();
        res.status(200).send();
    } catch (err: any) {
        res.status(500).send(err.message);
    }
});

router.put('/update-user-stats', auth, async (req: any, res: any) => {
    const {_id, stats} = req
    try {
        const user = await User.findByIdAndUpdate({_id}, { ...stats }, {
            new: true,
        })
        if (!user)
            return res.status(404).send({
                status: 404,
                message: "No user!"
            })
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})


router.get('/user-stats', auth, async (req: any, res: any) => {
    try {
        const user = await User.findById({ _id: req._id });
        if (!user)
            return res.status(404).send({
                status: 404,
                message: "No user!"
            })
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
    })

export default router;
