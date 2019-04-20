const Sequelize = require('sequelize')
const sequelize = require('../db')
// const User = require('../users/model')

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

// Playlists.belongsTo(User)

module.exports = Playlists