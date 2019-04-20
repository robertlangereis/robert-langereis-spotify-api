const bcrypt = require('bcrypt');
const { Router } = require('express')
const auth = require('./middleware')
const { toJWT } = require('./jwt')
const User = require('../users/model')
const router = new Router()

router.post('/tokens', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    if (!email && !password) {
            res.status(400).send({
            message: 'Please supply a valid email and password'
            })
        }
        User
        .findOne({
          where: {
            email: req.body.email
          }
        })
        .then(entity => {
          if (!entity) {
            res.status(400).send({
              message: 'User with that email does not exist'
            })
          }
          if (bcrypt.compareSync(req.body.password, entity.password)) {
            res.send({
              jwt: toJWT({ userId: entity.id })
            })
          }
          else {
            res.status(400).send({
              message: 'Password was incorrect'
            })
          }
        })
        .catch(err => {
          console.error(err)
          res.status(500).send({
            message: 'Something went wrong'
          })
        })
})

router.get('/tokens', auth, (req, res) => {
  res.send({
    message: `Thanks for verifying your membership ${req.user.email}.`,
  })
})

module.exports = router