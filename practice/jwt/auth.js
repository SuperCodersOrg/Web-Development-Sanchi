const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');
const cookie_parser = require('cookie-parser');
require('dotenv').config();

router.use(cookie_parser());
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended : true }));
router.use(express.static('public'));

// const ACCESS_TOKEN = 'access_token';
// const REFRESH_TOKEN  = 'refresh_token';

const authenticate = ((req,res,next)=>{
    const token = req.cookies.accessToken;
    // console.log(token);

    if(!token){
        return res.send("Can't find token");
    }

    try{
        const verified = jwt.verify(token,process.env.ACCESS_TOKEN);
        const decoded = jwt.decode(token);
        console.log(decoded);
        req.user = verified;
        next();           
    }
    catch(error){
        res.redirect('/refresh');
    }
});

router.get('/profile',authenticate,(req,res)=>{
    return res.redirect('./profile.html');
});

router.get('/refresh',(req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    // console.log(refreshToken);
    if(!refreshToken){
        console.log("cookie side");
        return res.status(401).send('Invalid token');
    }

    try {
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN);
        console.log("Decoded : ",decoded);

        let accessToken = jwt.sign(
            { name : decoded.name , email : decoded.email },
            process.env.ACCESS_TOKEN,
            { expiresIn : '20s' }
        );

        console.log("New token :",accessToken);
        res.cookie('accessToken',accessToken);
        res.send('Access token generated');
    }
    catch(error) {
        console.log("server side");
        res.status(401).send('Invalid token');
    }
});

router.get('/login',(req,res)=>{
    return res.redirect('./login.html');
});

router.get('/signin',(req,res)=>{
    return res.redirect('./signin.html');
});

router.post('/login',(req,res)=>{
    console.log(req.body);
    const { name , email , password , role } = req.body;

    let currentData = fs.readFileSync('./data/users.json');
    const user = JSON.parse(currentData).find(user => user.name === name && user.password === password && user.role === role && user.email === email );

    if(!user){
        return res.send("User with the given details couldn't found");
    }

    const accessToken = jwt.sign(
        { name : user.name , email : user.email },
        process.env.ACCESS_TOKEN,
        { expiresIn : '20s' }
    );

    const refreshToken = jwt.sign(
        { name : user.name , email : user.email },
        process.env.REFRESH_TOKEN,
        { expiresIn : '60s' }
    );

    // console.log(accessToken);
    // console.log(refreshToken);

    res.cookie('accessToken',accessToken);
    res.cookie('refreshToken',refreshToken);

    res.send('Token generated successfully');
});

router.post('/signin',(req,res)=>{
    console.log(req.body);
    const { name , email , password , role } = req.body;

    if(!name ||!email || !password || !role){
        return res.send("Please provide all the fields");
    }

    let currentData = fs.readFileSync('./data/users.json');
    const user = JSON.parse(currentData).find(user => user.name === name && user.password === password && user.role === role && user.email === email );

    if(user){
        return res.send("User with the given details already exists");
    }

    let newUser = {
        name : name,
        email : email,
        password : password,
        role : role
    };

    let current = fs.readFileSync('./data/users.json');
    current = JSON.parse(current);
    current.push(newUser);
    fs.writeFileSync('./data/users.json',JSON.stringify(current,null,4));
});

module.exports = router;