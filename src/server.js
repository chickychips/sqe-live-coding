const express = require('express')
const app = express()
const port = 3000
const controller = require("./controllers/index")
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

app.use(express.json());

app.use(bodyParser.json());

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({
      message: "UNAUTHORIZED"
    });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "UNAUTHORIZED"
      });
    }
    req.jwtUsername = decoded.username;
    next();
  });
};

app.post('/login', 
    controller.login)

app.get('/data', 
    verifyToken,
    controller.getData)
    
app.post('/data',  
  verifyToken,
  controller.postData)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})