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