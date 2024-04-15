/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import fs from 'node:fs'
import path from 'node:path'
import { outputFile } from 'zx-sml/docgen'

const HEADER_LINES = [
  '/**',
  ' * Created by Capricorncd.',
  ' * https://github.com/capricorncd',
  ' */',
]

export function resolve(_path) {
  return path.join(process.cwd(), _path)
}

function generateParams(params) {
  return params
    .map(
      (item) =>
        `${item.name}${!item.required ? '?' : ''}: ${item.types.join(' | ')}`
    )
    .join(', ')
}

const LIBS_DIR = resolve('../../libs')

function main() {
  // output docs
  const res = outputFile(LIBS_DIR, resolve('./README.md'))

  // output types.d.ts
  const libsReactTypeFile = resolve('./dist/types.d.ts')
  const lines = [...HEADER_LINES]
  res.data.forEach((item) => {
    if (item.type === 'method') {
      lines.push(
        `export function ${item.name}${item.generics.length ? '<' + item.generics.join(', ') + '>' : ''}(${generateParams(item.params)}): ${item.returns[0]?.types.join(' | ') ?? 'void'};`
      )
      console.log(item.params[0])
    } else if (item.type === 'type') {
      lines.push('export ' + item.codes[0], ...item.codes.slice(1))
    }
  })
  fs.writeFileSync(libsReactTypeFile, lines.join('\n'), 'utf8')
}

main()
