FROM node:14-alpine as builder
WORKDIR /application
COPY . .
RUN npm ci
RUN npm run build
RUN npm ci --production

FROM docker.pkg.github.com/aidant/distroless/node:14
WORKDIR /application
COPY --from=builder /application/package.json /application/package.json
COPY --from=builder /application/lib/ /application/lib/
COPY --from=builder /application/node_modules/ /application/node_modules/
ENV NODE_ENV production
CMD [\
  "--enable-source-maps",\
  "--experimental-top-level-await",\
  "--harmony",\
  "--throw-deprecation",\
  "--trace-warnings",\
  "--unhandled-rejections=strict",\
  "/application/lib/entrypoint.js"\
]
