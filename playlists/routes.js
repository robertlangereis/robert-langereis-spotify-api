const { Router } = require('express')
const Playlist = require('./model')
const Song = require('../songs/model')

const router = new Router()


//  * `GET /playlists`: A user should be able to retrieve all their playlists
router.get('/playlists', (req, res, next) => {
  const limit = req.query.limit || 25
  const offset = req.query.offset || 0

  Promise.all([
    Playlist.count(),
    Playlist.findAll({ limit, offset })
  ])
    .then(([total, playlists]) => {
      res.send({
        playlists, total
      })
    })
    .catch(error => next(error))
})

//  * `GET /playlists/:id`: A user should be able to get a single one of their playlists, with all the songs on it (but no others)!!
router.get('/playlists/:id', (req, res, next) => {
  Playlist
    .findByPk(req.params.id, { include: [{ all: true, nested: true }] })
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `playlist does not exist`
        })
      }
      return res.status(200).send(playlist)
    })
    .catch(error => next(error))
})

//  `POST /playlists`: A user should be able to create a playlist (with just a name)
router.post('/playlists', (req, res, next) => {
  Playlist
    .create(req.body)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `playlist does not exist`
        })
      }
      return res.status(201).send(playlist)
    })
    .catch(error => next(error))
})

router.put('/playlists/:id', (req, res, next) => {
  Playlist
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
})

//* `DELETE /playlists/:id`: A user may delete their playlists, and all songs on it.
router.delete('/playlists/:id', (req, res, next) => {
  Playlist
    .findById(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `playlist does not exist`
        })
      }
      return playlist.destroy()
        .then(() => res.send({
          message: `playlist was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router