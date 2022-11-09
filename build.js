import browserslistToEsbuild from 'browserslist-to-esbuild';
import { build } from 'esbuild';
import fs from 'fs';

fs.readdirSync('bin').forEach(async f => {
    const dir = `./bin/${f}`
    const metadata = await import(`${dir}/metadata.js`)
    await build({
        entryPoints: [`${dir}/main`],
        outdir: `dist/${f}`,
        bundle: true,
        target: browserslistToEsbuild(),
        legalComments: 'inline',
        banner: {
            js: metadata.default
        }
    })
});


process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit(1)
})