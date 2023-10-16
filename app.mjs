import bodyParser from "body-parser";
import express from "express";
import { router } from "./routes/index.mjs";
const app = express();

app.use(bodyParser.json());
// Main Routes
app.use("/", router.health);
app.use("/auth", router.authRouter);
app.use("/downloads", router.downloads);


app.listen(3000, () => {
  console.log("La aplicación está corriendo en http://localhost:3000");
});
