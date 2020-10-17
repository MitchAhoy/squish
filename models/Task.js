const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new Schema({
    taskName: String,
    taskDescription: String,
    taskAssignee: String,
    taskPriority: String,
    taskDueDate: Date,
    taskTags: [String]
})

mongoose.model('task', taskSchema)