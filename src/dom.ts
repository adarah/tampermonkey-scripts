export async function waitForEl(selector: string): Promise<Element> {
    const findNode = (selector: string) => document.querySelector(selector)
    const n = findNode(selector)
    if (n) {
        return Promise.resolve(n);
    }
    return new Promise(resolve => {
        const observer = new MutationObserver(_mutations => {
            const n = findNode(selector)
            if (n) {
                resolve(n)
                observer.disconnect();
            }
        })
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

export type OnMountCallback = (el: Element) => void
export type OnDestroyCallback = VoidFunction
export interface Observer {
    onMount: OnMountCallback
    onDestroy: OnDestroyCallback
}

// Returns a function that stops the observer
export function observe(selector: string, observer: Observer): VoidFunction {
    let mounted = false
    const mutObserver = new MutationObserver(_records => {
        const el = document.querySelector(selector)
        if (!mounted && el) {
            mounted = true
            observer.onMount(el)
            return
        }
        if (mounted && !el) {
            mounted = false
            observer.onDestroy()
            return
        }
    })

    mutObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
    return () => mutObserver.disconnect()
}