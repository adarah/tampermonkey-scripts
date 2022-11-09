/*! ==UserScript==
@name         Template Twitch's "Go Live Notification"
@namespace    http://tampermonkey.net/
@version      0.1
@description  Make your life easier by templating Twitch's Go Live Notification field!
@author       https://github.com/adarah
@match        https://dashboard.twitch.tv/u/*\/stream-manager
@icon         https://www.google.com/s2/favicons?sz=64&domain=twitch.tv
@grant        none
==/UserScript== */
import { waitForEl } from '@/dom'

// Edit your template here!
// The contents in {category} will be replaced by the category you select in the Stream Manager.
let template = `Hello viewers, I'm playing {category}!`


// Code below

function setGoLiveNotif(msg: string) {
    const el = document.getElementById('edit-broadcast-go-live-formgroup') as HTMLTextAreaElement | null
    if (el === null) throw Error('Go Live textarea was not found!')
    el.value = msg
}

function updateTemplateCallback(records: MutationRecord[]) {
    const record = records[records.length - 1]
    const target = record?.target as HTMLInputElement | undefined
    if (target === undefined) return
    const msg = template.replaceAll('{category}', target.value)
    setGoLiveNotif(msg)
}

waitForEl('#dropdown-search-input')
    .then(el => {
        const observer = new MutationObserver(updateTemplateCallback)
        observer.observe(el, { attributeFilter: ['value'] })
    })
