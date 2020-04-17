const d = require('fastify')({logger:true})
const monk = require('monk')
const moment = require('moment-timezone')
const uuid = require('uuid')

d.register(require('fastify-cors'), {origin: true, credentials: true})
console.log(uuid.v4())

const db = new monk('tourneydb_mongo_1/tourneydb')

console.log(db)
d.get('/:game', async (req, reply) => {
  try {
    let query = {game: req.params.game}
    const tournaments = db.get('tournaments')
    const res = await tournaments.find(query)
    const tourneys = res.map((tourney, idx) => {
      const now = Date.now()
      if(tourney.start_time < now) {
        let _start_time = moment(tourney.start_time).startOf('day')
        let remains = tourney.start_time - parseInt(_start_time.format('x'))
        let _now = moment(now).startOf('day')
        while (_now > _start_time) {
          _start_time.add(tourney.frequency, 'week') 
        }
        _start_time.add(remains, 'milliseconds')
        tourney.start_time = parseInt(_start_time.format('x'))
      } 
      return tourney
    })
    console.log(tourneys)
    reply.code(200).send({err: 0, msg: tourneys})
  } catch(e) {
    reply.code(500).send()
  }
})

d.post('/login', async (req, reply) => {
  try {
    if (typeof req.body !== 'undefined' && typeof req.body.email!== 'undefined' && typeof req.body.password !== 'undefined') {
      let query = {email: req.body.email.toLowerCase(), password: req.body.password}
      await verifyUser('admin', query)
      if (res.length === 1) {
        let payload = {
          user: res,
          token: token
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

// there should be only one user per email/token
verifyUser = async (collection = 'admins', query = {}) => {
  try {
    let collection = db.get('collection')
    let res = collection.find(query, {password: 0})
    if (res.length === 1) {
      let token = uuid.v4()
      await collection.update({_id: res[0]._id}, {$set: {token: token}})
      res[0].token = token
      return res
    } else {
      return null
    }
  } catch(e) {
    return null
  }
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
