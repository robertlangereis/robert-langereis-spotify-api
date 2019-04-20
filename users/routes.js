const bcrypt = require('bcrypt');
const { Router } = require('express')
const User = require('./model')

const router = new Router()

router.post('/users', (req, res, next) => {
  if (req.body.password !== req.body.passwordconfirmation){
    return res.status(400).send({
      message: `The Password confirmation submitted does not match Password`
    })}
    else 
  User
    .create({email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),passwordconfirmation: 'match'})
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

// router.get('/users/:id/', (req, res, next) => {
//     User
//       .findByPk(req.params.id, { include: [{ all: true, nested: true }] })
//       .then(user => {
//         if (!user) {
//           return res.status(404).send({
//             message: `User does not exist`
//           })
//         }
//         return res.status(200).send(user)
//       })
//       .catch(error => next(error))
//   })

module.exports = router