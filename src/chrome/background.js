/* eslint-disable no-undef */
import {
  saveDataToStorage,
  getDataFromStorage,
  historyFindDeep,
} from "../utils";

const changeActiveURL = async (newActiveURL) => {
  const activeURLs = (await getDataFromStorage("activeURLs")) || [];
  if (newActiveURL !== activeURLs[0]) {
    setTimeout(() => {
      activeURLs.unshift(newActiveURL);
      saveDataToStorage(activeURLs.slice(0, 2), "activeURLs");
    }, 100);
  }
};

chrome.tabs.onActivated.addListener((x) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
    changeActiveURL(tabs[0].url);
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.url && tab.active) {
    changeActiveURL(tab.url);
  }
});

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//
// });
chrome.history.onVisited.addListener((x) => {
  chrome.history.getVisits({ url: x.url }, async (y) => {
    if (y[y.length - 1].transition === "link") {
      const history = (await getDataFromStorage("history")) || [];

      if (
        !historyFindDeep(history, (historyItem) => historyItem.url === x.url)
      ) {
        const activeURLs = await getDataFromStorage("activeURLs");
        console.log("history: ", history, activeURLs);

        //find the parent
        const parent =
          activeURLs[0] &&
          historyFindDeep(
            history,
            (historyItem) => historyItem.url === activeURLs[0]
          );

        if (parent) {
          const { children = [] } = parent;
          children.push(x);
          parent.children = children;
        } else {
          history.push(x);
        }

        saveDataToStorage(history, "history");
      }
    }
  });
});