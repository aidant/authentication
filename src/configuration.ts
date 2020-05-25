export const isDevelopment = process.env.NODE_ENV !== 'production'
export const isProduction = !isDevelopment

const env = (property: string): string => {
  if (process.env[property]) return process.env[property] as string
  throw new Error(`Environment Variable: "${property}" is undefined.`)
}

export const configuration = {
  tls: {
    key: env('TLS_KEY'),
    cert: env('TLS_CERT'),
    ca: env('TLS_CA'),
  },
}
