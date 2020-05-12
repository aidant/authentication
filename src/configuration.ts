import { promises as fs } from 'fs'

export const isDevelopment = process.env.NODE_ENV !== 'production'
export const isProduction = !isDevelopment

export const getServerConfiguration = async () => ({
  port: isDevelopment ? 80 : 443,
  tls: isDevelopment ? undefined : {
    key: await fs.readFile(process.env.TLS_KEY as string),
    cert: await fs.readFile(process.env.TLS_CERT as string),
    ca: await fs.readFile(process.env.TLS_CA as string),
  },
})
