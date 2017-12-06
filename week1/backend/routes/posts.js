var express = require('express');
var bodyParser = require('body-parser');
var postRoutes = express.Router();
const https = require('https');
const options = {
  hostname: 'jsonplaceholder.typicode.com',
  port: 443,
  path: '/posts',
  method: 'GET'
};
const option = {
  hostname: 'jsonplaceholder.typicode.com',
  port: 443,
  path: '/users',
  method: 'GET'
};
postRoutes.get('/counter',function(req,res)
{
  authorname = ''
  posts = ''
  r = https.request(option ,function(resp)
  {
        console.log('STATUS:', +resp.statusCode);
        resp.on('data',function(chunk)
        {
        //  console.log('a new chunk',chunk)
          authorname += chunk
        });
        resp.on('end',function()
      {
        console.log('END GET REQUEST')
      });
  })
  r.on('error',function(err)
  {
        console.log('Error: ',err)
  })
  r.end()

  p = https.request(options ,function(resp){
    console.log('STATUS:', +resp.statusCode);
    resp.on('data',function(chunk)
    {
          //console.log('a new chunk',chunk)
      posts += chunk
    });
    resp.on('end',function()
    {
        var dict = []
        authorname = JSON.parse(authorname);
        posts = JSON.parse(posts);
        //console.log('STATUS:',resp.statusCode);
        for(var i=0;i<authorname.length;i++)
        {
          var name = authorname[i]["name"]
          var id = authorname[i]["id"]
          var count = 0
          for(var j=0;j<posts.length;j++)
          {
            if(posts[j]["userId"] == id)
            {
              count++;
            }
          }
          dict.push({
                        key:   name,
                        value: count
                    });
        }
        res.json(
            {
               "message" :
               {
                 "data" :  dict
               }
          })
      })
      console.log('END GET REQUEST')
      })
      p.on('error',function(err)
      {
        console.log('Error: ',err)
      })
      p.end()
    });
module.exports = postRoutes;
