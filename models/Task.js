const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new Schema({
    taskName: String,
    taskDescription: String,
    taskAssignee: String,
    taskPriority: String,
    taskDueDate: Date,
    taskOrganisation: String,
    taskProject: String,
    taskStatus: String
})

mongoose.model('task', taskSchema)