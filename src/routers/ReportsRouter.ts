import express from "express";
import axios from "axios";
import Url from "../models/UrlsModel";


const ReportsRouter = express.Router();

ReportsRouter.get("/", async (req, res) => {
    res.send("OK");
});

ReportsRouter.post("/report", async (req, res) => {
    
    try {
        const reportingUser = req.body?.user;
        const { url, vertical, description } = req.body?.data;

        const dcServerUrl = process.env.DC_SERVER_URL || 'http://localhost:45610';
        if (!dcServerUrl) throw new Error("Missing dc server url");

        const response = await axios.post(
            dcServerUrl,
            {
                command: "job.create",
                data: {
                    scope: "default",
                    jobModule: "flagger-grabber",
                    jobType: "send-link",
                    executionData: {
                        url,
                    },
                    context: {
                        vertical: vertical,
                        ingestType: "link",
                    },
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.DC_SERVER_API_KEY}`,
                },
            }
        );

        const afJobId = response.data.id;

        const urlEntity = new Url({url, reportingUser, afJobId, description })

        await urlEntity.save();   

        res.status(200).send(afJobId);

    } catch (err: any) {

        res.status(400).send(err.message);
    }
});

export default ReportsRouter;
