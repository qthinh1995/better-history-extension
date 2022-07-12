/*global chrome*/

const history2 = [
  {
    id: "5418",
    lastVisitTime: 1657598329172.312,
    title: "",
    typedCount: 0,
    url: "https://www.mindmeister.com/map/2353948189",
    visitCount: 1,
    children: [
      {
        id: "5418",
        lastVisitTime: 1657598329172.312,
        title: "",
        typedCount: 0,
        url: "https://www.mindmeister.com/map/2353948189",
        visitCount: 1,
      },
      {
        id: "5418",
        lastVisitTime: 1657598329172.312,
        title: "",
        typedCount: 0,
        url: "https://developer.chrome.com/docs/workbox/",
        visitCount: 1,
      },
      {
        id: "5418",
        lastVisitTime: 1657598329172.312,
        title: "",
        typedCount: 0,
        url: "https://colorhunt.co/palette/54bab918978fe9dac1f7ecde",
        visitCount: 1,
        children: [
          {
            id: "5418",
            lastVisitTime: 1657598329172.312,
            title: "",
            typedCount: 0,
            url: "https://developer.chrome.com/docs/workbox/",
            visitCount: 1,
          },
          {
            id: "5418",
            lastVisitTime: 1657598329172.312,
            title: "",
            typedCount: 0,
            url: "https://colorhunt.co/palette/54bab918978fe9dac1f7ecde",
            visitCount: 1,
          },
        ],
      },
    ],
  },
  {
    id: "5418",
    lastVisitTime: 1657598329172.312,
    title: "",
    typedCount: 0,
    url: "https://developer.chrome.com/docs/workbox/",
    visitCount: 1,
  },
  {
    id: "5418",
    lastVisitTime: 1657598329172.312,
    title: "",
    typedCount: 0,
    url: "https://colorhunt.co/palette/54bab918978fe9dac1f7ecde",
    visitCount: 1,
  },
  {
    id: "5418",
    lastVisitTime: 1657598329172.312,
    title: "",
    typedCount: 0,
    url: "https://www.w3schools.com/csSref/css3_pr_text-overflow.asp",
    visitCount: 1,
  },
];
export const saveDataToStorage = (data, key) =>
  new Promise((resolve) => {
    if (!chrome?.storage?.sync?.set) return;
    chrome.storage.sync.set({ [key]: JSON.stringify(data) }, resolve);
  });

export const getDataFromStorage = (key) =>
  new Promise((resolve) => {
    if (!chrome?.storage?.sync?.get) return resolve(history2);
    chrome.storage.sync.get([key], (result) => {
      const value = result[key];
      resolve(value === undefined ? value : JSON.parse(value));
    });
  });

export const historyFindDeep = (history = [], callback: (x) => false) => {
  for (let item of history) {
    const result = callback(item);
    if (result) return item;
    const { children } = item;
    if (children) {
      const result = historyFindDeep(children, callback);
      if (result) return result;
    }
  }
};
