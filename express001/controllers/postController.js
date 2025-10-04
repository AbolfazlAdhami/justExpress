const { posts } = require("../data/post");

// @desc  Get all Posts
// @route GET /api/posts
const getPosts = (req, res) => {
  const { limit, sort } = req.query;
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, parseInt(limit)));
  }
  return res.status(200).json(posts);
};
// @desc  Get post by id
// @route GET /api/posts/:id
const getPost = (req, res, next) => {
  const { id } = req.params;
  const post = posts.find((item) => item.id === parseInt(id));
  if (!post) {
    const error = new Error(`A post with id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  return res.json(post);
};

// @desc  Create New Post
// @route POST /api/posts
const creatPost = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    const error = new Error(`User not set a Title`);
    error.status = 400;
    return next(error);
  }
  const newPosts = {
    id: posts.length + 1,
    title,
  };

  res.json(newPosts);
};

// @desc    update a post by id
// @route   PUT /api/posts/:id
const updatePost = (req, res, next) => {
  const { body, params } = req;
  const { id } = params;
  const post = posts.find((item) => item.id === parseInt(id));

  if (!post) {
    const error = new Error(`A post with id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  const { title } = body;
  if (!title) {
    const error = new Error(`User not set a Title`);
    error.status = 400;
    return next(error);
  }
  post.title = title;
  return res.status(200).json(posts);
};
// @desc    delete a post by id
// @route   DELETE /api/posts/:id
const deletePost = (req, res, next) => {
  const { id } = req.params;
  const post = posts.find((item) => item.id === parseInt(id));
  if (!post) {
    const error = new Error(`A post with id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  return res.status(200).json(posts.filter((item) => item.id !== parseInt(id)));
};

module.exports = {
  getPosts,
  getPost,
  creatPost,
  deletePost,
  updatePost,
};
