'use strict'

const Hapi = require('hapi')
const server = Hapi.server({
  port: 3030,
  host: 'localhost'
})
const addAPIs = async () => {
  await server.register([require('./api/omdb'), require('./api/poster')])
}
const init = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'The OMDB bot is up and running.'
    }
  })
  server.route({
    method: '*',
    path: '/{any*}',
    handler: function (request, h) {
      return '404'
    }
  })
  await addAPIs()
  await server.start()
  console.log('Server up on %s', server.info.uri)
}

/*
** The following complements DEP0018 by forcing uncaught promise rejections to crash the app.
** This can also be done viw mcollina's 'make-promises-safe' module.
*/
process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})
/*
** Setup is complete. Execute the server init() command.
*/
init()
