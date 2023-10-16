import bodyParser from "body-parser";
import express from "express";
import jwt from "jsonwebtoken";
import { autenticacionMiddleware } from "./authentication_middleware/auth.mjs";
import { errorHandler } from "./error_handling/errorHandler.mjs";
const app = express();
app.use(bodyParser.json());
const llaveSecreta = "miClaveSecreta";

app.post("/login", (request, response, next) => {
  const usuario = request.body.usuario;
  const contrasena = request.body.contrasena;

  if (usuario === "usuario" && contrasena === "contraseña") {
    const token = jwt.sign({ usuario }, llaveSecreta);
    response.json({ token });
  } else {
    errorHandler.forbidden(response, next);
  }
});

app.get("/acceso", autenticacionMiddleware, (request, response) => {
  response.json({
    message: "Has accedido con éxito",
    datos: request.datos,
  });
});

app.listen(3000, () => {
  console.log("La aplicación está corriendo en http://localhost:3000");
});
