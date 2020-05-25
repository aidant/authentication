console.log(String.raw`
  ██████╗  █████╗ ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██████╗ ██╗     ███████╗███████╗███████╗
  ██╔══██╗██╔══██╗██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██╔══██╗██║     ██╔════╝██╔════╝██╔════╝
  ██████╔╝███████║███████╗███████╗██║ █╗ ██║██║   ██║██████╔╝██║  ██║██║     █████╗  ███████╗███████╗
  ██╔═══╝ ██╔══██║╚════██║╚════██║██║███╗██║██║   ██║██╔══██╗██║  ██║██║     ██╔══╝  ╚════██║╚════██║
  ██║     ██║  ██║███████║███████║╚███╔███╔╝╚██████╔╝██║  ██║██████╔╝███████╗███████╗███████║███████║
  ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚══════╝╚══════╝
`)

import Hapi from '@hapi/hapi'
import { Server } from 'https'
import { isDevelopment, isProduction } from './configuration.js'
import { registerConsumeOneTimeSecret, registerGenerateOneTimeSecret } from './endpoints/devices/create-device.js'
import { registerListAllEndpoints } from './endpoints/list-all-endpoints.js'
import { log } from './utilities/log.js'
import { getTLSOptions, watchCertificates } from './utilities/tls.js'

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

if (isProduction) watchCertificates(server.listener as Server)
log(server.info)

registerListAllEndpoints(server)
registerGenerateOneTimeSecret(server)
registerConsumeOneTimeSecret(server)

await server.start()
