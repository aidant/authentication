import { Server } from '@hapi/hapi'
import Joi from '@hapi/joi'
import { OneTimeSecret } from '../../one-time-secret.js'
import { namespace } from '../../utilities/log.js'

const log = namespace('create-device')
const ots = new OneTimeSecret()

export const registerGenerateOneTimeSecret = (server: Server) => {
  log('register-generate-one-time-secret')
  server.route({
    method: 'POST',
    path: '/devices/generate-one-time-secret',
    async handler (request, h) {
      const response = { secret: await ots.generate() }
      return h.response(response).code(201)
    }
  })
}

export const registerConsumeOneTimeSecret = (server: Server) => {
  log('register-consume-one-time-secret')
  server.route({
    method: 'POST',
    path: '/devices/consume-one-time-secret/{secret}',
    options: {
      validate: {
        params: Joi.object({
          secret: Joi.string().required()
        })
      }
    },
    async handler (request, h) {
      const secret = request.params.secret
      const isValid = ots.consume(secret)
      return { isValid }
    }
  })
}
