const d = require('fastify')()
const monk = require('monk')

const db = new monk('tourneydb_mongo_1/tourneydb')

console.log(db)
d.get('/', async (req, reply) => {
  try {
    const tournaments = db.get('tournaments')
    const res = await tournaments.find()
    reply.code(200).send({err: 0, msg: res})
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
