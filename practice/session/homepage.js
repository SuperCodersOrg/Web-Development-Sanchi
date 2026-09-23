module.exports = function homeHandler(req,res){
    if(!(req.session.userid)){
        return res.redirect('/login');
    }
    res.headers('Content-Type:text/html');
    res.write(`
        <h1>Logout</h1>
        <h2>Welcome to the page</h2>
        <button type="submit">Logout</button>    
    `);
    res.end();
}