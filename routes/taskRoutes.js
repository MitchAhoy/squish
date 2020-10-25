const mongoose = require('mongoose')
const Task = mongoose.model('task')
const requireLogin = require('../middleware/requireLogin')

module.exports = (app) => {

    app.get('/api/tasks', requireLogin, async (req, res) => {
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

    app.post('/api/tasks', requireLogin, async (req, res) => {

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

    app.patch('/api/tasks/:id', requireLogin, async (req, res) => {
        try {
            const id = req.params.id
            const updates = req.body
            const result = await Task.findByIdAndUpdate({_id: id}, {$set: updates}, {new: true})
            console.log(updates,result)
            res.send(result)
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }

    })

    app.delete('/api/tasks/:id', requireLogin, async (req, res) => {
        try {
            const id = req.params.id
            const result = await Task.deleteOne({_id: id}, {new: true})
            console.log(result)
            res.send({_id: id})
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }
    })
}