import Post from "../models/postModel.js";

const getPostController = async (req, res) => {
  const user_id = req.user._id;

  try {
    const posts = await Post.find({ user_id });
    return res.status(200).send({ posts });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const createPostController = async (req, res) => {
  const data = req.body;
  const _id = req.user._id;

  // check if content is not empty
  if (!data.content.trim()) return res.status(200).send("Content is required!");

  try {
    const newPost = await Post.create({ ...data, user_id: _id });
    return res
      .status(200)
      .send({ post: newPost, message: "Post created successfully" });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const deletePostController = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    return res.status(200).send({ post, message: "Post deleted successfully" });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const updatePostController = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const post = await Post.findByIdAndUpdate(id, data);
    return res.status(200).send({ post, message: "Post uptaded successfully" });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export {
  getPostController,
  createPostController,
  deletePostController,
  updatePostController,
};
