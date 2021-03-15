import { Router } from "express";

import { Users } from "./controllers/User";

const router = Router();

router.use(Users);

export { router as routes };
