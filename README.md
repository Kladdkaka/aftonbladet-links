# aftonbladet-links
#### A simple scraper and NPM module to get all article links from Aftonbladet, currently 900k+ articles and counting!

---

# IMPORTANT

No support is given for Node versions under v8.0.0!

---

# Installation

`npm i --save aftonbladet-links`

---

# Usage

This should be pretty straight forward, but I included an example that dumps all article links to a json file. :)
[Click here!](./blob/master/example/get-all-links-and-dump-to-file.js)

---

# API Documentation

## Table of Contents

-   [getSitemap](#getsitemap)
-   [getLinksFromUrl](#getlinksfromurl)
-   [getAll](#getall)

## Methods

### getSitemap()

> Will get all URLs to children sitemaps (one for each month) from parent (main)

**Parameters**:

> None :)

**Returns**: **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>**
>The array contains all child sitemap URLs!

### getLinksFromUrl(url)

> Will get all URLs for articles (in code refered as a "link") from children sitemap

**Parameters**:

> `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The child sitemap URL you want to get article links from :)

**Returns**: **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>**
> The array contains all article URLs!

### getAll(limit = 5)

> Will get all URLs for articles (in code refered as a "link") for all articles on the site!

**Parameters**:

> `limit` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** How many concurrent requests to use! (optional, default `5`)

**Returns**: **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)>**
> The array contains all article URLs!
