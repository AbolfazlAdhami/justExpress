function queryRequired(req, res, next) {
  const searchTerm = req.query.query;
  if (!searchTerm) {
    res.json({ msg: "Query is required." });
  } else {
    next();
  }
}
function requireJSON(req, res, next) {
  if (!req.is("application/json")) {
    res.json({ msg: "Content type must be application/json" });
  } else {
    next();
  }
}

module.exports = { queryRequired, requireJSON };
