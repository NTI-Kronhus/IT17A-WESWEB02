const port = 3000
const clientDir = __dirname + '\\client\\';

const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const myModule = require('./myModule')

app.use(express.json())
app.use(bodyParser.urlencoded())

app.get('/users', (requset, response) => {
    response.json(users)
  })

app.post('/users', async (requset, response) => {
    try {
        const hashedPassword = await bcrypt.hash(requset.body.password, 10)
        const user = { name: requset.body.name, password: hashedPassword }
        myModule.updateUserDb('ForumUsers', 'users', user)
        response.status(201).send()
    } catch {
        response.status(500).send()
    }
})
  
app.post('/users/login', async (requset, response) => {
    const user = users.find(user => user.name === requset.body.name)
    if (user == null) {
        return response.status(400).send('Cannot find user')
    }
    try {
        if(await bcrypt.compare(requset.body.password, user.password)) {
        response.send('Success')
        } else {
        response.send('Not Allowed')
        }
    } catch {
        response.status(500).send()
    }
})
  
app.post('/forum/postNewTopic', (requset, response) => {
    myModule.updateForumDb('Forum', 'test', requset.body)
    response.sendFile(clientDir + 'home-page.html')
})

// Static pages
app.get('/', (requset, response) => response.sendFile(clientDir + 'home-page.html'))
app.get('/contact', (requset, response) => response.sendFile(clientDir + 'contact.html'))
app.get('/codeofconduct', (requset, response) => response.sendFile(clientDir + 'codeofconduct.html'))
app.get('/testgame', (requset, response) => response.sendFile(clientDir + 'testgame.html'))
app.get('/forum-post', (requset, response) => response.sendFile(clientDir + 'forum-post.html'))

// JavaScripts
app.get('/client/testgame.js', (requset, response) => response.sendFile(clientDir + 'testgame.js'))

// Images
app.get('/img/niklas.jpeg', (requset, response) => response.sendFile(clientDir + 'niklas.jpeg'))
app.get('/img/become-a-good-programmer.jpeg', (requset, response) => response.sendFile(clientDir + 'become-a-good-programmer.jpg'))

// Stylesheets
app.get('/styles.css', (requset, response) => response.sendFile(clientDir + 'styles.css'))

// Default
app.get('*', (requset, response) => response.sendFile(clientDir + '404.html'))

// Start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))