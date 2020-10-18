const mongoose = require('mongoose')
const Project = mongoose.model('project')
const requireLogin = require('../middleware/requireLogin')

module.exports = (app) => {
    app.post('/api/create_project', requireLogin, async (req, res) => {
        const { projectName, projectDescription, projectUsers} = req.body
        const parsedUsers = projectUsers.split(',').filter(el => el.length > 0).map(el => el.replace(/ /g, '')).concat([req.user._id])
        try {
            const project = await new Project({
                projectName,
                projectDescription,
                projectUsers: parsedUsers,
                projectCreator: req.user.email,
                projectCreatedOn: new Date()
            }).save()
            res.send(project)
            return
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }
    })

    app.get('/api/fetch_projects', requireLogin, async (req, res) => {
        const projects = await Project.find({projectUsers: req.user.email}).exec()
        res.send(projects)
    })
}