// src/controllers/user.controller.js
import AsyncHandler from "../utils/AsyncHandler.js";

const registerUser = AsyncHandler(async (req, res) => {
  console.log("Regester form existing")
  res.status(200).json({
    message: "✅ Register Form OK"
  });
});

export { registerUser };
