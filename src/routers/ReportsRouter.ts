import express from "express";
import axios from "axios";

const ReportsRouter = express.Router();

ReportsRouter.get("/", async (req, res) => {
    res.send("OK");
});

ReportsRouter.post("/report", async (req, res) => {

    try {
        const { url, vertical } = req.body?.data;

        console.log(url, vertical);

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

        const id = response.data.id;

        res.status(200).send(id);

    } catch (err: any) {

        res.status(400).send(err.message);
    }
});

export default ReportsRouter;
