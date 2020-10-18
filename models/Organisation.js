const mongoose = require('mongoose')
const { Schema } = mongoose

const organisationSchema = new Schema({
    organisationName: String,
    organisationUsers: [String]
})

mongoose.model('organisation', organisationSchema)