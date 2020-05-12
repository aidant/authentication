import crypto from 'crypto'
import { promisify } from 'util'

export class OneTimeSecret {
  static async generate () {
    return (await promisify(crypto.randomBytes)(4)).toString('hex')
  }

  static compare (a: string, b: string) {
    if (a.length !== b.length) return false
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
  }

  #secrets = new Set<string>()

  async generate () {
    const secret = await OneTimeSecret.generate()
    this.#secrets.add(secret)
    setTimeout(() => this.#secrets.delete(secret), 60000)
    return secret
  }

  consume (secret: string): boolean {
    for (const s of this.#secrets) {
      if (OneTimeSecret.compare(secret, s)) {
        this.#secrets.delete(s)
        return true
      }
    }
    return false
  }
}
