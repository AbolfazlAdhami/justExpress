const notFound = (req, res, next) => {
  const error = new Error("Not Found");
  console.log(error.stack);
  error.status = 404;
  next(error);
};

module.exports = notFound;
