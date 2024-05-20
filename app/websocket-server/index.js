const Nes = require('@hapi/nes')

const setupSubscriber = async (serverUrl, path) => {
  console.log(`Setting up subscriber for ${serverUrl}${path}`)
  const client = new Nes.Client(serverUrl)
  await client.connect()

  client.subscribe(path, (message) => {
    console.log(message)
  })

  console.log(`Subscriber set up for ${path}`)
}

module.exports = setupSubscriber
