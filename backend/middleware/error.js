const errorMiddleware = (error, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const msg = error.message || "Something went wrong try again later";
  return res.status(statusCode).send({ msg: msg });
};

module.exports = errorMiddleware;
