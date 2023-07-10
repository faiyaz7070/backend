const express=require("express")
const {connection}=require("./db")
const loginrouter=require("./routes/user.routes")
const resrouter=require("./routes/restaurent")
const router=require("./routes/order")

const app=express()
app.use(express.json())



app.use(loginrouter)
app.use(resrouter)
app.use(router)


app.listen(3030,async()=>{
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
    console.log("listening on port 1000");
})