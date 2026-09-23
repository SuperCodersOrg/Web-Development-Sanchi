module.exports = function process(req,res){
    if(req.session.username != 'admin' && req.session.password != 'admin'){
        res.send('Invalid credentials');
    }
    req.session.userid=req.session.username;
    res.redirect('/');
}
