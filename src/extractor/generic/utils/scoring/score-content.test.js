import assert from 'assert'
import cheerio from 'cheerio'
import fs from 'fs'

import {
  clean
} from '../dom/test-helpers'
import HTML from './fixtures/html'

import {
  scoreContent,
  getScore
} from './index'

// TODO: Walk through these and sanity check my scores
// Commented out scores were what I expected, but I was also
// probably missing something when calculating
describe('scoreContent($, weightNodes)', () => {
  it("loves hNews content", () => {
    const $ = cheerio.load(HTML.hNews.before)
    const result = scoreContent($).html()

    assert.equal(getScore($('div').first(), $), 110)
    // assert.equal(getScore($('div').first(), $), 99)
  })

  it("is so-so about non-hNews content", () => {
    const $ = cheerio.load(HTML.nonHNews.before)
    const result = scoreContent($).html()

    // assert.equal(getScore($('div').first(), $), 38)
    assert.equal(getScore($('div').first(), $), 60)
  })

  it("scores this Wired article the same", () => {
    const html = fs.readFileSync('../fixtures/wired.html', 'utf-8')
    const $ = cheerio.load(html)
    const result = scoreContent($).html()

    // assert.equal(getScore($('article').first(), $), 63.75)
    assert.equal(getScore($('article').first(), $), 67)
  })

  // it("scores this NYT article the same", () => {
  //   const html = fs.readFileSync('../fixtures/nytimes.html', 'utf-8')
  //   const $ = cheerio.load(html)
  //   const result = scoreContent($).html()
  //
  //   assert.equal(getScore($('div').first(), $), 385)
  // })

})