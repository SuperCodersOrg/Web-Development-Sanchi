const express=require('express');
const router=express.Router();
const fs = require('fs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');

const senderEmail = 'sanchi.bareja2008@gmail.com';
const senderPass = 'uatc fiyd igjj fgkg';

router.use(express.static(path.join(__dirname,'public')));
router.use(express.urlencoded({ extended: true }));

const isAuthenticated = (req,res,next)=>{
    if(req.session && req.session.user){
        console.log("click");
        return next();
    }
    return res.redirect("./login.html");
}

let users = require('./data/users.json');

router.get('/login',(req,res)=>{
    res.redirect('./login.html');
});

router.get('/signin',(req,res)=>{
    res.redirect('./signin.html');
});

router.get('/forget-password',(req,res)=>{
    res.redirect('./forget-pass.html');
});

router.post('/forget-password',async (req,res)=>{
    const { email : recipientEmail } = req.body;
    if(!recipientEmail){
        res.send("Please provide your email");
        return;
    }

    const mailTransporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : senderEmail,
            pass : senderPass
        }
    });

    const user = users.users.find(user => user.email === recipientEmail);
    if(user){
        const token = crypto.randomBytes(32).toString('hex');
        const resetLink = `http://localhost:3300/reset-password/${token}`;
        
        console.log(token);
        console.log(resetLink);

        user.resetToken = token;
        user.tokenExpiresAt = Date.now() + 3600000;

        fs.writeFileSync(
            './data/users.json',
            JSON.stringify(users,null,4)
        );

        try{
            await mailTransporter.sendMail({
                from : senderEmail,
                to : user.email,
                subject : 'Reset your password',
                text : `Click the link below to reset your passoword : ${resetLink}`,
                html : `<h2>Click the link below to reset your passoword : <p>${resetLink}</p></h2>`,
            });
        }
        catch(error){
            delete user.resetToken;
            delete user.tokenExpiresAt;

            fs.writeFileSync(
                './data/users.json',
                JSON.stringify(users,null,4)
            );

            res.send("Could not send reset password email: ",error.message);
        }

        res.send(`Reset password email has been sent to your email: ${user.email}`);
    }
});

router.get('/reset-password/:token',(req,res)=>{
    const { token } = req.params ;
    const user = users.users.find(user => user.resetToken === token);
    console.log(user);
    if(!user){
        res.send('Invalid token');
    } 
    return res.sendFile(path.join(__dirname,'public/reset-pass.html'));
});

router.post('/reset-password/:token',async (req,res)=>{
    const { token } = req.params ;
    const user = users.users.find(user => user.resetToken === token);
    if(user){
        const { newPassword , confirmPassword} = req.body;
        console.log(newPassword + " " , confirmPassword);
        if(!newPassword || !confirmPassword){
           return res.send("Please provide password to reset");
        }
    
        user.password = newPassword;
        delete user.resetToken;
        delete user.tokenExpiresAt;

        fs.writeFileSync(
            './data/users.json',
            JSON.stringify(users,null,4)
        )

        res.sendFile(path.join(__dirname,'public/login.html'));
    }
});

router.post('/signin',(req,res)=>{
    console.log(req.body);
    const {name , email , password , role} = req.body;
    console.log(name,email,password,role);

    if(!name || !email || !password || !role){
        return res.send('Fill out all details');
    }

    const existuser = users.users.find(user => user.email === email);
    if(existuser){
        return res.send('User already exists');
    }

    users.users.push({
        name,
        email,
        password,
        role
    });

    fs.writeFileSync(
        './data/users.json',
        JSON.stringify(users, null, 4)
    );

    req.session.user={
        name,
        email,
        role
    }

    res.redirect('/login');

});

router.post('/login',(req,res)=>{
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.send('Fill out all details');
    }

    const user = users.users.find(user => user.email === email && user.password === password && user.role === role && user.name === name);

    if (!user) {
        return res.send(`Wrong details <a href="/login">Login again</a>`);
    }

    req.session.user = {
        name: user.name,
        email: user.email,
        role: user.role
    };

    if(user.role === 'student'){
        res.redirect('/student/info');
    }
    else if(user.role === 'teacher'){
        res.redirect('/teacher/info');
    }

});

router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/index.html');
    });
});

module.exports={
    router,
    isAuthenticated
};
