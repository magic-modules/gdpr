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

  h3('activate:'),
p('to activate Gdpr, add it to the list of hoisted modules'),
Pre(`
// src/config.mjs
export default {
  // ... other config variables

  HOIST: ['Gdpr'],
}
`),
p('after doing this, the gdpr module will show up.'),

h3('change contents, add cookies:'),

  Pre(`
// /src/app.mjs
export const state = {
  gdpr: {
    allowAllText: 'button text for allow all data',
    allowText: 'button text for allow selected data',
    allowTitle: 'Title above the three cookie buttons',
    content: 'String or Array of Magic modules',
    denyText: 'button text for no data allowed',
    noDataText: 'Button text if no cookies are defined',
    title: 'Title text for the gdpr popup',
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
