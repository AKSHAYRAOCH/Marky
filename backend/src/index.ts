import  Express  from "express";
import MainRouter from "./routes/main";

const app = Express();

app.use("/api/v1",MainRouter);



app.listen(3000,()=>{
    console.log("running on port number 3000")
})








