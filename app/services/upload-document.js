const { uploadDocument, updateDocumentMetadata } = require('../api/documents')
const { mime } = require('../constants/document-types')
const { getExtension } = require('../lib/file')

const getBuffer = (payload) => {
  let buffer
  let ext

  buffer = payload.document._data

  ext = getExtension(payload.document.hapi.filename)

  const type = mime[ext]

  return { buffer, type }
}

const buildMetadataPayload = (payload) => {
  const fileName = payload.document.hapi.filename

  return {
    fileName,
    uploadedBy: 'Jane Doe',
    documentType: 'Document'
  }
}

const upload = async (payload) => {
  const { buffer, type } = getBuffer(payload)
  const { id } = await uploadDocument(buffer, type)

  const metadataPayload = buildMetadataPayload(payload)
  await updateDocumentMetadata(id, metadataPayload)
}

module.exports = {
  upload
}
