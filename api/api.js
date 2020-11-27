const d = require('fastify')({logger:true})
const monk = require('monk')
const moment = require('moment-timezone')
const uuid = require('uuid')
const crypto = require('crypto')
const config = require('./config')

d.register(require('fastify-cors'), {origin: 'https://admin.pubgamesdb.com', credentials: true})

const db = new monk('mongodb://'+config.db.mongo.user + ':' + config.db.mongo.password + '@tourneydb_mongo_1/'+config.db.mongo.db+'?authSource='+config.db.mongo.db+'&replicaSet=rs0')

const gLocations = {}
const DIST = 5000 //5KM

d.addHook('preHandler', async (req, reply) => {
  try {
    if (req.raw.method === 'GET' || req.raw.url === '/login' || req.raw.url === '/verify' || req.raw.url.indexOf('/games') === 0) {
      return
    } else {
      if (typeof req.body.token !== 'undefined') {
        const query = {token: req.body.token}
        const admins = db.get('admins')
        const res = await admins.find(query)
        let valid = false
        if (res.length > 0) {
          valid = true
        }
        if (valid) {
          return
        } else {
          reply.code(403).send({err:403})
        }
      } else {
        reply.code(403).send({err:403})
      }
    }
  } catch(e) {
    console.log(e)
    reply.code(500).send()
  }
})

d.post('/games/:game', async (req, reply) => {
  try {
    let max_distance = parseInt(DIST) // 5KM
    if (typeof req.body.max_distance !== 'undefined') {
      max_distance = parseInt(req.body.max_distance)
    }

    let position = req.body.position
    let lat = null
    let lng = null
    if (typeof position.coords.latitude !== 'undefined') {
      lat = parseFloat(position.coords.latitude)
    }
    if (typeof position.coords.longitude !== 'undefined') {
      lng = parseFloat(position.coords.longitude)
    }
    if (!lat || !lng) {  // set default to Bangkok
      lat = 13.735104
      lng = 100.5622373
    }

    // get all locations within max_distance radius
    const locations = db.get('locations')
    const loc_res = await locations.find({location: {$near: {$geometry: {type: "Point", coordinates:[lng, lat]}, $maxDistance: max_distance}}})
    const _locs = loc_res.map(loc => loc._id.toString())

    // get games
    let query = {location_id: {$in: _locs}}
    if (req.params.game !== undefined && req.params.game) {
      query = {game: req.params.game, location_id: {$in: _locs} }
    }
    const tournaments = db.get('tournaments')
    const res = await tournaments.find(query)
    console.log(res)
    const tourneys = await Promise.all(res.map(async (tourney, idx) => {
      const now = moment(Date.now())
      let _start_time = moment(tourney.start_time).startOf('day')
      if (_start_time.isBefore(now)) {
        let remains = parseInt(moment(tourney.start_time).format('x')) - parseInt(_start_time.format('x'))
        let _now = moment(now).startOf('day')
        while (_now.isAfter(_start_time)) {
          _start_time.add(tourney.frequency, 'week') 
        }
        _start_time.add(remains, 'milliseconds')
        tourney.start_time = parseInt(_start_time.format('x'))
      } 
      const loc_id = tourney.location_id
      tourney.location = await getLocationData(loc_id)
      return tourney
    }))
    tourneys.sort((a,b) => (a.start_time > b.start_time)?1:-1)
    reply.code(200).send({err: 0, msg: tourneys})
  } catch(e) {
    console.log(e)
    reply.code(500).send()
  }
})

d.post('/login', async (req, reply) => {
  try {
    if (typeof req.body !== 'undefined' && typeof req.body.email!== 'undefined' && typeof req.body.password !== 'undefined') {
      let hash = await doScrypt(req.body.password)
      let query = {email: req.body.email.toLowerCase(), password: hash.toString('hex')}
      const res = await verifyUser('admins', query)
      if (res && res.length === 1) {
        let payload = {
          user: res,
          token: res.token
        }
        reply.code(200).send({err: 0, msg: payload})
      } else {
        respond404(reply)
      }
    } else {
      respond404(reply)
    }
  } catch(e) {
    console.log(e)
    reply.code(500).send({err: 500, msg: e})
  }
})

d.get('/verify/:token', async (req, reply) => {
  try {
    if (typeof req.params.token !== 'undefined') {
      let query = {token: req.params.token}
      let res = await verifyUser('admins', query)
      if (res) {
        reply.code(200).send({err: 0, msg: res})
      } else {
        respond404(reply)
      }
    } else {
      respond404(reply)
    }
  } catch(e) {
    console.log(e)
    reply.code(500).send({err: 500, msg: e})
  }
})

d.get('/locations', async (req, reply) => {
  try {
    const locations = db.get('locations')
    const res = await locations.find({is_active: true})
    reply.code(200).send({err: 0, msg: res})
  } catch(e) {
    reply.code(500).send({err: 500, msg: e})
  }
})

d.post('/location', async (req, reply) => {
  if (typeof req.body !== 'undefined' && typeof req.body.location !== 'undefined') {
    try {
      const locations = db.get('locations')
      if (typeof req.body.location._id === 'undefined' || !req.body.location._id) {
        const location = req.body.location
        location.is_active = true
        delete location._id
        const res = await locations.insert(location)
        reply.code(200).send({err: 0, msg: res})
      } else {
        const res = await locations.update({_id: req.body.location._id}, {$set: req.body.location})
        reply.code(200).send({err: 0, msg: res})
      }
    } catch(e) {
      console.log(e)
      reply.code(500).send({err: 500, msg: e})
    }
  } else {
    reply.code(404).send()
  }
})

