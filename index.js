const rp = require('request-promise')
const $ = require('cheerio')

const url = 'https://www.google.com'

rp(url)
  .then(function(html) {
    //success!
    console.log(html)
  })
  .catch(function(err) {
    //handle error
  })
