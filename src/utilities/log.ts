import debug from 'debug'
if (!process.env.DEBUG) debug.enable('authentication*')
export const log = debug('authentication')
export const namespace = log.extend.bind(log)