d.get('/tournaments/:loc_id', async (req, reply) => {
  if (typeof req.params.loc_id !== 'undefined') {
    try {
      const tournaments = db.get('tournaments')
      const res = await tournaments.find({location_id: req.params.loc_id, is_active:true})
      reply.code(200).send({err: 0, msg: res}) 
    } catch(e) {
      console.log(e)
      reply.code(500).send({err: 500, msg: e})
    }
  } else {
    reply.code(404).send()
  }
})

d.post('/tournament', async (req, reply) => {
  if (typeof req.body.tournament !== 'undefined') {
    try {
      const tournaments = db.get('tournaments')
      let timezone = "Etc/GMT"
      if (typeof req.body.timezone !== 'undefined') {
        timezone = req.body.timezone
      }
      if (typeof req.body.tournament._id === 'undefined' || !req.body.tournament._id) {
        const _details = {...req.body.tournament}
        _details.start_time = parseInt(moment.tz(req.body.tournament.start_time, timezone).format('x'))
        if (typeof _details._id  !== 'undefined') {
          delete _details._id
        }
        _details.is_active = true
        const res = await tournaments.insert(_details)
        reply.code(200).send({err: 0, msg: res})
      } else {
        req.body.tournament.start_time = parseInt(moment.tz(req.body.tournament.start_time, timezone).format('x'))
        const res = await tournaments.update({_id: req.body.tournament._id}, {$set: req.body.tournament})
        reply.code(200).send({err: 0, msg: res})
      }
    } catch(e) {
      console.log(e)
      reply.code(500).send({err: 500, msg: e})
    }
  } else {
    reply.code(404).send()
  }
})

d.get('/venues', async (req, reply) => {
  if (req.query.pos !== undefined && req.query.pos) {
    try {
      const position = JSON.parse(new Buffer.from(req.query.pos, "base64").toString("ascii"))
      let lat = null
      let lng = null
      if (typeof position.coords.latitude !== 'undefined') {
        lat = parseFloat(position.coords.latitude)
      }
      if (typeof position.coords.longitude !== 'undefined') {
        lng = parseFloat(position.coords.longitude)
      }
      if (!lat || !lng) {  // set default to Bangkok
        lat = 13.735104
        lng = 100.5622373
      }
      const locations = db.get('locations')
      max_distance = parseInt(DIST) // 5KM
      if (req.query.max_distance !== undefined) {
        max_distance = parseInt(req.query.max_distance)
      }
      //const loc_res = await locations.find({location: {$near: {$geometry: {type: "Point", coordinates:[lng, lat]}, $maxDistance: max_distance}}})
      const loc_res = await locations.aggregate([{"$geoNear":{"near":{"type":"Point", "coordinates": [lng, lat]}, "maxDistance": max_distance, "spherical": true, "distanceField":"distance"}}])
      reply.code(200).send({err: 0, msg: loc_res})
    } catch(e) {
      console.log(e)
      reply.code(404).send()
    }
  } else {
    reply.code(404).send()
  }
})

d.post('/pwd/admin', async (req, reply) => {
  if (typeof req.body.token !== 'undefined' && req.body.old_password !== 'undefined' && req.body.new_password !== 'undefined') {
    try {
      const admins = db.get('admins')
      const old_hash = await doScrypt(req.body.old_password)
      const new_hash = await doScrypt(req.body.new_password)
      const token = req.body.token
      const res = await admins.update({token: token, password: old_hash}, {$set: {password: new_hash}})
      if (res.n === 1 && res.nModified === 1) {
        reply.code(200).send({err: 0, msg: 'ok'})
      } else {
        reply.code(404).send({err: 404, msg: 'not found'})
      }
    } catch(e) {
      console.log(e)
      reply.code(500).send({err: 500, msg: e})
    }
  } else {
    respond404(reply)
  }
})

getLocationData = async loc_id => {
  // check local
  if (typeof gLocations[loc_id] !== 'undefined') {
    return gLocations[loc_id]
  } else {
    try {
      const _locations = db.get('locations')
      const res = await _locations.findOne({_id: loc_id})
      if (typeof res._id !== 'undefined') {
        gLocations[res._id] = res
        return res
      } else {
        throw new Error(e)
      }
    } catch(e) {
      console.log(e)
      throw new Error(e)
    }
  }
}

// there should be only one user per email/token
verifyUser = async (collection = 'admins', query = {}) => {
  try {
    const _collection = db.get(collection)
    const res = await _collection.find(query, '-password')
    if (res.length === 1) {
      let token = uuid.v4()
      await _collection.update({_id: res[0]._id}, {$set: {token: token}})
      res[0].token = token
      return res
    } else {
      return null
    }
  } catch(e) {
    console.log(e)
    return null
  }
}

const doScrypt = (pwd) => {
  return new Promise((resolve, reject) => {
      try {
        crypto.scrypt(pwd, config.salt, 64, (err, derived) => {
          if (err) {
            reject(err)
          } else {
            resolve(derived.toString('hex'))
          }
        })
      } catch(e) {
        console.log(e)
        reject(e)
      }
  })
}


respond404 = (reply) => {
  reply.code(404).send({err:404, msg: 'not found'})
}


const start = async () => {
  try {
    await d.listen(24420, '0.0.0.0')
  } catch(e) {
    console.log(e)
  }
}

start()
