const express = require('express')
const app = express()

app.get('/', (req, res) => res.sendFile(__dirname+'\\client\\index.html'))

app.listen(3000);