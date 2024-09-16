import jwt, { type JwtPayload } from "jsonwebtoken";
const secret: jwt.Secret = process.env.TOKEN_SECRET
	? process.env.TOKEN_SECRET
	: "hello";
export function generateAccessToken(email: string) {
	return jwt.sign({ email }, secret, { expiresIn: "3000s" });
}

export function DecodeToken(token: string) {
	return jwt.verify(token, secret) as JwtPayload;
}
