const translations = [
  ["dc", "sc"],
  ["htr", "hdc"],
  ["tr", "dc"],
  ["hdtr", "htr"],
  ["dtr", "tr"],
  ["trtr", "dtr"],
  ["double crochet", "single crochet"],
  ["half treble crochet", "half double crochet"],
  ["treble crochet", "double crochet"],
  ["half double treble crochet", "half triple/treble crochet"],
  ["double treble crochet", "triple/treble crochet"],
  ["triple treble crochet", "double triple/treble crochet"],
];

function translateBlock(block, sourceIndex, destinationIndex) {
  for (let i = 0; i < translations.length; i++) {
    let translationRegex = new RegExp(
      `(?<!\\w)${translations[i][sourceIndex]}(?!\\w)`,
      "g",
    );
    block = block.replaceAll(
      translationRegex,
      translations[i][destinationIndex],
    );
  }

  return block;
}

function translateReceiver(request, _sender, _sendResponse) {
  const selection = window.getSelection();
  let translatedText = selection.anchorNode.textContent;
  if (selection && selection.anchorNode) {
    switch (request.translateTo) {
      case "US":
        translatedText = translateBlock(selection.anchorNode.textContent, 0, 1);
        break;
      case "UK":
        translatedText = translateBlock(selection.anchorNode.textContent, 1, 0);
        break;
    }

    selection.anchorNode.textContent = translatedText;
  }
}

browser.runtime.onMessage.addListener(translateReceiver);
