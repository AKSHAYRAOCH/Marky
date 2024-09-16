import type { NextFunction, Request, Response } from "express";
import { DecodeToken } from "../utils/jwt";

export default async function AuthMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (req.cookies.authorization) {
		const token = DecodeToken(req.cookies.authorization);
		if (!token.email) {
			return res.status(401).json({
				message: "unauthorized request",
			});
		}

		next();
	} else {
		return res.status(401).json({
			message: "unauthorized request",
		});
	}
}
