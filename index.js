const express = require('express')
const bodyParser = require('body-parser')
const songsRouter = require('./songs/routes')
const playlistsRouter = require('./playlists/routes')
const authenticationRouter = require('./auth/routes')
const usersRouter = require('./users/routes')

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(playlistsRouter, songsRouter, authenticationRouter, usersRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))