import Express from "express";
import MainRouter from "./routes/main";
import cookieParser from "cookie-parser";
const app = Express();
app.use(cookieParser());
app.use(Express.json());
app.use("/api/v1", MainRouter);

app.listen(3000, () => {
	console.log("running on port number 3000");
});
