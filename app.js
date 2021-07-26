const express = require('express')
const speech2text = require('./speech2text')
const app = express()
const port = 3000

app.get('/', speech2text)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})