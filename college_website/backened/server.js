const http=require('http');
const fs=require('fs');
const port=1100;

const server=http.createServer((req,res)=>{

    let parts = req.url.split('/');
    if(req.url === '/' || req.url === '/home'){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/home.html','utf8');
        res.end(data);
    }else if(req.url === '/about'){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/about.html','utf8');
        res.end(data);
    }else if(req.url === '/courses'){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/courses.html','utf8');
        res.end(data);
    }else if(parts[1] === 'courses'){
        if(parts[2]==='bca'){
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            let data = fs.readFileSync('../frontend/bca.html','utf8');
            res.end(data);
        }else if(parts[2]==='bba'){
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            let data = fs.readFileSync('../frontend/bba.html','utf8');
            res.end(data);
        }
        else if(parts[2]==='btech'){
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            let data = fs.readFileSync('../frontend/btech.html','utf8');
            res.end(data);
        }
        else if(parts[2]==='ai'){
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            let data = fs.readFileSync('../frontend/ai.html','utf8');
            res.end(data);
        }
    }else if(req.url === '/students'){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/students.html','utf8');
        res.end(data);
    }else if(parts[1]==='students'){
        if(parts[2]==='register' && req.method==='GET'){
            res.statusCode = 200;
            res.setHeader('Content-Type' ,'text/html');
            let data = fs.readFileSync('../frontend/form.html','utf8');
            res.end(data);
        }else if(parts[2]==='register' && req.method==='POST'){
            res.statusCode=200;
            res.end("Successfully registered");
        }
    }else if(req.url === '/contact'){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/contact.html','utf8');
        res.end(data);
    }else if(req.url === '/facilities'){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/facilities.html','utf8');
        res.end(data);
    }else if(req.url === '/placement'){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        let data = fs.readFileSync('../frontend/placement.html','utf8');
        res.end(data);
    }else{
        res.statusCode = 404;
        res.setHeader('Content-Type' , 'text/html');
        let data = fs.readFileSync('../frontend/unknown.html','utf8');
        res.end(data);
    }

});

server.listen(port,()=>{
    console.log("Server is running on port ",port);
})