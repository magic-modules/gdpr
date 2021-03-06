export const state = {
  title: '@magic-modules/gdpr',
  description:
    'adds a gdpr compliant information popup with minimal intrusion and complexity to your page.',
  logotext: 'Gdpr',

  menu: [
    { to: '/#installation', text: 'installation' },
    { to: '/#usage', text: 'usage' },
    { to: '/#source', text: 'source' },
  ],
  gdpr: {
    allowAllText: 'all',
    allowText: 'selected',
    allowTitle: 'Title above the three cookie buttons',
    allowed: [],
    content: 'Popup content text',
    denyText: 'none',
    noDataText: 'Button text if no cookies are defined',
    show: true,
    title: 'Popup title',
  },

  cookies: [
    { name: 'name1', title: 'cookie 1 title', content: 'cookie 1 description' },
    { name: 'name2', title: 'cookie 2 title', content: 'cookie 2 description' },
  ],
}
