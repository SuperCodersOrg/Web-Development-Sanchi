const express=require('express');
const app=express();
const session=require('express-session');
const router=express.Router();

router.use(express.static("../public"));

const user = {
    student : { name : "ajay" ,role : "student" , password : "1234" },
    teaxher : { name : "prachi" , role : "teacher" , password : "3447" }
}

router.post('/signin',(req,res)=>{
    console.log(req.body);
    const {name , password , role} = req.body;
    console.log(name,password,role);

    if(!name || !password || !role){
        return res.send('Invalid');
    }

    if(user[name]){
        return res.send("User already exists");
    }

    user[name] = {
        password,
        role
    }

    req.session.name ={
        password,
        role
    }

    if(req.body.role == 'student'){
        res.redirect('./studeninfo.html');
    }
    else{
        res.redirect('./public/teacherinfo.html');
    }
});

module.exports=router;
