const { createSendAndWait } = require('../utils/handlers')
const Channel = require('../constants/Channel')
const slsk = require('../utils/slsk')

createSendAndWait(Channel.SEARCH, async (event, args) => {
  const { query } = args

  const searchRes = await slsk.search({
    query
  })

  const output = searchRes
    .sort((a, b) => { return (a.size / a.speed) - (b.size / b.speed) })
    .filter(r => { return r.slots })

  return {
    results: output
  }
})
