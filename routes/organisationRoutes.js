const mongoose = require('mongoose')
const Organisation = mongoose.model('organisation')
const Project = mongoose.model('project')
const Task = mongoose.model('task')
const requireLogin = require('../middleware/requireLogin')

module.exports = (app) => {

    app.get('/api/organisations', requireLogin, async (req, res) => {
        try {
            const organisations = await Organisation.find({organisationUsers: req.user.email}).exec()
            res.send(organisations)
            return
        } catch (err) {
            console.log(err)
            res.status(400)
            res.send({error: err})
            return
        }
    })

    app.post('/api/organisations', requireLogin, async (req, res) => {
        try {
            const { organisationName, organisationUsers } = req.body
            const parsedUsers = organisationUsers.split(',').filter(el => el.length > 0).map(el => el.replace(/ /g, '')).concat([req.user.email])
            const organisation = await new Organisation({
                organisationName,
                organisationUsers: parsedUsers,
                organisationOwner: req.user.email
            }).save()
            res.send(organisation)
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }
    })

    app.patch('/api/organisations/:id', requireLogin, async (req, res) => {
        try {
            const { id } = req.params
            const updates = req.body
            const result = await Organisation.findByIdAndUpdate({_id: id}, {$set: updates}, {new: true})
            res.send(result)
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }
    })

    app.patch('/api/organisation/:id/user/:user', requireLogin, async (req, res) => {
        try {
            const { id, user } = req.params
            const { action } = req.body
            let currentOrganisation = await Organisation.findOne({_id: id})
            if (action === 'remove') {
                const updatedUsers = currentOrganisation.organisationUsers.filter(_user => user !== _user)
                const result = await Organisation.findOneAndUpdate({_id: id}, {$set: {organisationUsers: updatedUsers}}, {new: true})
                res.send(result)
                return
            }
            if (action === 'add') {
                const result = await Organisation.findOneAndUpdate({_id: id}, {$addToSet: {organisationUsers: user}}, {new: true})
                res.send(result)
                return
            }
            res.send({})
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }
    })

    app.delete('/api/organisation/:id', requireLogin, async (req, res) => {
        try {
            const id = req.params.id
            const deleteOrganisation = await Organisation.deleteOne({_id: id})
            const deleteProjects = await Project.deleteMany({projectOrganisation: id})
            const deleteTasks = await Task.deleteMany({taskOrganisation: id})
            res.send({_id: id})
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }
    })

}