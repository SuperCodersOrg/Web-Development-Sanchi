const express = require('express');
const app = express();
const router = require('./auth');

app.use(express.json());
app.use(express.static('public'));

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN  = 'refresh_token';

app.use(router);
app.get('/',(req,res)=>{
    return res.redirect('./index.html');
});

app.listen(2000,()=>{
    console.log(`Server is running on http://localhost:2000`);
})
