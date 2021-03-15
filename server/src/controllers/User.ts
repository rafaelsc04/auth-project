import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";

const router = Router();

dotenv.config();

// register a user
router.post("/register", async (req: Request, res: Response) => {
  const user = new User(req.body.username, req.body.password, req.body.email);
  const result = await user.register();
  if (result === undefined) {
    return res.status(200).send({ message: result });
  } else {
    return res.status(409).send({ message: result });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  const user = new User(req.body.username, req.body.password);
  // check if passwords match
  const match = await user.validatePassword();
  if (match === true) {
    // generating token
    const token: string = await jwt.sign(
      {
        data: user.username,
      },
      String(process.env.JWT_SECRET),
      { expiresIn: 60 * 60 }
    );
    // sending token
    res.send({ token: token });
  } else {
    res.status(401).send({ message: match });
  }
});

export { router as Users };
