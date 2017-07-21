const User = require('../models/User')
const Place = require('../models/Place')

const request = require('request')
const bcrypt = require('bcrypt')

// function placeSearch(url, callback) {
//   request(`${apiUrl}${qString}${apiKey}`, callback)
// }

function register (req, res) {
  // getting all places from my list of places in the db
  Place.find({}, function (err, allPlaces) {
    if (err) res.send(err)

    res.render('users/new', {
      places: allPlaces
    })
  })

  // getting all places from google place api
  // const apiUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
  // const apiKey = `&key=${process.env.GOOGLE_PLACE_KEY}`
  // const qString = `query=hotels in new york`
  //
  // request(`${apiUrl}${qString}${apiKey}`, function (err, response, body) {
  //   if (err) res.send(err)
  //
  //   var data = JSON.parse(body)
  //
  //   res.render('users/new', {
  //     places: data.results
  //   })
  // })
}

function create (req, res) {
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(req.body.user.password, salt)

  res.send({
    reqbody: req.body,
    hash: hash
  })

  // User.create(req.body.user, function (err, newUser) {
  //   if (err) {
  //     // flow if user is invalid
  //     // passing error message to /users
  //
  //     res.send(err)
  //     // res.redirect('/users')
  //   }
  //
  //   // flow is user is created
  //
  //   res.format({
  //     html: function () {
  //       res.redirect('/users/new')
  //     },
  //
  //     json: function () {
  //       res.send('respond for ajax')
  //     }
  //   })
  //   // res.redirect('/users/new')
  // })
}

module.exports = {
  create,
  register
}
