FROM node:14-alpine as builder
WORKDIR /application
COPY . .
RUN npm ci
RUN npm run build
RUN npm ci --production

FROM docker.pkg.github.com/aidant/distroless/node:14
WORKDIR /application
COPY --from=builder /application/lib /application/node_modules /application/
CMD ["--enable-source-maps", "/application/lib/entrypoint.js"]
