const errHandler = (err, req, res, next) => {
  const status = res.status.statusCode ? res.status.statusCode : 500;
  res.status(status);
  res.json({
    err: err.message,
    stack: process.env.NODE_ENV === "DEVELOPMENT" ? err.stack : null,
  });
};

module.exports = {
  errHandler,
};
