import  Express  from "express";

const UserRouter = Express.Router();

UserRouter.get("/",(req,res)=>{
    res.send("this route will tell who you are")
})

UserRouter.post("/login",(req,res)=>{
    res.send()
})

UserRouter.post("/register",(req,res)=>{
    res.send()
})

export default UserRouter;