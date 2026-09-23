module.exports = function loginHandler(req,res){
    if(req.session.userid){
        return res.redirect('/');
    }
    res.setHeaders('Content-Type : text/html');
    res.write(`
       <h1>Login page</h1>
       <form action="/process-login" method="post">
            <input type="text" name="name" placeholder="Enter name"/>
            <input type="number" name="age" placeholder="Enter age"/>
            <button type="submit>Submit</button> 
       </form>
    `);
    res.end();
}