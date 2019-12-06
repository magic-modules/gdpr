export const View = ({
  title,
  content,
  show = true,
  small = false,
  left = false,
  right = false,
  cookies = [],
  noCookieButtonText,
  noCookieText,
  allowCookieButtonText,
  allowAllCookiesButtonText,
  denyCookieButtonText,
}) => {
  if (!show) {
    return
  }

  cookies = Object.entries(cookies)

  return div({ class: { Gdpr: true, show, small, left, right } }, [
    input({ type: 'checkbox', name: 'show-hide', id: 'show-hide', checked: !show }),
    div({ class: 'Container' }, [
      title && h3(title),
      content && p(content),
      !!cookies.length
        ? [
            gdpr.cookieText && p(gdpr.cookieText),
            ul(
              cookies
                .sort(([_, { required }]) => (required ? 0 : 1))
                .map(([name, { info, allowed = false }]) =>
                  li([
                    input({
                      type: 'checkbox',
                      title: 'allow',
                      checked: allowed,
                      onchange: [actions.gdpr.allow, { name }],
                    }),
                    label([name, info && [' - ', info]]),
                  ]),
                ),
            ),
          ]
        : p(noCookieText),

      cookies.length
        ? [
            label(
              {
                class: 'button',
                for: 'show-hide',
                onclick: [actions.gdpr.close, { allowed: true }],
              },
              allowAllCookiesButtonText,
            ),
            label(
              {
                class: 'button',
                for: 'show-hide',
                onclick: actions.gdpr.close,
              },
              allowCookieButtonText,
            ),
            label(
              {
                class: 'button',
                for: 'show-hide',
                onclick: [actions.gdpr.close, { allowed: false }],
              },
              denyCookieButtonText,
            ),
          ]
        : label(
            { class: 'button', for: 'show-hide', onclick: actions.gdpr.close },
            noCookieButtonText,
          ),
    ]),
  ])
}

export const state = {
  show: true,
  cookies: {},
  title: 'Magic Privacy Information',
  noCookieText: 'This page does neither save, collect, nor share any personal data about you.',
  noCookieButtonText: 'Awesome.',
  cookieButtonText: 'Awesome.',
  allowAllCookiesButtonText: 'Allow all',
  allowCookieButtonText: 'Allow selected',
  denyCookieButtonText: 'Deny all',
  cookieText: 'We are using the following cookies on this page',
}

export const actions = {
  gdpr: {
    show: (state, p) => ({
      ...state,
      gdpr: {
        ...state.gdpr,
        ...p.value,
      },
    }),

    load: state => [
      state,
      [effects.gdpr.readLocalStorage, { key: 'magic-gdpr', action: actions.gdpr.show }],
    ],

    close: (state, { allowed }) => {
      const { cookies } = state
      if (typeof allowed === 'boolean') {
        Object.entries(state.cookies).forEach(([name, cookie]) => {
          cookies[name] = {
            ...cookie,
            allowed,
          }
        })
      }

      return [
        {
          ...state,
          gdpr: {
            ...state.gdpr,
            show: false,
          },
          cookies,
        },
        [
          effects.gdpr.writeLocalStorage,
          { key: 'magic-gdpr', value: { cookies: state.cookies || [], show: false } },
        ],
      ]
    },
    allow: (state, props) => {
      state.cookies[props.name].allowed = true
      return {
        ...state,
      }
    },
  },
}

export const effects = {
  gdpr: {
    writeLocalStorage: (_, { key, value }) => {
      const localStorage = window.localStorage || {}
      localStorage[key] = JSON.stringify(value)
    },

    readLocalStorage: (dispatch, { key, action }) => {
      const localStorage = window.localStorage || {}

      let value = localStorage[key]
      if (typeof value !== 'undefined') {
        value = JSON.parse(value)
      }

      dispatch(action, { key, value })
    },
  },
}

export const style = (vars = {}) => ({
  bottom: '0.5em',
  position: 'fixed',
  width: '100%',
  opacity: 0,
  animation: 'showGdpr 1s 1s forwards',
  left: 0,
  textAlign: 'center',

  '&.small': {
    width: '30%',
    '&.right': {
      width: '30%',
      left: 'auto',
      right: '0.5em',
    },
    '&.left': {
      left: '0.5em',
    },
  },

  ul: {
    display: 'block',
  },

  '.Container': {
    backgroundColor: vars.colors.gray[900],
    border: '1px solid',
    borderRadius: '.5em',
    color: vars.colors.gray[100],
    display: 'inline-block',
    margin: '0 auto',
    padding: '1em',
    position: 'relative',
    textAlign: 'left',

    '.light&&': {
      backgroundColor: vars.colors.gray[100],
      color: vars.colors.gray[900],
    },
  },

  'input[type=checkbox]': {
    '&#show-hide': {
      display: 'none',
    },

    '&:checked ~ .Container': {
      opacity: 0,
      height: 0,
      width: 0,
      overflow: 'hidden',
    },
  },

  h3: {
    padding: 0,
    margin: 0,
  },

  '.button': {
    display: 'inline-block',
    margin: '1em 0 0',
  },

  '@keyframes showGdpr': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
})

export const global = {
  state: {
    cookies: true,
  },
}

export const propTypes = {
  Gdpr: [
    {
      key: 'show',
      type: 'boolean',
    },
    {
      key: 'small',
      type: 'boolean',
    },
    {
      key: 'right',
      type: 'boolean',
    },
    {
      key: 'left',
      type: 'boolean',
    },
    {
      key: 'cookies',
      type: 'array',
    },
    {
      key: 'title',
      type: ['string', 'array'],
    },
    {
      key: 'noCookieText',
      type: ['string', 'array'],
    },
    {
      key: 'noCookieButtonText',
      type: ['string', 'array'],
    },
    {
      key: 'cookieButtonText',
      type: ['string', 'array'],
    },
    {
      key: 'allowAllCookiesButtonText',
      type: ['string', 'array'],
    },
    {
      key: 'allowCookieButtonText',
      type: ['string', 'array'],
    },
    {
      key: 'denyCookieButtonText',
      type: ['string', 'array'],
    },
    {
      key: 'cookieText',
      type: ['string', 'array'],
    },
  ],
}

// export const cookies = {
//   'test-cookie-name-required': {
//     info: 'required test cookie info',
//     required: true,
//     value: 'test-cookie-value',
//   },
//   'test-cookie-name': { info: 'test cookie info', value: 'test-cookie-value' },
// }
