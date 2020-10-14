const mongoose = require('mongoose')
const { Schema } = mongoose

const projectSchema = new Schema({
    projectName: String,
    projectDescription: String,
    projectUsers: [String],
    projectCreator: String,
    projectCreatedOn: Date
})

mongoose.model('project', projectSchema)