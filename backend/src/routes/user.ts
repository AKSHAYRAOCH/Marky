import Express from "express";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { Users } from "../db/schema";
import { DecodeToken } from "../utils/jwt";
import AuthMiddleware from "../middlewares/authmiddleware";
import {
	LoginController,
	RegisterController,
} from "../controllers/UserControllers";

const UserRouter = Express.Router();

UserRouter.get("/", AuthMiddleware, async (req, res) => {
	const token = DecodeToken(req.cookies.authorization);
	const exist = await db.query.Users.findFirst({
		where: eq(Users.email, token.email),
	});
	res.send(exist);
});

UserRouter.post("/login", LoginController);

UserRouter.post("/register", RegisterController);

export default UserRouter;
