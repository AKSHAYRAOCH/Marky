import  Express  from "express";
import UserRouter from "./user";


const MainRouter = Express.Router();

MainRouter.get("/",(req,res)=>{
    res.send("hello world")
})

MainRouter.use("/user",UserRouter);
export default MainRouter;