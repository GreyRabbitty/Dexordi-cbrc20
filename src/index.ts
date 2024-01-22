// src/index.ts
import express, { Express, Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { Transfer, Transfer2 } from "./home/transfer";

import bodyParser = require("body-parser");

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();
const port = process.env.PORT || 8081;
app.use(bodyParser.json())
app.use(cors())

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/transfer", async (req: Request, res: Response) => {
  const tick = req.body.tick;
  const transferAmount = req.body.transferAmount;

  const payload = await Transfer({
    tick,
    transferAmount
  })

  res.send({
    msg: payload
  })
});

app.post("/transfer2", async (req: Request, res: Response) => {
  const tick = req.body.tick;
  const transferAmount = req.body.transferAmount;
  const destination = req.body.destination;

  res.send(req.body);
  return

  const payload = await Transfer2({
    tick,
    transferAmount,
    destination
  })

  res.send({
    msg: payload
  })
});

app.post("/test", (req, res) => {
  console.log("request ==> ", req)
  res.send(req.body)
});

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
