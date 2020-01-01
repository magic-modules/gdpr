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
    { name: 'name', title: 'cookie title', content: 'cookie description' },
    { name: 'cookie2', title: 'cookie2 title', content: 'cookie2 info content' },
  ],
}
