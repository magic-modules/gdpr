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
    allowAllCookiesButtonText: 'allow all Cookies Button text',
    allowCookieButtonText: 'allow Cookie Button text',
    allowed: [],
    cookieText: 'cookie text, shown if cookies are defined',
    cookieButtonText: 'cookie Button text',
    denyCookieButtonText: 'deny Cookies Button Text',
    left: true,
    noCookieText: 'no Cookie text, shown if no cookies are defined',
    noCookieButtonText: 'no Cookie Button text',
    show: true,
    //~ right: true,
    small: true,
    title: 'Main popup title',
  },

  cookies: [
    { name: 'name', title: 'cookie title', content: 'cookie description' },
    { name: 'cookie2', title: 'cookie2 title', content: 'cookie2 info content' },
  ],
}
