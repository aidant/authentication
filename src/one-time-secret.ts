import crypto from 'crypto'
import { promisify } from 'util'
import { namespace } from './utilities/log.js'

const log = namespace('one-time-secert')

export class OneTimeSecret {
  static generate = promisify(crypto.randomBytes)

  #secret?: string
  #timeout?: NodeJS.Timeout
  
  async generate () {
    log('generate')
    const buffer = await OneTimeSecret.generate(4)
    this.#secret = buffer.toString('base64').replace(/=/g, '')
    this.#timeout = setTimeout(() => this.invalidate(), 60000)
    return this.#secret
  }

  validate (secret: string) {
    log('validate')
    if (!this.#secret) return false
    if (this.#secret.length !== secret.length) return false
    return crypto.timingSafeEqual(Buffer.from(this.#secret), Buffer.from(secret))
  }

  invalidate () {
    log('invalidate')
    if (this.#timeout) clearTimeout(this.#timeout)
    this.#secret = undefined
    this.#timeout = undefined
  }
}
