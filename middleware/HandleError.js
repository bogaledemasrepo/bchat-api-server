module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  if (process.env.NODE_ENV === "produaction") {
    if (err.name === "CastError")
      res.res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      err: err,
      stack: err.stack,
    });
  }
};
