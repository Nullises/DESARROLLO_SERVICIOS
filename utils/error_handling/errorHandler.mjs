const forbidden = (request, response, next) => {
  const error = new Error("Credenciales inválidas");
  error.status = 401;
  response.json({
    status: error.status,
    message: error.message,
  });
  next();
};

const notFound = (request, response, next) => {
  const error = new Error("No encontrado");
  error.status = 404;
  response.json({
    status: error.status,
    message: error.message,
  });
  next();
};

export const errorHandler = {
  forbidden,
  notFound,
};
