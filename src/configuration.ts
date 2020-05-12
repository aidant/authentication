export const isDevelopment = process.env.NODE_ENV !== 'production'
export const isProduction = !isDevelopment
export const PORT = isDevelopment ? 80 : 443
export const TLS = isDevelopment ? null : {
  key: `/etc/letsencrypt/live/${process.env.DOMAIN}/privkey.pem`,
  cert: `/etc/letsencrypt/live/${process.env.DOMAIN}/cert.pem`,
  ca: `/etc/letsencrypt/live/${process.env.DOMAIN}/chain.pem`,
}
