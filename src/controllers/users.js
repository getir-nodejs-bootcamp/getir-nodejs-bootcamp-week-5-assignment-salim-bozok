const { comparePassword, generateAuthToken } = require("../scripts/auth");
const { createUser, getUserByEmail, getUser } = require("../services/users");
require("../services/tokens");

const createUserController = async (req, res) => {
  try {
    const user = await createUser(req.data);

    const { password, ...userData } = user._doc;

    res.status(201).send({ user: userData });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ errors: [{ email: "Email already exists" }] });
    }

    console.log("an error occured while creating user", error);
    return res.status(500).json({ error: "something went wrong on our end" });
  }
};

const loginUserController = async (req, res) => {
  try {
    const user = await getUserByEmail(req.data.email);

    if (!user) {
      return res.status(400).send({ error: "incorrect email or password" });
    }

    if (!comparePassword(user.password, req.data.password)) {
      return res.status(400).json({ error: "incorrect email or password" });
    }

    const token = generateAuthToken(user);
    res.send({ token });
  } catch (error) {
    console.log("an error occured while logging in user", error);
    return res.status(500).json({ error: "something went wrong on our end" });
  }
};

const getUserController = async (req, res) => {
  try {
    const user = await getUser(req.payload._id);

    res.status(200).send({ user });
  } catch (error) {
    console.log("an error occured while getting authenticated user", error);
    return res.status(500).json({ error: "something went wrong on our end" });
  }
};

const updateUserController = async (req, res) => {};

const passwordResetTokenController = async (req, res) => {};

const resetPasswordController = async (req, res) => {};

module.exports = {
  createUserController,
  loginUserController,
  getUserController,
  updateUserController,
  passwordResetTokenController,
  resetPasswordController,
};
