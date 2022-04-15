// app.js
const express = require('express');
const app = express();


// server logic 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// register static file serving middleware
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => console.log('Server running on port 3000'));


//node /Users/jennifertang/CS_Projects/ait/homework06-jen-tang/src/app.js