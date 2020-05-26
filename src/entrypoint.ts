console.log(String.raw`
  ██████╗  █████╗ ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██████╗ ██╗     ███████╗███████╗███████╗
  ██╔══██╗██╔══██╗██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██╔══██╗██║     ██╔════╝██╔════╝██╔════╝
  ██████╔╝███████║███████╗███████╗██║ █╗ ██║██║   ██║██████╔╝██║  ██║██║     █████╗  ███████╗███████╗
  ██╔═══╝ ██╔══██║╚════██║╚════██║██║███╗██║██║   ██║██╔══██╗██║  ██║██║     ██╔══╝  ╚════██║╚════██║
  ██║     ██║  ██║███████║███████║╚███╔███╔╝╚██████╔╝██║  ██║██████╔╝███████╗███████╗███████║███████║
  ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚══════╝╚══════╝
`)

import Hapi from '@hapi/hapi'
import Inert from '@hapi/inert'
import { isDevelopment, isProduction } from './configuration.js'
import { registerConsumeOneTimeSecret, registerGenerateOneTimeSecret } from './endpoints/devices/create-device.js'
import { registerListAllEndpoints } from './endpoints/list-all-endpoints.js'
import { log } from './utilities/log.js'
import { getTLSOptions } from './utilities/tls.js'

const server = Hapi.server({
  port: isDevelopment ? 80 : 443,
  tls: isProduction && await getTLSOptions(),
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

log(server.info)

await server.register([
  { plugin: Inert },
])

registerListAllEndpoints(server)
registerGenerateOneTimeSecret(server)
registerConsumeOneTimeSecret(server)

await server.start()
