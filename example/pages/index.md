# ${state.title}

this is the
[@magic-modules](https://github.com/magic-modules)
Gdpr component.

${state.description}

<GitBadges>magic-modules/gdpr</GitBadges>

## installation:

<Pre>npm install --save-exact @magic-modules/gdpr</Pre>

## usage

### activate

to activate Gdpr, add it to the list of hoisted modules

<Pre>
// src/config.mjs
export default {
  // ... other config variables

  HOIST: ['Gdpr'],
}
</Pre>

after doing this, the gdpr module will show up.'),

### change contents, add cookies

<Pre>
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
</Pre>

## source

the source for this page is in the
[example directory](https://github.com/magic-modules/gdpr/tree/master/example),
and gets built and published to github using
[@magic/core](https://github.com/magic/core)
