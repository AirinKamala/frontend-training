import { readFileSync } from 'node:fs'

const file = process.argv[2]
const msg = readFileSync(file, 'utf8').split('\n')[0].trim()

const types = ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'perf', 'test']
const pattern = new RegExp(`^(${types.join('|')})\\s?:\\s.+`)

if (!pattern.test(msg)) {
  console.error(`\nCommit message tidak sesuai format.\n\nFormat: <type> : <subject>\nType: ${types.join(', ')}\nContoh: fix : bug fixing this bug\n\nPesan kamu: "${msg}"\n`)
  process.exit(1)
}
