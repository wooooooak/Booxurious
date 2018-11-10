import express from "express";
import awsServerlessExpress from "aws-serverless-express";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import bodyParser from "body-parser";
import cors from "cors";

import api from "./router";
import { sequelize } from "./db";
import { sync } from "./db/sync";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

sequelize.authenticate().then(() => {
  sync();
});

app.use("/", api);

const binaryMimeTypes = [
  "application/javascript",
  "application/x-www-form-urlencoded",
  "application/json",
  "application/octet-stream",
  "application/xml",
  "font/eot",
  "font/opentype",
  "font/otf",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "text/comma-separated-values",
  "text/css",
  "text/html",
  "text/javascript",
  "text/plain",
  "text/text",
  "text/xml"
];

if (process.env.NODE_ENV === "development") {
  app.listen(8080, () => {
    console.log(`Express server listening on port 8080`);
  });
}
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
