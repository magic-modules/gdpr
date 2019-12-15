export const View = ({ gdpr = {}, cookies = [] }) => {
  const {
    show,
    small = false,
    left = false,
    right = false,
    title = 'Magic Privacy Information',
    content = 'This app neither saves, collects, nor shares any data about you.',
    noCookieButtonText = 'Awesome.',
    allowAllCookiesButtonText = 'Allow all',
    allowCookieButtonText = 'Allow selected',
    denyCookieButtonText = 'Deny all personal data',
  } = gdpr

  if (!show) {
    return
  }

  const hasCookies = !!cookies.length

  return div({ class: { Gdpr: true, small, left, right } }, [
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
                class: 'button allow all',
                for: 'show-hide',
                onclick: actions.gdpr.allow,
              },
              allowAllCookiesButtonText,
            ),
            label(
              {
                class: 'button allow',
                for: 'show-hide',
                onclick: actions.gdpr.close,
              },
              allowCookieButtonText,
            ),
            label(
              {
                class: 'button allow none',
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
      let { show } = props
      if (typeof props.value.show !== 'undefined') {
        show = props.value.show
      }

      if (typeof show !== 'undefined') {
        return {
          ...state,
          gdpr: {
            ...state.gdpr,
            show,
          },
        }
      }

      // return unchanged, no redraw
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
          action: [actions.gdpr.show, { show: false }],
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
          action: [actions.gdpr.show, { show: false }],
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

    deny: state => [
      state,
      [
        lib.db.set,
        { key: 'magic-gdpr', value: { allowed: [], show: false }, action: [actions.gdpr.show, { show: false }] },
      ],
    ],
  },
}

export const style = (vars = {}) => ({
  bottom: '0.5em',
  position: 'fixed',
  opacity: 0,
  animation: 'showGdpr 1s 1s forwards',
  left: '5%',
  textAlign: 'center',
  width: '90%',

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
    margin: '0 0 0.5em',
    width: '100%',
  },

  '@media screen and (min-width: 600px)': {
    maxWidth: '50%',
    left: '25%',
    width: 'auto',

    '&.small.right, &.right': {
      left: 'auto',
      right: '0.5em',
    },
    '&.small.left, &.left': {
      left: '0.5em',
    },
  },

  '@media screen and (min-width: 900px)': {
    '&.small': {
      left: '33.332%',
      maxWidth: '33.332%',
    },

    '.button': {
      margin: '1em 3% 0 0',
      maxWidth: '30%',
      width: 'auto',
    },
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
  ],
}
