export const View = state => [
  h1(state.title),
  p([
    'this is the ',
    Link({ to: 'https://github.com/magic-modules' }, '@magic-modules'),
    ' Gdpr component. ',
    state.description,
  ]),

  Pre(
    Object.entries(state.gdpr)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n'),
  ),

  GitBadges('magic-modules/gdpr'),

  h2({ id: 'installation' }, 'installation:'),
  Pre('npm install @magic-modules/gdpr'),

  h2({ id: 'usage' }, 'usage:'),

  p('gdpr gets loaded automatically after being installed.'),
  p('to configure it, add the object below to /src/app.mjs'),

  Pre(`
// /src/app.mjs
export const state = {
  gdpr: {
    show: false, // || true
    small: false, // if true, component has 30% of screen.
    left: false, // popup is positioned to the left if true
    right: false, // popup is positioned to the right if true
    title: 'Main popup title',
    content: 'text of cookie popup',
    noCookieText: 'String or Array of Magic modules',
    noCookieButtonText: 'String or Array of Magic modules',
    cookieButtonText: 'String or Array of Magic modules',
    allowAllCookiesButtonText: 'String or Array of Magic modules',
    allowCookieButtonText: 'String or Array of Magic modules',
    denyCookieButtonText: 'String or Array of Magic modules',
    cookieText: 'String or Array of Magic modules',
  },
  cookies: [
    ['name', { title: 'cookie1 title', content: 'cookie description' }],
    ['cookie 2', { title: 'cookie title', content: 'cookie content' }],
  ],
})
`),

  h2({ id: 'source' }, 'source'),
  p([
    'the source for this page is in the ',
    Link({ to: 'https://github.com/magic-modules/gdpr/tree/master/example' }, 'example directory'),
    ' and gets built and published to github using ',
    Link({ to: 'https://github.com/magic/core' }, '@magic/core'),
  ]),

  LightSwitch(state),
]
