const { askQuestion } = require('../api/chat')

module.exports = [{
  method: 'GET',
  path: '/chat',
  options: {
    handler: (request, h) => {
      return h.view('chat')
    }
  }
},
{
  method: 'GET',
  path: '/documents/chat',
  options: {
    handler: (request, h) => {
      return h.view('chat')
    }
  }
},
{
  method: 'POST',
  path: '/documents/chat',
  options: {
    handler: async (request, h) => {
      const { question } = request.payload
      const { response } = await askQuestion(question)
      console.log(response.kwargs.response_metadata.tokenUsage)
      return h.view('chat', { answer: response.kwargs.content, tokenUsage: response.kwargs.response_metadata.tokenUsage})
    }
  }
}]
