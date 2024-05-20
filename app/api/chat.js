const { get, post, put } = require('./base')
const { documentsApi: config } = require('../config/api')

const baseUrl = config.baseUrl

const askQuestion = async (question) => {
  return get(`${baseUrl}/chat?question=${question}`)
}

module.exports = {
  askQuestion
}
