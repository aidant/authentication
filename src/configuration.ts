export const isDevelopment = false ?? process.env.NODE_ENV !== 'production'
export const isProduction = !isDevelopment

const env = (property: string, required: boolean = false): string => {
  if (process.env[property]) return process.env[property] as string
  if (required) throw new Error(`Environment Variable: "${property}" is undefined.`)
  else return ''
}

export const configuration = {
  acme: {
    challenge: env('ACME_CHALLENGE_WEBROOT', isProduction),
  },
  tls: {
    key: env('TLS_KEY', isProduction),
    cert: env('TLS_CERT', isProduction),
    ca: env('TLS_CA', isProduction),
  },
}
