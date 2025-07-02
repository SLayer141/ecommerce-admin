import { Router, Request, Response } from "express";
import { login,signup } from "../controller/auth.controller";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
	login(req, res);
});

router.post("/signup", (req: Request, res: Response) => {
	signup(req, res);
});

export default router;