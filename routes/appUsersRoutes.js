// const mongoose = require('mongoose')
// const User = mongoose.model('user')
// const requireLogin = require('../middleware/requireLogin')


// module.exports = (app) => {

//     app.get('/api/fetch_app_users', requireLogin, (req, res) => {
        
//         try {
//             const appUsers = User.find({})
//         } catch (err) {
//             console.log(err)
// 			res.status(400)
// 			res.send({ error: err })
// 			return
//         }
//     })
// }