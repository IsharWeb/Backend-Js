import { AsyncHandler } from "../utils/AsyncHandler.js";

const registerUser = AsyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Registration endpoint is working — functionality coming soon!",
  });
});

export { registerUser };
