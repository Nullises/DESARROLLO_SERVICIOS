import express from "express";
import { errorHandler } from "../utils/error_handling/errorHandler.mjs";
const downloads = express.Router();

downloads.get("/txt/:file", (request, response, next) => {
  const file = `./assets/txt/${request.params.file}`;
  response.download(file, (error) => {
    if (error) {
      errorHandler.notFound(request, response, next);
    }
  });
});

export default downloads;
