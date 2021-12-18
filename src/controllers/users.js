const { comparePassword, generateAuthToken } = require("../scripts/auth");
const { createUser, getUserByEmail } = require("../services/users");

const createUserController = async (req, res) => {
  try {
    const user = await createUser(req.data);

    delete user.password;

    res.status(201).send({ user });
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

const getUserController = async (req, res) => {};

const updateUserController = async (req, res) => {};

module.exports = {
  createUserController,
  loginUserController,
  getUserController,
  updateUserController,
};
