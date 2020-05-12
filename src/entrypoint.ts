import Hapi from '@hapi/hapi'
import { getServerConfiguration } from './configuration.js'
import { registerConsumeOneTimeSecret, registerGenerateOneTimeSecret } from './endpoints/devices/create-device.js'
import { registerListAllEndpoints } from './endpoints/list-all-endpoints.js'
import { log } from './utilities/log.js'

const entrypoint = async (...arg: string[]) => {
  const config = await getServerConfiguration()

  const server = Hapi.server({
    port: config.port,
    tls: config.tls,
    routes: {
      cors: true,
      json: {
        space: 2,
      },
    },
    router: {
      stripTrailingSlash: true,
    },
  })

  registerListAllEndpoints(server)
  registerGenerateOneTimeSecret(server)
  registerConsumeOneTimeSecret(server)

  await server.start()
  log(server.info)
}

entrypoint(...process.argv.splice(2))
