var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();



app.use(morgan('dev'));
var posts = require('./routes/posts');
app.use('/posts',posts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/' , function(req,res)
{
    res.send('hello world- abhilasha');
})

app.listen(8080,function()
{
    console.log('server listen on port 8080');
})
