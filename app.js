const fastify = require("fastify")();
const jwt = require("@fastify/jwt");
const path = require("path");
const fs = require("fs");

fastify.get("/descargar", (request, response) => {
  const { file } = request.query;
  response.header("Content-Disposition", `attachment; filename=${file}`);
  response.type("application/txt");
  const archivoStream = fs.createReadStream(
    path.join(__dirname, "assets/txt", file)
  );
  console.log(archivoStream);
  response.send(archivoStream);
});

fastify.register(jwt, { secret: "miClaveSecreta" });

fastify.decorate("autenticar", async function (request, response) {
  try {
    await request.jwtVerify();
  } catch (error) {
    response.send(error);
  }
});

async function VerificarCredenciales(usuario, contrasena) {
  return usuario === "admin" && contrasena === "contraseña";
}

fastify.post("/login", async (request, response, next) => {
  const { usuario, contrasena } = request.body;

  const isValid = await VerificarCredenciales(usuario, contrasena);

  if (!isValid) {
    return response.status(401).send({ mensaje: "Credenciales no válidas" });
  }

  const token = await fastify.jwt.sign({ usuario });
  response.send({ token });
});

fastify.get(
  "/acceso",
  { preValidation: fastify.autenticar },
  async (request, response) => {
    response.send({ mensaje: "¡Le damos la bienvenida!" });
  }
);

fastify.listen({ port: 3001 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("La aplicación está corriendo en http://localhost:3001");
});
