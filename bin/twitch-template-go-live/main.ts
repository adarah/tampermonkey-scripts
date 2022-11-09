import { observe, type Observer } from '@/dom'

class Templater implements Observer {
    private _observer?: MutationObserver

    onMount(el: Element) {
        if (!(el instanceof HTMLInputElement)) return
        console.log('mounted')

        const updateTemplateCallback = (mutations: MutationRecord[]) => {
            const record = mutations[mutations.length - 1]
            const target = record?.target as HTMLInputElement | undefined
            if (target === undefined) return
            this.setGoLiveNotif(target)
        }

        this.setGoLiveNotif(el)
        this._observer = new MutationObserver(updateTemplateCallback)
        this._observer.observe(el, { attributeFilter: ['value'] })
    }

    onDestroy() {
        console.log('destroy')
        this._observer?.disconnect()
    }

    private setGoLiveNotif(categoryInput: HTMLInputElement) {
        // @ts-expect-error this variable is defined in the banner, see metadata.js
        const msg = template.replaceAll('{category}', categoryInput.value)

        const el = document.getElementById('edit-broadcast-go-live-formgroup') as HTMLTextAreaElement | null
        if (el === null) throw Error('Go Live textarea was not found!')
        el.value = msg
    }

}

function main() {
    const tpl = new Templater()
    observe('#dropdown-search-input', tpl)
}

main()