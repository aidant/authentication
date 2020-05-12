import { Server } from '@hapi/hapi'

export const registerListAllEndpoints = (server: Server) => {
  server.route({
    method: 'GET',
    path: '/',
    async handler (request, h) {
      const routes = []
      for (const route of server.table()) {
        routes.push({
          method: route.method,
          path: route.path
        })
      }
      return routes
    }
  })
}
