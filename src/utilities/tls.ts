import { promises as fs, watch } from 'fs'
import { ServerOptions } from 'https'
import { Server } from 'tls'
import { configuration } from '../configuration.js'
import { namespace } from './log.js'

const log = namespace('tls')

export const getTLSOptions = async (): Promise<ServerOptions> => ({
  key: await fs.readFile(configuration.tls.key),
  cert: await fs.readFile(configuration.tls.cert),
  ca: await fs.readFile(configuration.tls.ca),
})

export const updateTLS = async (server: Server) => {
  log('update-tls')
  const options = await getTLSOptions()
  server.setSecureContext(options)
}

export const watchCertificates = (server: Server) => {
  log('watch-certificates')
  let timeout: NodeJS.Timeout
  const watcher = () => {
    clearTimeout(timeout)
    timeout = setTimeout(updateTLS, 1000, server)
  }

  watch(configuration.tls.key, watcher)
  watch(configuration.tls.cert, watcher)
  watch(configuration.tls.ca, watcher)
}
