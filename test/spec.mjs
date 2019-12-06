import { is } from '@magic/test'
import * as Gdpr from '../src/index.mjs'

export default [
  {
    fn: () => Gdpr.View,
    expect: is.function,
    info: 'expect Gdpr.View to be a function',
  },
  {
    fn: () => Gdpr.propTypes.Gdpr,
    expect: is.array,
    info: 'expect Gdpr.propTypes.Gdpr to be an array',
  },
]
