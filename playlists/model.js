const Sequelize = require('sequelize')
const sequelize = require('../db')

const Playlists = sequelize.define('playlists', {
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

Playlists.associate = (Song) => {
  Playlists.hasMany(Song, {
    foreignKey: 'playlistId',
    as: 'songs'
  })
}
module.exports = Playlists