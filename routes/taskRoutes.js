const mongoose = require('mongoose')
const Task = mongoose.model('task')
const requireLogin = require('../middleware/requireLogin')

module.exports = (app) => {

    app.get('/api/fetch_tasks', requireLogin, async (req, res) => {
        try {
            const tasks = await Task.find()
            res.send(tasks)
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }
    })

    app.post('/api/create_task', requireLogin, async (req, res) => {

        try {
            const { taskName, taskDescription, taskAssignee, taskPriority, taskDueDate, taskOrganisation, taskProject } = req.body
            const task = await new Task({
                taskName,
                taskDescription,
                taskAssignee,
                taskPriority,
                taskDueDate,
                taskCreatedBy: req.user._id,
                taskStatus: 'open',
                taskOrganisation,
                taskProject
            }).save()
            res.send(task)
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }

    })
}