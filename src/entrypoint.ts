import Hapi from '@hapi/hapi'
import { promises as fs } from 'fs'
import { PORT, TLS } from './configuration.js'
import { registerConsumeOneTimeSecret, registerGenerateOneTimeSecret, registerInvalidateOneTimeSecret } from './endpoints/devices/create-device.js'
import { log } from './utilities/log.js'

(async () => {
  const port = PORT
  const tls = TLS ? {
    key: await fs.readFile(TLS.key),
    cert: await fs.readFile(TLS.cert),
    ca: await fs.readFile(TLS.ca),
  } : undefined

  const server = Hapi.server({
    port,
    tls,
    routes: { cors: true },
    router: {
      stripTrailingSlash: true,
    },
  })

  registerGenerateOneTimeSecret(server)
  registerInvalidateOneTimeSecret(server)
  registerConsumeOneTimeSecret(server)

  await server.start()
  log(server.info)
})()

