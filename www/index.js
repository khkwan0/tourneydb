const d = require('fastify')({logger:true})
const path = require('path')

d.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
	prefix: '/public/',
})

d.get('/', (req, reply) => {
  reply.code(200).header('Content-Type','text/html; charset=UTF-8').send('<html><head></head><body><a href="/privacy">Privacy Policy</a></body></html>')
})

d.get('/privacy', (req, reply) => {
  reply.code(200).header('Content-Type','text/html; charset=UTF-8').sendFile('privacy.html')
})

const start = async () => {
  try {
    await d.listen(24421, '0.0.0.0')
  } catch(e) {
    console.log(e)
  }
}

start()
