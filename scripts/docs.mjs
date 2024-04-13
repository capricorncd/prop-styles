import path from 'node:path'
import { outputFile } from 'zx-sml/docgen'

export function resolve(_path) {
  return path.join(process.cwd(), _path)
}
const LIBS_DIR = resolve('./libs')

function main() {
  const res = outputFile(LIBS_DIR, resolve('./libs/react/README.md'))
  console.log(res)
}

main()
