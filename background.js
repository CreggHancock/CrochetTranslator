function messageTab(tabs, translateTo) {
  browser.tabs.sendMessage(tabs[0].id, { translateTo: translateTo });
}

function onExecuted(_result, translateTo) {
  let querying = browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  querying.then((tabs) => messageTab(tabs, translateTo));
}

let initialized = false;

function translateClicked(translateTo) {
  if (initialized) {
    onExecuted(null, translateTo);
    return;
  }

  let executing = browser.tabs.executeScript({ file: "translator.js" });
  executing
    .then((result) => {
      initialized = true;
      onExecuted(result, translateTo);
    })
    .catch((err) => console.error("failed to execute script: ", err));
}

browser.contextMenus.create({
  id: "translate-crochet-uk-us",
  title: "From UK to US",
});

browser.contextMenus.create({
  id: "translate-crochet-us-uk",
  title: "From US to UK",
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "translate-crochet-uk-us":
      translateClicked("US");
      break;
    case "translate-crochet-us-uk":
      translateClicked("UK");
      break;
  }
});
