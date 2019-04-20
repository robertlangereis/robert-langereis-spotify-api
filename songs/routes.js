const { Router } = require('express')
const Song = require('./model')
const Playlists = require('../playlists/model')
const auth = require('../auth/middleware')

const router = new Router()

// router.get('/songs', (req, res, next) => {
//   const limit = req.query.limit || 5
//   const offset = req.query.offset || 0

//   Promise.all([
//     Song.count(),
//     Song.findAll({ limit, offset })
//   ])
//     .then(([total, songs]) => {
//       res.send({
//         songs, total
//       })
//     })
//     .catch(error => next(error))
// })

router.get('/playlists/:id/', (req, res, next) => {
  Song
    .findByPk(req.params.id,  auth, { include: [{ all: true, nested: true }] })
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return res.send(song)
    })
    .catch(error => next(error))
})

// * `POST /playlists/:id/songs`: A user should be able to add songs to their playlists. A song has:
// * A title
// * An artist (name)
// * An album (title)
// * A song can only be on one playlist.

router.post('/playlists/:id/songs', auth, (req, res, next) => {
  Song
    .create(req.body)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return res.status(201).send(song)
    })
    .catch(error => next(error))
})

// router.put('/songs/:id', (req, res, next) => {
//   Song
//     .findById(req.params.id)
//     .then(song => {
//       if (!song) {
//         return res.status(404).send({
//           message: `Song does not exist`
//         })
//       }
//       return song.update(req.body).then(song => res.send(song))
//     })
//     .catch(error => next(error))
// })

// router.delete('/songs/:id', (req, res, next) => {
//   Song
//     .findById(req.params.id)
//     .then(song => {
//       if (!song) {
//         return res.status(404).send({
//           message: `Song does not exist`
//         })
//       }
//       return song.destroy()
//         .then(() => res.send({
//           message: `Song was deleted`
//         }))
//     })
//     .catch(error => next(error))
// })

module.exports = router
//