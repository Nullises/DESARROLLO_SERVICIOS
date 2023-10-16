const forbidden = (response, next) => {
  const error = new Error("Credenciales inválidas");
  error.status = 401;
  response.json({
    status: error.status,
    message: error.message,
  });
  next();
};

export const errorHandler = {
  forbidden,
};
