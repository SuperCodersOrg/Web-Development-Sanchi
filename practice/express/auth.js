const express=require('express');
const app=express();
const session=require('express-session');
const router=express.Router();
const path=require('path');

router.use(express.static("../public"));
router.use(express.urlencoded({ extended: true }));

const isAuthenticated = (req,res,next)=>{
    if(req.session && req.session.user){
        return next();
    }
    return res.redirect("./login.html");
}

const users = {
    student : { name : "ajay" ,role : "student" , password : "1234" },
    teacher : { name : "prachi" , role : "teacher" , password : "3447" }
}

router.get('/login',(req,res)=>{
    res.redirect('./login.html');
});

router.get('/signin',(req,res)=>{
    res.redirect('./signin.html');
});

router.post('/signin',(req,res)=>{
    console.log(req.body);
    const {name , password , role} = req.body;
    console.log(name,password,role);

    if(!name || !password || !role){
        return res.send('Fill out all details');
    }

    if(users.student.name === name){
        return res.send("User already exists");
    }else if(users.teacher.name === name){
        return res.send("User already exists");
    }

    users[role] = {
        name,
        password,
        role
    }

    req.session.user={
        name,
        role
    }

    res.redirect('/login');

});

router.post('/login',(req,res)=>{
    console.log(req.body);
    const name = { name : req.body.name , password : req.body.password , role : req.body.role}; 
    console.log(name);
    const user = name;

    if(!user && user.password != password){
        // req.session.name = name;
        // req.session.role = user.role;
        res.send(`Wrong details <a href="/signin">Login again</a>`)
    }

    req.session.user = {
        name,
        role: user.role
    };
    
    console.log(user.role);

    if(user.role === 'student'){
        res.redirect('/student/info');
    }
    else if(user.role === 'teacher'){
        res.redirect('/teacher/info');
    }
});

router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.sendFile(path.join(__dirname,'..','public','index.html'))
    });
});

module.exports={
    router,
    isAuthenticated
};
