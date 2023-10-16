import express from "express";
const auth = express.Router();
import { autenticacionMiddleware } from "../utils/authentication_middleware/auth.mjs";
import { errorHandler } from "../utils/error_handling/errorHandler.mjs";
import jwt from "jsonwebtoken";
const llaveSecreta = "miClaveSecreta";

auth.post("/login", (request, response, next) => {
  const usuario = request.body.usuario;
  const contrasena = request.body.contrasena;

  if (usuario === "usuario" && contrasena === "contraseña") {
    const token = jwt.sign({ usuario }, llaveSecreta);
    response.json({ token });
  } else {
    errorHandler.forbidden(response, next);
  }
});

auth.get("/acceso", autenticacionMiddleware, (request, response) => {
  response.json({
    message: "Has accedido con éxito",
    datos: request.datos,
  });
});

export default auth;
