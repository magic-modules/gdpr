## @magic-modules/gdpr

[gdpr](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) compliance for [@magic](https://magic.github.io/core)

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[npm-image]: https://img.shields.io/npm/v/@magic-modules/gdpr.svg
[npm-url]: https://www.npmjs.com/package/@magic-modules/gdpr
[travis-image]: https://img.shields.io/travis/com/magic-modules/gdpr/master
[travis-url]: https://travis-ci.com/magic-modules/gdpr
[appveyor-image]: https://img.shields.io/appveyor/ci/magicmodules/gdpr/master.svg
[appveyor-url]: https://ci.appveyor.com/project/magicmodules/gdpr/branch/master
[coveralls-image]: https://coveralls.io/repos/github/magic-modules/gdpr/badge.svg
[coveralls-url]: https://coveralls.io/github/magic-modules/gdpr
[greenkeeper-image]: https://badges.greenkeeper.io/magic-modules/gdpr.svg
[greenkeeper-url]: https://badges.greenkeeper.io/magic-modules/gdpr.svg
[snyk-image]: https://snyk.io/test/github/magic-modules/gdpr/badge.svg
[snyk-url]: https://snyk.io/test/github/magic-modules/gdpr

#### install:
```bash
npm install --save-exact @magic-modules/gdpr
```

#### usage:
gdpr is different than most modules,
it gets loaded automatically, once installed.

to change content and variables, add the following to /src/app.mjs#state
```javascript
// src/app.mjs
export const state = {
  gdpr: {
    title: 'Title text for the gdpr popup',
    content: 'String or Array of Magic modules',
    noCookieText: 'String or Array of Magic modules',
    noCookieButtonText: 'String or Array of Magic modules',
    cookieButtonText: 'String or Array of Magic modules',
    allowAllCookiesButtonText: 'String or Array of Magic modules',
    allowCookieButtonText: 'String or Array of Magic modules',
    denyCookieButtonText: 'String or Array of Magic modules',
    cookieText: 'String or Array of Magic modules',
    show: true,
    small: false,
    left: false,
    right: false,
  },
  cookies: [
    ['cookie name 1', { info: 'cookie info text' } ],
    ['cookie name 2', { info: [p('cookie info array'), 'cookie info array' ] }]
  ],
})
```

#### changelog

##### 0.0.1
first commit

##### 0.0.2
use @magic npm packages instead of github for installs

##### 0.0.3
remove unneeded dependency

##### 0.0.4
fix link in readme

##### 0.0.5 - unreleased
use @magic-libraries/db as store
