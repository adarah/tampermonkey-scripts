import { waitForEl } from '@/dom'

function setGoLiveNotif(msg: string) {
    const el = document.getElementById('edit-broadcast-go-live-formgroup') as HTMLTextAreaElement | null
    if (el === null) throw Error('Go Live textarea was not found!')
    el.value = msg
}

function updateTemplateCallback(records: MutationRecord[]) {
    const record = records[records.length - 1]
    const target = record?.target as HTMLInputElement | undefined
    if (target === undefined) return
    // @ts-expect-error this variable is defined in the banner, see metadata.js
    const msg = template.replaceAll('{category}', target.value)
    setGoLiveNotif(msg)
}

waitForEl('#dropdown-search-input')
    .then(el => {
        const observer = new MutationObserver(updateTemplateCallback)
        observer.observe(el, { attributeFilter: ['value'] })
    })
