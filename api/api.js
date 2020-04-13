const d = require('fastify')({logger:true})
const monk = require('monk')
const moment = require('moment-timezone')

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

const start = async () => {
  try {
    await d.listen(24420, '0.0.0.0')
  } catch(e) {
    console.log(e)
  }
}

start()
