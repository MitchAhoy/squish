const mongoose = require('mongoose')
const Organisation = mongoose.model('organisation')
const User = mongoose.model('user')
const requireLogin = require('../middleware/requireLogin')

module.exports = (app) => {

    app.get('/api/fetch_organisations', requireLogin, async (req, res) => {
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

    app.post('/api/create_organisation', requireLogin, async (req, res) => {

        try {
            const { organisationName, organisationUsers } = req.body
            const parsedUsers = organisationUsers.split(',').filter(el => el.length > 0).map(el => el.replace(/ /g, '')).concat([req.user.email])
            const organisation = await new Organisation({
                organisationName,
                organisationUsers: parsedUsers,
                organisationOwner: req.user.email
            }).save()
            console.log(organisation)

            res.send(organisation)
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }

    })
}