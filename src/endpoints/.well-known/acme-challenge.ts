import { Server } from '@hapi/hapi'
import { configuration } from '../../configuration.js'
import { namespace } from '../../utilities/log.js'

const log = namespace('.well-known:acme-challenge')

export const registerWellKnownACMEChallenge = (server: Server) => {
  log('register-well-known-acme-challenge')

  server.route({
    method: 'GET',
    path: '/.well-known/acme-challenge/{token}',
    handler: {
      directory: {
        path: configuration.acme.challenge,
        index: false,
      }
    }
  })
}
