const rp = require('request-promise')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

//const auth = require('./auth.js')
//const twilioToken = auth.twilio.token
//const twilioSid = auth.twilio.sid
//const client = require('twilio')(twilioSid, twilioToken)

//const dailyShowUrl = 'https://www.showclix.com/event/TheDailyShowWithTrevorNoah'
const dailyShowUrl =
  'https://web.archive.org/web/20180821092937/https://www.showclix.com/event/TheDailyShowwithTrevorNoah'
const lateShowUrl =
  'https://colbert.1iota.com/show/536/The-Late-Show-with-Stephen-Colbert'

// initialize object to keep available dates in
const availableDates = {}
availableDates['dailyShow'] = {}
availableDates['lateShow'] = {}

async function scrapeDailyShow() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(dailyShowUrl)

  // first scrape the page we land on
  let content = await page.content()
  var $ = cheerio.load(content)
  let month = $('.ui-datepicker-month')
    .text()
    .toLowerCase()
  availableDates.dailyShow[month] = []
  $('.has_event_style1').each(function(i, element) {
    availableDates.dailyShow[month].push($(this).text())
  })

  // try and click on the next month
  await page.click(
    '#datepicker > div > div > a.ui-datepicker-next.ui-corner-all'
  )
  await page.waitFor(1000)
  content = await page.content()
  var $ = cheerio.load(content)
  month = $('.ui-datepicker-month')
    .text()
    .toLowerCase()
  availableDates.dailyShow[month] = []
  $('.has_event_style1').each(function(i, element) {
    availableDates.dailyShow[month].push($(this).text())
  })

  // try and click on the previous month
  await page.click(
    '#datepicker > div > div > a.ui-datepicker-prev.ui-corner-all'
  )
  await page.waitFor(1000)
  content = await page.content()
  var $ = cheerio.load(content)
  month = $('.ui-datepicker-month')
    .text()
    .toLowerCase()
  availableDates.dailyShow[month] = []
  $('.has_event_style1').each(function(i, element) {
    availableDates.dailyShow[month].push($(this).text())
  })

  console.log(availableDates)

  browser.close()
}

async function scrapeLateShow() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(lateShowUrl)

  let content = await page.content()
  var $ = cheerio.load(content)
  $('.dom').each(function(i, element) {
    lateShowAvailableDates.push($(this).text())
  })
  console.log(lateShowAvailableDates)
  browser.close()
}

scrapeDailyShow()
//scrapeLateShow()
// Send message
/*
client.messages
  .create({
    body: 'Hey! From Node.js.',
    from: '+14152127564',
    to: '+12144156438'
  })
  .then(message => console.log(message.sid))
  .done()
*/
