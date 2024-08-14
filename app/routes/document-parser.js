const { getExtension } = require('../lib/file')
const schema = require('../schema/upload-document')
const { uploadToParse } = require('../services/upload-document')

module.exports = [{
  method: 'GET',
  path: '/document-parser',
  options: {
    handler: (request, h) => {
      return h.view('document-parser')
    }
  }
},
{
  method: 'POST',
  path: '/document-parser',
  options: {
    payload: {
      maxBytes: (50 * 1024 * 1024) + 250,
      multipart: true,
      timeout: false,
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data'
    },
    validate: {
      payload: schema,
      failAction: (request, h, err) => {
        return h.view('home', {
          uploadtype: request.payload.uploadtype,
          filename: request.payload.document.hapi.filename,
          filetype: getExtension(request.payload.document.hapi.filename),
          err
        }).takeover(400)
      }
    },
    handler: async (request, h) => {
      const parsedContent = await uploadToParse(request.payload)
      const formatedJson = JSON.stringify(parsedContent.content, null, 2)
      return h.view('document-content', { content: formatedJson })
    }
  }
}]
