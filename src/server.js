const express = require('express')
const app = express()
const port = 3000
const controller = require("./controllers/index")

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept")
//     next()
// })

app.post('/login', (req, res) => {
    controller.login(req, res)
  })

app.get('/data', (req, res) => {
  res.send('Hello World!')
})

app.post('/data', (req, res) => {
    res.send('Hello World!')
  })

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})