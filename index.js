const { promisify } = require('util')

const parseXML = promisify(require('xml2js').parseString)
const parallel = require('async-await-parallel')
const axios = require('axios')
const zlib = require('zlib')

const debug = {
    sitemap: require('debug')('aftonbladet:sitemap'),
    links: require('debug')('aftonbladet:links'),
    getall: require('debug')('aftonbladet:getall')
}

const SITEMAP_URL = "https://www.aftonbladet.se/svn/sitemap/index.xml"

/**
 * Will get all URLs to children sitemaps (one for each month) from parent (main)
 *
 * @return {Promise<Array>} The array contains all child sitemap URLs!
 */

async function getSitemap() {
    let res

    debug.sitemap(`Will try to fetch sitemap!`)

    try {
        res = await axios.get(SITEMAP_URL)
    } catch (error) {
        debug.sitemap(`Got error while trying to fetch sitemap, error is: "${error.message}"`)
        throw error
    }

    let data

    try {
        data = await parseXML(res.data)
    } catch (error) {
        debug.sitemap(`Got error while trying to parse the sitemap, error is: "${error.message}"`)
        throw error
    }

    const urls = data.sitemapindex.sitemap.map(entry => entry.loc[0])

    return urls
}

/**
 * Will get all URLs for articles (in code refered as a "link") from children sitemap
 * @param {string} url The child sitemap URL you want to get article links from :)
 * @return {Promise<Array>} The array contains all article URLs!
 */

async function getLinksFromUrl(url) {
    let res

    debug.links(`Will try to fetch links from: "${url}"`)

    try {
        res = await axios.get(url, { responseType: 'arraybuffer', transformResponse: data => zlib.gunzipSync(data).toString() })
    } catch (error) {
        debug.links(`Got error while trying to fetch links from "${url}", error is: "${error.message}"`)
        throw error
    }

    let data

    try {
        data = await parseXML(res.data)
    } catch (error) {
        debug.sitemap(`Got error while trying to parse the urls, error is: "${error.message}"`)
        throw error
    }

    const links = data.urlset.url.map(entry => entry.loc[0])

    return links
}

/**
 * Will get all URLs for articles (in code refered as a "link") for all articles on the site!
 * @param {string} [limit=5] How many concurrent requests to use!
 * @return {Promise<Array>} The array contains all article URLs!
 */

async function getAll(limit = 5) {
    let urls

    try {
        urls = await getSitemap()
    } catch (error) {
        debug.getall(`Got error while fetching all sitemap urls, error is: "${error.message}"`)
        throw error
    }

    const requestFunctions = urls.map(
        url => async () => getLinksFromUrl(url)
    )

    let res

    try {
        res = await parallel(requestFunctions, 5)
    } catch (error) {
        debug.getall(`Got error while trying to get all urls :(, error is: "${error.message}"`)
        throw error
    }

    const links = [].concat(...res)

    return links
}

module.exports = {
    getSitemap,
    getLinksFromUrl,
    getAll
}