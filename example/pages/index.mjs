export const View = state => [
  h1(state.title),
  p([
    'this is the ',
    Link({ to: 'https://github.com/magic-modules' }, '@magic-modules'),
    ' Gdpr component. ',
    state.description,
  ]),

  GitBadges('magic-modules/gdpr'),

  h2({ id: 'installation' }, 'installation:'),
  Pre('npm install magic-modules/gdpr'),

  h2({ id: 'usage' }, 'usage:'),

  Pre(`
// in a page, after install, no import required
export const View = () => Gdpr()
`),

  h3({ id: 'usage-arguments' }, 'arguments'),
  Pre(`
Gdpr({
  show: false, // || true
  small: false, // if true, component has 30% of screen.
  left: false, // popup is positioned to the left if true
  right: false, // popup is positioned to the right if true
  title: 'Main popup title',
  content: [p('text of cookie'), p('popup'),
  cookies: [
    ['name', { info: 'cookie description' }],
    ['cookie 2', { info: [h3('cookie title', 'cookie content'] }],
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
