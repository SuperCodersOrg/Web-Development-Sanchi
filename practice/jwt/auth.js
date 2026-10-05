const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended : true }));
router.use(express.static('public'));

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

    const token = jwt.sign(
        { name : user.name , email : user.email },
        'secretkey',
        // { expiresIn : '2h' }
    );

    console.log(token);
    res.json({ token });

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