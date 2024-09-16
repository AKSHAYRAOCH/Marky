import { z } from "zod";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { Users } from "../db/schema";
import compare from "../utils/compare";
import type { Request, Response } from "express";
import { generateAccessToken } from "../utils/jwt";

const RegisterSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string().min(8, { message: "enter minimum 8" }),
});

const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, { message: "enter minimum 8" }),
});

type Register = z.infer<typeof RegisterSchema>;

type Login = z.infer<typeof LoginSchema>;

export async function LoginController(req: Request, res: Response) {
	const { success, error } = LoginSchema.safeParse(req.body);
	const Data: Login = req.body;
	if (!success) {
		return res.status(400).json({
			error,
		});
	}
	const exist = await db.query.Users.findFirst({
		where: eq(Users.email, Data.email),
	});
	if (!exist) {
		return res.status(400).json({
			message: "user not found",
		});
	}
	if (
		compare(exist.email, Data.email) &&
		compare(exist.password, Data.password)
	) {
		return res
			.cookie("authorization", generateAccessToken(Data.email), {
				maxAge: 900000,
				httpOnly: true,
				secure: true,
			})
			.json({
				message: "login sucessfull",
			});
	}
}

export async function RegisterController(req: Request, res: Response) {
	const { success, error } = RegisterSchema.safeParse(req.body);
	const Data: Register = req.body;
	if (!success) {
		return res.status(400).json({
			error,
		});
	}
	const exist = await db.query.Users.findFirst({
		where: eq(Users.email, Data.email),
	});
	if (exist) {
		return res.status(400).json({
			message: "user already exists",
		});
	}
	try {
		await db.insert(Users).values(Data);
		return res.json({
			message: "user created sucessfully",
		});
	} catch (err) {
		return res.status(400).json({
			message: err,
		});
	}
}
