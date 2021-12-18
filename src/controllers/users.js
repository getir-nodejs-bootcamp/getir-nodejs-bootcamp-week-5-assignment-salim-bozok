const { comparePassword, generateAuthToken } = require("../scripts/auth");
const { sendResetPasswordEmail } = require("../scripts/mail");
const {
  createToken,
  getToken,
  deleteAllTokens,
} = require("../services/tokens");
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

const updateUserController = async (req, res) => {
  try {
    const user = await getUser(req.payload._id);

    if (!user) {
      return res.status(404).send({ error: "user not found" });
    }

    const updates = Object.keys(req.body);

    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();

    const { password, ...userData } = user._doc;

    res.send({ user: userData });
  } catch (error) {
    console.log("an error occured while updating user", error);
    return res.status(500).json({ error: "something went wrong on our end" });
  }
};

const passwordResetTokenController = async (req, res) => {
  try {
    const user = await getUserByEmail(req.data.email);

    if (!user) {
      return res.status(404).send({ error: "user not found" });
    }

    const threeHours = 60 * 60 * 3 * 1000;

    const token = await createToken({
      userID: user._id,
      scope: "password_reset",
      ttl: threeHours,
    });

    sendResetPasswordEmail(user.email, user.name, token);

    // Send response with no content
    res.status(204).send();
  } catch (error) {
    console.log("an error occured while logging in user", error);
    return res.status(500).json({ error: "something went wrong on our end" });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const token = await getToken(req.data.token);

    if (!token) {
      return res.status(404).send({ error: "token not found" });
    }

    if (token.scope !== "password_reset") {
      return res.status(400).send({ error: "invalid token" });
    }

    if (token.expiresAt < Date.now()) {
      return res.status(400).send({ error: "token expired" });
    }

    const user = await getUser(token.user);

    if (!user) {
      return res.status(404).send({ error: "user not found" });
    }

    user.password = req.data.password;

    await user.save();

    await deleteAllTokens(user._id, "password_reset");

    res.send({ message: "password updated successfully" });
  } catch (error) {
    console.log("an error occured while resetting password", error);
    return res.status(500).json({ error: "something went wrong on our end" });
  }
};

module.exports = {
  createUserController,
  loginUserController,
  getUserController,
  updateUserController,
  passwordResetTokenController,
  resetPasswordController,
};
