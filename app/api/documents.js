const { get, post, put } = require('./base')
const { documentsApi: config } = require('../config/api')

const baseUrl = config.baseUrl

const getDocuments = async () => {
  return get(`${baseUrl}/documents`)
}

const getDocumentById = async (id) => {
  return get(`${baseUrl}/documents/${id}`, false)
}

const getDocumentMetadata = async (id) => {
  return get(`${baseUrl}/documents/${id}/metadata`)
}

const uploadDocument = async (document, contentType) => {
  const headers = {
    'Content-Type': contentType
  }
  return post(`${baseUrl}/documents`, document, headers)
}

const uploadDocumentToParse = async (document, contentType) => {
  const headers = {
    'Content-Type': contentType
  }
  return post(`${baseUrl}/document/parse`, document, headers)
}

const updateDocumentMetadata = async (id, metadata) => {
  return put(`${baseUrl}/documents/${id}`, metadata)
}

module.exports = {
  getDocuments,
  getDocumentById,
  getDocumentMetadata,
  uploadDocument,
  updateDocumentMetadata,
  uploadDocumentToParse
}
