import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { extname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

const DIRS = ['src', 'scripts', 'supabase', '.github']
const ROOT_FILES = [/^index\.html$/, /^vite\.config\.ts$/, /^tsconfig.*\.json$/]
const SKIP_DIRS = new Set(['node_modules', 'dist'])
const SKIP_FILES = new Set(['src/types/database.ts', 'scripts/check-rules.mjs'])

const CODE_EXT = new Set(['.ts', '.vue', '.mjs', '.css', '.json', '.html'])
const HASH_EXT = new Set(['.yml', '.yaml', '.toml'])

const STRING = /(['"`])(?:\\.|(?!\1)[^\\])*\1/g
const LINE_COMMENT = /(?:^|\s)\u002f\u002f/
const BLOCK_COMMENT = /\u002f\u002a/
const HTML_COMMENT = /\u003c\u0021--/
const SQL_COMMENT = /(?:^|\s)--/
const HASH_COMMENT = /^\s*\u0023/

const DASH = /\u2014/
const EMOJI = /\p{Emoji_Presentation}|\p{Extended_Pictographic}\uFE0F/u
const HEX = /(?<!&)\u0023[0-9a-fA-F]{3,8}\b/
const INLINE_STYLE = /(?<![\w:.-])style=["']/
const PALETTE = /\b(?:text|bg|border)-(?:red|green|teal|slate|gray|blue|zinc|neutral|stone)-[0-9]/
const SCRIPT_OPEN = /^\s*<script\b/
const SCRIPT_CLOSE = /<\/script>/

function walk (dir, out) {
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (entry.isFile()) out.push(full)
  }
  return out
}

function collectFiles () {
  const files = readdirSync(ROOT, { withFileTypes: true })
    .filter(entry => entry.isFile() && ROOT_FILES.some(pattern => pattern.test(entry.name)))
    .map(entry => join(ROOT, entry.name))
  for (const dir of DIRS) walk(join(ROOT, dir), files)
  return files
}

function toPosix (file) {
  return relative(ROOT, file).split(sep).join('/')
}

function hasComment (ext, line) {
  if (CODE_EXT.has(ext)) {
    const code = line.replace(STRING, '""')
    return LINE_COMMENT.test(code) || BLOCK_COMMENT.test(code) || HTML_COMMENT.test(code)
  }
  if (ext === '.sql') {
    const code = line.replace(STRING, "''")
    return SQL_COMMENT.test(code) || BLOCK_COMMENT.test(code)
  }
  if (HASH_EXT.has(ext)) return HASH_COMMENT.test(line)
  return false
}

function checkFile (file, rel) {
  const ext = extname(file)
  const isVue = ext === '.vue'
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  const found = []
  let inScript = false

  lines.forEach((line, index) => {
    const report = rule => found.push(`${rel}:${index + 1} ${rule}`)
    if (isVue && SCRIPT_OPEN.test(line)) inScript = true

    if (hasComment(ext, line)) report('comment')
    if (DASH.test(line)) report('dash')
    if (EMOJI.test(line)) report('emoji')
    if (isVue && !inScript && HEX.test(line)) report('hex')
    if (isVue && INLINE_STYLE.test(line)) report('inline-style')
    if ((isVue || ext === '.ts') && PALETTE.test(line)) report('palette')

    if (isVue && SCRIPT_CLOSE.test(line)) inScript = false
  })

  return found
}

const violations = collectFiles()
  .map(file => [file, toPosix(file)])
  .filter(([, rel]) => !SKIP_FILES.has(rel))
  .sort(([, a], [, b]) => a.localeCompare(b))
  .flatMap(([file, rel]) => checkFile(file, rel))

for (const line of violations) console.log(line)

if (violations.length > 0) {
  console.log(`\nНарушений: ${violations.length}`)
  process.exitCode = 1
}
