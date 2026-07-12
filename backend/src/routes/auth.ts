import express from "express";
const router = express.Router();

router.post("/auth/register-user", async (req, res) => {
  console.log(res);
});

export default router;
