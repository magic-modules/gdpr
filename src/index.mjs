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
    return div(
      { class: 'Gdpr' },
      svg(
        { class: 'ShowHide', onclick: [actions.gdpr.show, { show: true }], viewBox: '0 0 512 512' },
        [
          g([
            path({
              d: `
M507.44,208.64c-1.296-6.88-6.88-12.096-13.824-12.928c-6.96-0.832-13.6,2.928-16.48,9.312
c-5.072,11.2-16.208,18.992-29.12,18.976c-14.32,0.032-26.416-9.632-30.448-22.896c-2.432-8.096-10.752-12.896-18.976-10.976
C393.536,191.312,388.752,192,384,192c-35.248-0.064-63.936-28.752-64-64c0-4.752,0.688-9.536,1.872-14.576
c1.936-8.224-2.88-16.56-10.976-18.992C297.632,90.416,287.968,78.32,288,64c-0.016-12.928,7.776-24.048,18.976-29.12
c6.384-2.88,10.144-9.536,9.312-16.48c-0.832-6.96-6.048-12.544-12.928-13.84C288.096,1.696,272.288,0,256,0
C114.784,0.032,0.032,114.784,0,256c0.032,141.216,114.784,255.968,256,256c141.216-0.032,255.968-114.784,256-256
C512,239.712,510.304,223.904,507.44,208.64z M414.32,414.32C373.696,454.912,317.792,480,256,480s-117.696-25.088-158.32-65.68
C57.088,373.696,32,317.792,32,256S57.088,138.304,97.68,97.68C138.304,57.088,194.208,32,256,32c2.88,0,5.696,0.304,8.56,0.432
C259.216,41.744,256.016,52.464,256,64c0.032,23.888,13.28,44.368,32.592,55.296C288.288,122.144,288,124.992,288,128
c0.032,52.976,43.024,95.968,96,96c3.008,0,5.856-0.288,8.704-0.592C403.632,242.704,424.096,255.968,448,256
c11.536-0.016,22.256-3.216,31.568-8.56c0.128,2.848,0.432,5.68,0.432,8.56C480,317.792,454.912,373.696,414.32,414.32z
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
        : label({ class: 'button', for: 'show-hide', onclick: actions.gdpr.close }, noDataText),
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
          allowed: state.cookies.map(c => c.name),
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
      { ...state, gdpr: { ...state.gdpr, allowed: [] } },
      [
        lib.db.set,
        {
          key: 'magic-gdpr',
          value: { allowed: [], show: false },
          action: [actions.gdpr.show, { show: false }],
        },
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

  '.ShowHide': {
    position: 'fixed',
    left: '1em',
    bottom: '1em',
    width: '2em',
    height: '2em',

    color: vars.colors.gray[100],
    stroke: vars.colors.gray[100],
    fill: vars.colors.gray[100],

    '&:hover': {
      color: vars.colors.gray[500],
      stroke: vars.colors.gray[500],
      fill: vars.colors.gray[500],
    },

    '.light&&': {
      color: vars.colors.gray[900],
      stroke: vars.colors.gray[900],
      fill: vars.colors.gray[900],

      '&:hover': {
        color: vars.colors.gray[600],
        stroke: vars.colors.gray[600],
        fill: vars.colors.gray[600],
      },
    },
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
    },
  ],
}

export const init = `[lib.db.get, { key: 'magic-gdpr', action: actions.gdpr.show }]`
