const Sequelize = require('sequelize')
const sequelize = require('../db')

const Playlist = sequelize.define('playlists', {
  name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false
  }
}
,{
  timestamps: false,
  tableName: 'playlists'
})

Playlist.associate = (Song) => {
  Playlist.hasMany(Song, {
    foreignKey: 'playlist_id',
    as: 'songs'
  })
}
module.exports = Playlist