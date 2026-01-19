const mutObserver = new MutationObserver(() => {
    const element = document.querySelector(".bzXtMb.M8OgIe.dRpWwb")
    if(element) element.remove()
})

mutObserver.observe(document, { childList: true, subtree: true })