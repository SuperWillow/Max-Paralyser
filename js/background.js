var savedData = {
    "bannedList": null,
    "urlList": null
}

const loadData = (key, file) => {
    fetch(chrome.runtime.getURL("data/" + file))
    .then((response) => {
        if(!response.ok) {
            console.log("whoops, error trying to load data from " + file + "! check your extension files")
        }

        return response.json()
    })
    .then((data) => {
        savedData[key] = data
    })
}

loadData("bannedList", "banned_list.json")
loadData("urlList", "url_list.json")

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.url && !(changeInfo.url.startsWith("https://www.google")) && savedData.bannedList.some((element) => changeInfo.url.startsWith(element))) {
        let selectedURL = savedData["urlList"][Math.floor(Math.random() * savedData["urlList"].length)]
        chrome.tabs.update(null, { url: selectedURL})
    }
})