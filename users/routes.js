const bcrypt = require('bcrypt');
const { Router } = require('express')
const User = require('./model')

const router = new Router()

router.post('/users', (req, res, next) => {
  User
   .create({email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10), passwordconfirmation: bcrypt.hashSync(req.body.passwordconfirmation, 10)})
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User does not exist`
        })
      }
      else if (req.body.password !== req.body.passwordconfirmation) {
        return res.status(400).send({
          message: `The Password confirmation does not match Password`
        })
      }
      return res.status(201).send(user)
    })
    .catch(error => next(error))
})


module.exports = router