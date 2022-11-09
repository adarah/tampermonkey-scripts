import browserslistToEsbuild from 'browserslist-to-esbuild'
import { build } from 'esbuild'
import fs from 'fs'

const entryPoints = fs.readdirSync('bin').map(f => `bin/${f}`)

build({
    entryPoints,
    outdir: 'dist',
    bundle: true,
    target: browserslistToEsbuild(),
    legalComments: 'inline'
}).catch(() => process.exit(1))