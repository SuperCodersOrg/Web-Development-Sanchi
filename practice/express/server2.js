const express=require('express');
const app=express();
const port = 1000;

app.use((req,res,next)=>{
    console.log("A");
    next();
    // console.log("F");
});

app.use((req,res,next)=>{
    console.log("B");
    next();
})

app.get('/user',(req,res,next)=>{
    console.log("C");
    next();
})

app.use((req,res,next)=>{
    console.log("E");
    next();
})

app.get('/user',(req,res,next)=>{
    console.log("D");
    res.send("hello");
    next();
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})