FROM node:14-alpine as builder
WORKDIR /application
COPY . .
RUN npm ci
RUN npm run build
RUN npm ci --production

FROM node:14-alpine
WORKDIR /application
COPY --from=builder /application/package.json /application/package.json
COPY --from=builder /application/lib/ /application/lib/
COPY --from=builder /application/node_modules/ /application/node_modules/
ENV NODE_ENV production
CMD ["--enable-source-maps", "/application/lib/entrypoint.js"]
