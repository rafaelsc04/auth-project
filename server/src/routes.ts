import { Router, Response, Request } from "express";

import { Users } from "./controllers/User";

const router = Router();

router.use(Users);
router.use("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "Rota desconhecida." });
});

export { router as routes };
