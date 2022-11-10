import generate from 'userscript-metadata-generator';

/** @type {import('userscript-metadata-generator').Metadata} */
const metadata = {
    name: `Template Twitch's "Go Live Notification"`,
    description: `Make your life easier by templating Twitch's Go Live Notification field!`,
    version: '0.3.0',
    author: 'adarah',
    match: 'https://dashboard.twitch.tv/u/*',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=twitch.tv',
    homepage: 'https://github.com/adarah/tampermonkey-scripts',
    namespace: 'adarah'
}

const banner = `${generate(metadata)}
'use strict'

// Edit your template here!
// The contents in {category} will be replaced by the category you select in the Stream Manager.
const template = \`Hello viewers, I'm playing {category}!\`

// For advanced users!
// You can generate your own dynamic messages by defining a javascript function called \`genMessage\`.
// (if genMessage is defined, then the template variable is ignored)
// It should take a {category} string as input and return a fully formed string.
// Below is a pretty complex example. Uncomment it and edit to your liking:
/*
function genMessage(category) {
    if (category === 'Pokémon Unite') {
        return \`Pikachu I choose you! Playing \${category}!\`
    }

    const now = new Date()
    switch (now.getDay()) {
        case 1:
            return \`Got them Monday feels. Playing \${category}.\`
        case 6:
            return \`Woohoo it's Saturday! I'll be playing \${category} ;P\`
        default:
            return \`I don't usually stream today but I'll be making an exception for \${category}!\`
    }
}
*/

`


export default banner