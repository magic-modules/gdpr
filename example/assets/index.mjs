import path from 'path'

import * as P from '../../src/index.mjs'

const dirName = new URL(import.meta.url).pathname

const lib = path.resolve(path.join(dirName, '..', '..', '..', 'src', 'lib', 'index.mjs'))

export const Pre = {
  ...P,
  lib,
}
