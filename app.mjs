import bodyParser from "body-parser";
import express from "express";
import routes from "./routes/index.mjs";

const app = express();
app.use(bodyParser.json());

app.use(routes.authRouter);

app.listen(3000, () => {
  console.log("La aplicación está corriendo en http://localhost:3000");
});
