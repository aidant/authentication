import debug from 'debug'
if (!process.env.DEBUG) debug.enable('passwordless*')
export const log = debug('passwordless')
export const namespace = log.extend.bind(log)
