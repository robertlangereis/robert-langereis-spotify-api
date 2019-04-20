const Sequelize = require('sequelize')
const sequelize = require('../db')
const Playlists = require('../playlists/model')

const Song = sequelize.define('songs', {
  title: {
    type: Sequelize.STRING,
    field: 'title',
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    field: 'artist',
    allowNull: false
  },
  album: {
    type: Sequelize.STRING,
    field: 'album',
    allowNull: false
  },
  playlistId: {
    type: Sequelize.INTEGER,
    field: 'playlistId'
  }
},
{
  timestamps: false,
  tableName: 'songs'
})

Song.belongsTo(Playlists, {
  foreignKey: 'playlistId',
  onDelete: 'CASCADE'
})


console.log('')

module.exports = Song