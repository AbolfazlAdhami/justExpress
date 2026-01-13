module.exports = (req, res, next) => {
  if (req.user.type === "admin") {
    next();
    return;
  }

  return res.status(403).json({
    message: "You can't access this route",
    success: false,
  });
};
