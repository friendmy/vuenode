const express = require('express')
const logger = require('morgan')
const app = express()
const users = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Beck'},
  {id: 3, name: 'Chris'}
] // todo

app.get('/',(req, res) => res.send('Hello World!'))
app.get('/users',(req,res) => {

  req.query.limit = req.query.limit || 10
  const limit = parseInt(req.query.limit, 10)
  
  if(Number.isNaN(limit)) {
    res.status(400).end();
  }
  else{
    res.json(users.slice(0, limit))    
  }
})

app.get('/users/:id', (req, res) => {
  // id값을 얻어 낸다
  const id = parseInt(req.params.id, 0);
  // users 배열 조회
  if(Number.isNaN(id))  {
    res.status(400).end();
    return
  } 
  else {
    const user = users.filter(user => user.id === id)[0];
    if (!user)
    {
      res.status(404).end();
    }
    else{
      res.json(user);   
    } 
  }

  // 응답: res
})

module.exports = app


// const mw = (req, res, next) => {
//   //throw Error('error!')
//   next()
// }

// const errorMw = (err, req, res, next) => {
//   console.log(err.message);
//   next()  
// }

// app.use(logger('dev'))
// app.use(mw)
// app.use(errorMw)

// app.listen(3000, () => {
//   console.log('running');
// })




// const mw = (req, res, next) => {
//   console.log('mw!');
//   next()
// }

// const mw2 = (req, res, next) => {
//   console.log('mw2!');
//   next()
// }

// app.use(mw)
// app.use(mw2)

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   if(req.url === '/'){
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World\n');
//   } else if (req.url === '/users'){
//     const users = [
//       {name: 'Alice'},
//       {name: 'Beck'},
//     ]
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(users));    
//   }
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at hhtp://${hostname}:${port}/`);  
// });