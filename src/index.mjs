export const View = ({ gdpr = {}, cookies = [] }) => {
  const {
    show,
    title = 'Privacy Information',
    content = 'This app neither saves, collects, nor shares any data about you.',
    noDataText = 'Awesome.',
    allowTitle = 'Allow:',
    allowAllText = 'All',
    allowText = 'Selected',
    denyText = 'None',
  } = gdpr

  if (!show) {
    return div(
      { class: 'Gdpr' },
      svg(
        {
          class: 'icon',
          onclick: [actions.gdpr.show, { show: true }],
          viewBox: '0 0 512 512',
        },
        [
          g([
            path({
              d: `
M507,208c-1-7-7-12-14-13c-7-1-13,3-16,9
c-5,11-16,19-29,19c-14,0-26-10-30-23c-2-8-11-13-19-11
C393,191,389,192,384,192c-35-0-64-29-64-64c0-5,1-9,2-14
c2-8-3-16-11-19C297,90,288,78,288,64c-0-13,8-24,19-29
c6-3,10-9,9-16c-1-7-6-12-13-14C288,2,272,0,256,0
C115,0,0,115,0,256c0,141,115,256,256,256c141-0,256-115,256-256
C512,239,510,224,507,209z M414,414C374,455,318,480,256,480s-118-25-158-66
C57,374,32,318,32,256S57,138,98,98C138,57,194,32,256,32c3,0,6,0,9,0
C259,42,256,52,256,64c0,24,13,44,33,55C288,122,288,125,288,128
c0,53,43,96,96,96c3,0,6-0,8-0C403,242,424,256,448,256
c11-0,22-3,32-8c0,3,0,6,0,9C480,318,455,374,414,414z
`,
            }),
            circle({ cx: '192', cy: '128', r: '32' }),
            circle({ cx: '128', cy: '256', r: '32' }),
            circle({ cx: '288', cy: '384', r: '32' }),
            circle({ cx: '272', cy: '272', r: '16' }),
            circle({ cx: '400', cy: '336', r: '16' }),
            circle({ cx: '176', cy: '368', r: '16' }),
          ]),
        ],
      ),
    )
  }

  const hasCookies = !!cookies.length

  return div({ class: 'Gdpr' }, [
    div({ class: 'Container' }, [
      title && h3(title),
      content && p(content),
      hasCookies && [
        ul(
          cookies.map(({ name, title, content, allowed = false }) =>
            li([
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
            input({
              class: 'allow all',
              onclick: actions.gdpr.allowAll,
              type: 'button',
              value: allowAllText,
            }),
            input({
              class: 'allow',
              onclick: actions.gdpr.allowSome,
              type: 'button',
              value: allowText,
            }),
            input({
              class: 'allow none',
              onclick: actions.gdpr.deny,
              type: 'button',
              value: denyText,
            }),
          ]
        : input({ onclick: actions.gdpr.allowSome, value: noDataText, type: 'button' }),
    ]),
  ])
}

export const state = {
  show: false,
  allowed: [],
}

export const actions = {
  gdpr: {
    show: (state, props) => {
      let { show, allowed = state.gdpr.allowed } = props

      // data coming from db
      if (props.value) {
        show = props.value.show
        if (props.value.allowed) {
          allowed = props.value.allowed
        }
      }

      if (typeof show === 'boolean') {
        state.gdpr.show = show
        state.gdpr.allowed = allowed

        return { ...state }
      }

      // return unchanged, no redraw
      return state
    },

    allowSome: state => [
      { ...state },
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

    allowAll: state => [
      { ...state },
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
      const active = state.gdpr.allowed.includes(name)

      if (!active) {
        state.gdpr.allowed.push(name)
      } else {
        state.gdpr.allowed = state.gdpr.allowed.filter(c => c !== name)
      }

      return { ...state }
    },

    deny: state => [
      state,
      [
        lib.db.set,
        {
          key: 'magic-gdpr',
          value: { allowed: [], show: false },
          action: actions.gdpr.show,
        },
      ],
    ],
  },
}

export const style = (vars = {}) => ({
  ul: {
    display: 'block',
  },

  '.icon': {
    position: 'fixed',
    left: '0.5em',
    bottom: '0.5em',
    cursor: 'pointer',

    color: vars.colors.gray[500],
    stroke: vars.colors.gray[500],
    fill: vars.colors.gray[500],

    '&:hover': {
      color: vars.colors.gray[700],
      stroke: vars.colors.gray[700],
      fill: vars.colors.gray[700],
    },
  },

  '.Container': {
    backgroundColor: vars.colors.gray[900],
    border: '1px solid',
    borderRadius: '.5em',
    color: vars.colors.gray[100],
    display: 'inline-block',
    padding: '1em',
    position: 'fixed',
    textAlign: 'left',
    left: '0.5em',
    bottom: '0.5em',

    '.light&&': {
      backgroundColor: vars.colors.gray[100],
      color: vars.colors.gray[900],
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

  'input[type=button]': {
    display: 'inline-block',
    margin: '0.5em 0',
    width: '100%',
  },

  '@media screen and (min-width: 900px)': {
    'input[type=button]': {
      margin: '1em 3% 0 0',
      maxWidth: '30%',
      width: 'auto',
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
    },
  ],
}

export const init = `[lib.db.get, { key: 'magic-gdpr', action: actions.gdpr.show }]`
