const passport = require('passport')
const mongoose = require('mongoose')
const Project = mongoose.model('project')

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }))

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/dashboard')
        }
        )

    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })

    app.get('/api/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

    app.get('/api/init_session', async (req, res) => {
        const user = req.user
        const projects = await Project.find({projectUsers: req.user.email}).exec()
        res.send({user, projects})
    })
}