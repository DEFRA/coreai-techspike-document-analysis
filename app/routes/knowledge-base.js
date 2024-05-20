const { getExtension } = require('../lib/file')
const schema = require('../schema/upload-document')
const { upload } = require('../services/upload-document')

module.exports = [{
  method: 'GET',
  path: '/knowledge-base',
  options: {
    handler: (request, h) => {
      return h.view('knowledge-base')
    }
  }
},
{
  method: 'POST',
  path: '/knowledge-base',
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
      await upload(request.payload)
      return h.redirect('/')
    }
  }
}]
