import generate from 'userscript-metadata-generator';

/** @type {import('userscript-metadata-generator').Metadata} */
const metadata = {
    name: `Template Twitch's "Go Live Notification"`,
    description: `Make your life easier by templating Twitch's Go Live Notification field!`,
    version: '0.2.0',
    author: 'adarah',
    match: 'https://dashboard.twitch.tv/u/*/stream-manager',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=twitch.tv',
    homepage: 'https://github.com/adarah/tampermonkey-scripts',
    namespace: 'adarah'
}

const banner = `${generate(metadata)}
'use strict'

// Edit your template here!
// The contents in {category} will be replaced by the category you select in the Stream Manager.
const template = \`Hello viewers, I'm playing {category}!\`
`
export default banner