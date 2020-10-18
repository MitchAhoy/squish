const mongoose = require('mongoose')
const Organisation = mongoose.model('organisation')
const User = mongoose.model('user')
const requireLogin = require('../middleware/requireLogin')

module.exports = (app) => {

    app.get('/api/fetch_organisations', requireLogin, async (req, res) => {
        try {
            const organisations = await Organisation.find({organisationUsers: req.user._id}).exec()
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
            const parsedUsers = organisationUsers.split(',').filter(el => el.length > 0).map(el => el.replace(/ /g, '')).concat([req.user._id])
            const usersArr = []
            for (let i = 0; i < parsedUsers.length; i++) {
                let userObject = {}
                let tempUser = await User.find({email: parsedUsers[i]})
                userObject[parsedUsers[i]] = tempUser._id
                usersArr.push(userObject)
            }
            console.log(usersArr)

            const organisation = await new Organisation({
                organisationName,
                organisationUsers: usersArr,
                organisationOwner: req.user._id
            }).save()

            // parsedUsers.forEach(user => {
            //     let updatedUser = await User.findOneAndUpdate({_id: user.id}, {...user, organisations: {[organisationName]: organisation._id }}, {new: true}, (err, updated) => console.log(err, updated))
            // })
            console.log(updateUserOrganisation)
            res.send(organisation)
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }

    })
}