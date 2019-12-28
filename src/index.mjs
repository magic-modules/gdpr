export const View = ({ gdpr = {}, cookies = [] }) => {
  const {
    show,
    title = 'Privacy Information',
    content = 'This app neither saves, collects, nor shares any data about you.',
    noDataText = 'Awesome.',
    allowTitle = 'Allow:',
    allowAllText = 'all',
    allowText = 'selected',
    denyText = 'none',
  } = gdpr

  if (!show) {
    return
  }

  const hasCookies = !!cookies.length

  return div({ class: 'Gdpr' }, [
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
                title: `allow ${name} data`,
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
            h5(allowTitle),
            label(
              {
                class: 'button allow all',
                for: 'show-hide',
                onclick: actions.gdpr.allow,
              },
              allowAllText,
            ),
            label(
              {
                class: 'button allow',
                for: 'show-hide',
                onclick: actions.gdpr.close,
              },
              allowText,
            ),
            label(
              {
                class: 'button allow none',
                for: 'show-hide',
                onclick: actions.gdpr.deny,
              },
              denyText,
            ),
          ]
        : label(
            { class: 'button', for: 'show-hide', onclick: actions.gdpr.close },
            noDataText,
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
      if (props.value && typeof props.value.show !== 'undefined') {
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
  left: '3%',
  maxWidth: '94%',
  textAlign: 'center',

  ul: {
    display: 'block',
  },

  '.Container': {
    backgroundColor: vars.colors.gray[900],
    border: '1px solid',
    borderRadius: '.5em',
    color: vars.colors.gray[100],
    display: 'inline-block',
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
    margin: '0.5em 0',
    width: '100%',
  },

  '@media screen and (min-width: 900px)': {
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
      key: 'cookies',
      type: 'array',
    },
    {
      key: 'title',
      type: 'string',
    },
    {
      key: 'noDataText',
      type: 'string',
    },
    {
      key: 'allowAllText',
      type: 'string',
    },
    {
      key: 'allowText',
      type: 'string',
    },
    {
      key: 'denyText',
      type: 'string',
    },
    {
      key: 'allowTitle',
      type: 'string',
    }
  ],
}
