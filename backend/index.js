const express=require('express');
const app=express();
const cors=require('cors');
const cookieparser=require('cookie-parser');
const dbconnect=require('./config/database');
const router=require('./routes/route');
require('dotenv').config();
const PORT=process.env.PORT;



app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieparser());
app.use(router);

app.get('/',(req,res)=>{
    res.send("Helloooo....")
})

  
dbconnect();

app.listen(PORT,()=>{
    console.log(`APP IS RUNNING ON PORT ${PORT}`)
});
