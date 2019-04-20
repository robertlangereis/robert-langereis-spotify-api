const { Router } = require('express')
const Song = require('./model')
const auth = require('../auth/middleware')
const Playlists = require('../playlists/model')

const router = new Router()

// * `GET /artists`: A user should be able to retrieve a list of artists, with all their songs (from the different playlists).
router.get('/playlists/:id/songs', auth, (req, res, next) => {
  Promise.all([
    Song.findAll({attributes: ['artist']})
  ])
    .then(([artist]) => {
      res.send({
        artist
      })
    })
    .catch(error => next(error))
})

// * `GET /playlists/:id`: A user should be able to get a single one of their playlists, with all the songs on it (but no others).
router.get('/playlists/:id/', auth, (req, res, next) => {
  Song
    .findByPk(req.params.id, { include: [{ all: true, nested: true }] })
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

// * `PUT /playlists/:id/songs/:id`: A user should be able to change song information, even move it to another playlist.
router.put('/playlists/:id/songs/:id', (req, res, next) => {
  Playlists
  .findByPk(req.params.id)
  .then(playlist => {
    if (!playlist) {
      return res.status(404).send({
        message: `playlist does not exist`
      })
    }
    return playlist.update(req.body).then(playlist => res.send(playlist))
  })
  .catch(error => next(error))
  Song
    .findByPk(req.params.id)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return song.update(req.body).then(song => res.send(song))
    })
    .catch(error => next(error))
})

module.exports = router