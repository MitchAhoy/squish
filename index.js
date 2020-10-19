const express = require('express')
const mongoose = require('mongoose')
require('./models/User')
require('./models/Project')
require('./models/Task')
require('./models/Organisation')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./services/passport')


const app = express()

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  }).catch(err => console.log(err))

app.use(express.json())

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)
// require('./routes/appUsersRoutes')(app)
require('./routes/projectRoutes')(app)
require('./routes/taskRoutes')(app)
require('./routes/organisationRoutes')(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000 
app.listen(PORT)