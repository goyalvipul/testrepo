import path from "path";
import express from "express";
import * as OpenApiValidator from "express-openapi-validator";

import { v1 } from "./v1";

const app = express();
const port = process.env.PORT || 90;

app.use(express.json());

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, "v1", "openapi.yml"),
    validateRequests: true,
    validateResponses: true,
  }),
);
app.use("/v1", v1);

export function start() {
  app.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`);
  });
}
