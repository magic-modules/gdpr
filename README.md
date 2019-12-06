## @magic-modules/gdpr

[https://en.wikipedia.org/wiki/General_Data_Protection_Regulation](gdpr) compliance for [@magic](https://magic.github.io/core)

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
```javascript
// in any module View
export const View = () => Gdpr()
```

#### full options:
```javascript
Gdpr({
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
