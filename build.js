import browserlist from 'browserslist';
import { build } from 'esbuild';
import { esbuildPluginBrowserslist } from 'esbuild-plugin-browserslist';
import fs from 'fs';

fs.readdirSync('bin').forEach(async f => {
    const dir = `./bin/${f}`
    const metadata = await import(`${dir}/metadata.js`)
    await build({
        entryPoints: [`${dir}/main`],
        outdir: `dist/${f}`,
        bundle: true,
        plugins: [
            esbuildPluginBrowserslist(browserlist(), { printUnknownTargets: false })
        ],
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