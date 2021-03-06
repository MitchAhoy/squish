const mongoose = require('mongoose')
const Project = mongoose.model('project')
const Task = mongoose.model('task')
const requireLogin = require('../middleware/requireLogin')

module.exports = (app) => {
    app.post('/api/projects', requireLogin, async (req, res) => {
        const { projectName, projectDescription, projectUsers, projectOrganisation} = req.body
        const parsedUsers = projectUsers.split(',').filter(el => el.length > 0).map(el => el.replace(/ /g, '')).concat([req.user.email])
        try {
            const project = await new Project({
                projectName,
                projectDescription,
                projectUsers: parsedUsers,
                projectCreator: req.user.email,
                projectCreatedOn: new Date(),
                projectOrganisation
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

    app.get('/api/projects', requireLogin, async (req, res) => {
        const projects = await Project.find({projectUsers: req.user.email}).exec()
        res.send(projects)
    })

    app.patch('/api/projects/:id', requireLogin, async (req, res) => {
        try {
            const id = req.params.id
            const updates = req.body
            const result = await Project.findByIdAndUpdate({_id: id}, {$set: updates}, {new: true})
            res.send(result)
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }
    })

    app.delete('/api/projects/:id', requireLogin, async (req, res) => {
        try {
            const id = req.params.id
            const deleteProject = await Project.deleteOne({_id: id}, {new: true})
            const deleteTasks = await Task.deleteMany({taskProject: id})
            res.send({_id: id})
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }
    })
}