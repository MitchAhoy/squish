const mongoose = require('mongoose')
const Task = mongoose.model('task')
const requireLogin = require('../middleware/requireLogin')

module.exports = (app) => {

    app.get('/api/fetch_tasks', requireLogin, async (req, res) => {
        try {
            const tasks = await Task.find({})
        } catch (err) {

        }
    })

    app.post('/api/create_task', requireLogin, async (req, res) => {

        try {
            const { taskName, taskDescription, taskAssignee, taskPriority, taskDueDate, taskTags } = req.body
            const parsedTags = taskTags.split(',').filter(el => el.length > 0) || taskTags
            const task = await new Task({
                taskName,
                taskDescription,
                taskAssignee,
                taskPriority,
                taskDueDate,
                taskTags: parsedTags,
                taskCreatedBy: req.user._id
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