const fs = require('fs');
const http=require('http');
const path=require('path');
const port=2000;

const frontendPath=path.join(__dirname,'index.html');
const dataPath=path.join(__dirname,'data.json');

let products=JSON.parse(fs.readFileSync(dataPath,'utf8'));

const server=http.createServer((req,res)=>{

    const url = new URL(req.url,`http://${req.headers.host}`);
    console.log(url);
    console.log(req.headers.host);
    console.log(req.url);

    if(url.pathname === '/products'){
        let result = [...products];

        let category = url.searchParams.get('category');
         let maxPrice = url.searchParams.get('maxPrice');

        if(category){
            result=result.filter(item=>item.category===category);
        }

        if(maxPrice){
            result=result.filter(item=>item.maxPrice===maxPrice);
        }
         
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(result));
        return;
    }


});

server.listen(port,()=>{
    console.log("server is running");
})