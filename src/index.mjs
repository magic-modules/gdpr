export const View = ({ gdpr = {}, cookies = [] }) => {
  const {
    show = true,
    small = false,
    left = false,
    right = false,
    title = 'Magic Privacy Information',
    noCookieText = 'This page does neither save, collect, nor share any personal data about you.',
    noCookieButtonText = 'Awesome.',
    allowAllCookiesButtonText = 'Allow all',
    allowCookieButtonText = 'Allow selected',
    denyCookieButtonText = 'Deny all',
    cookieText = 'We are using the following data on this page.',
  } = gdpr

  if (!show) {
    return
  }

  const hasCookies = !!cookies.length

  const content = hasCookies ? cookieText : noCookieText

  return div({ class: { Gdpr: true, show, small, left, right } }, [
    input({ type: 'checkbox', name: 'show-hide', id: 'show-hide', checked: !show }),
    div({ class: 'Container' }, [
      title && h3(title),
      content && p(content),
      hasCookies && [
        ul(
          cookies.map(({ name, title, content, allowed = false }) =>
            li({ class: 'Cookie' }, [
              input({
                type: 'checkbox',
                title: 'allow',
                id: name,
                checked: gdpr.allowed.includes(name),
                onchange: [actions.gdpr.toggleAllow, { name }],
              }),
              (title || content) &&
                label({ for: name }, [title && h4(title), content && p(content)]),
            ]),
          ),
        ),
      ],

      hasCookies
        ? [
            label(
              {
                class: 'button',
                for: 'show-hide',
                onclick: actions.gdpr.allow,
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
                onclick: actions.gdpr.deny,
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
  allowed: [],
}

export const actions = {
  gdpr: {
    show: (state, props) => {
      if (props.value) {
        state.gdpr = {
          ...state.gdpr,
          ...props.value,
        }
      }

      return state
    },

    load: state => [state, [lib.db.get, { key: 'magic-gdpr', action: actions.gdpr.show }]],

    close: state => [
      {
        ...state,
        gdpr: {
          ...state.gdpr,
          show: false,
        },
      },
      [
        lib.db.set,
        {
          key: 'magic-gdpr',
          value: {
            allowed: state.gdpr.allowed,
            show: false,
          },
          action: actions.gdpr.show,
        },
      ],
    ],

    allow: state => [
      {
        ...state,
        gdpr: {
          ...state.gdpr,
          show: false,
        },
      },
      [
        lib.db.set,
        {
          key: 'magic-gdpr',
          value: {
            allowed: state.cookies.map(c => c.name),
            show: false,
          },
          action: actions.gdpr.show,
        },
      ],
    ],

    toggleAllow: (state, { name }) => {
      const { gdpr } = state

      const active = gdpr.allowed.includes(name)

      if (!active) {
        gdpr.allowed.push(name)
      } else {
        gdpr.allowed = gdpr.allowed.filter(c => c !== name)
      }

      return {
        ...state,
        gdpr,
      }
    },

    deny: state => [state, [lib.db.del, { key: 'magic-gdpr', action: actions.gdpr.show }]],
  },
}

export const style = (vars = {}) => ({
  bottom: '0.5em',
  position: 'fixed',
  width: '50%',
  opacity: 0,
  animation: 'showGdpr 1s 1s forwards',
  left: '25%',
  textAlign: 'center',

  '&.small': {
    width: '33.332%',
    left: '33.332%',
  },
  '&.small.right, &.right': {
    left: 'auto',
    right: '0.5em',
  },
  '&.small.left, &.left': {
    left: '0.5em',
  },

  ul: {
    display: 'block',
  },

  '.Container': {
    backgroundColor: vars.colors.gray[900],
    border: '1px solid',
    borderRadius: '.5em',
    color: vars.colors.gray[100],
    display: 'block',
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

  h4: {
    display: 'inline',
    fontWeight: 'bold',
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
      type: 'string',
    },
    {
      key: 'noCookieText',
      type: 'string',
    },
    {
      key: 'noCookieButtonText',
      type: 'string',
    },
    {
      key: 'allowAllCookiesButtonText',
      type: 'string',
    },
    {
      key: 'allowCookieButtonText',
      type: 'string',
    },
    {
      key: 'denyCookieButtonText',
      type: 'string',
    },
    {
      key: 'cookieText',
      type: 'string',
    },
  ],
}
