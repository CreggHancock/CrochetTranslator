function messageTab(tabs) {
  browser.tabs.sendMessage(tabs[0].id, {});
}

function onExecuted(result) {
  let querying = browser.tabs.query({
    active: true,
    currentWindow: true
  });
  querying.then(messageTab);
}

browser.contextMenus.create(
  {
    id: "translate-crochet",
    title: "Translate Crochet",
  },
);

browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "translate-crochet":
      let executing = browser.tabs.executeScript({ file: "translator.js" });
      executing.then(onExecuted);
      break;
  }
});
