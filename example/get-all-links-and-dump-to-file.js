const AftonbladetLinks = require('../') // require('aftonbladet-links') in production :)
const fs = require('fs')

const LIMIT = 10

console.log(
  `Will fetch all links from Aftonbladet with the concurrency limit "${LIMIT}"!`
)

/*
    It's recommended to use this module with async/await,
    however as I am in the global scope (correct me if I am wrong),
    I cannot use async/await :(

    So I will use it as a Promise. :)
*/

AftonbladetLinks.getAll(LIMIT)
  .then(links => {
    console.log(
      `I got ${links.length}x links! :D Will dump it to links.json now :)`
    )
    fs.writeFileSync('./links.json', JSON.stringify(links, null, 2))
  })
  .catch(error => {
    console.error(error)
    console.log('I will exit due to the error :(')
    process.exit(1)
  })
