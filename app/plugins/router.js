const routes = [].concat(
  require('../routes/home'),
  require('../routes/knowledge-base'),
  require('../routes/document-parser'),
  require('../routes/chat'),
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/static')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
