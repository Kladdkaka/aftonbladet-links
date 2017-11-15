const AftonbladetLinks = require('../')
const chai = require('chai')
const chaiThings = require('chai-things')

chai.should()
chai.use(chaiThings)

const MAIN_SITEMAP_CONTAIN_STRING = "aftonbladet.se/svn/sitemap"
const LINKS_SITEMAP_CONTAIN_STRING = "aftonbladet.se"

const SITEMAP_TEST_URL_FOR_JANUARY_2000 = "http://www.aftonbladet.se/svn/sitemap/2000/01.xml.gz"


describe('#Aftonbladet', function () {
    this.timeout(60000)

    it(`getSitemap() should not be empty`, async function () {
        const urls = await AftonbladetLinks.getSitemap()

        urls.should.not.be.empty
    })

    it(`getSitemap() should all contain "${MAIN_SITEMAP_CONTAIN_STRING}" in their url`, async function () {
        const urls = await AftonbladetLinks.getSitemap()

        urls.should.include.all.string(MAIN_SITEMAP_CONTAIN_STRING)
    })

    it(`getLinksFromUrl(url) for url "${SITEMAP_TEST_URL_FOR_JANUARY_2000}" should not be empty`, async function () {
        const links = await AftonbladetLinks.getLinksFromUrl(SITEMAP_TEST_URL_FOR_JANUARY_2000)

        links.should.not.be.empty
    })

    it(`getLinksFromUrl(url) for url "${SITEMAP_TEST_URL_FOR_JANUARY_2000}" should all contain "${LINKS_SITEMAP_CONTAIN_STRING}" in their url`, async function () {
        const links = await AftonbladetLinks.getLinksFromUrl(SITEMAP_TEST_URL_FOR_JANUARY_2000)

        links.should.include.all.string(LINKS_SITEMAP_CONTAIN_STRING)
    })

    it(`getAll() should not be empty`, async function () {
        const links = await AftonbladetLinks.getAll()

        links.should.not.be.empty
    })

    /*
        Commented out this test because it took way too long time. :)
    */

    /*
    it(`getAll() should all contain ${LINKS_SITEMAP_CONTAIN_STRING}`, async function () {
        const links = await AftonbladetLinks.getAll()

        links.should.include.all.string(LINKS_SITEMAP_CONTAIN_STRING)
    })
    */
})