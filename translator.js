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

function translateBlock(block) {
  for (let i=0; i< translations.length; i++) {
    let translationRegex = new RegExp(`(?<!\\w)${translations[i][0]}(?!\\w)`, 'g');
    block = block.replaceAll(translationRegex, translations[i][1]);
  }

  return block
}

function translateReceiver(request, sender, sendResponse) {
  const selection = window.getSelection();
  if (selection && selection.anchorNode) {
    const translatedText = translateBlock(selection.anchorNode.textContent);
    selection.anchorNode.textContent = translatedText;
  }
}

browser.runtime.onMessage.addListener(translateReceiver);
