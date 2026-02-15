const translations = [
  ["ss", "sl st"],
  ["dc", "sc"],
  ["htr", "hdc"],
  ["tr", "dc"],
  ["hdtr", "htr"],
  ["dtr", "tr"],
  ["trtr", "dtr"],
  ["ttr", "dtr"],
  ["fptr", "fpdc"],
  ["bptr", "bpdc"],
  ["double crochet", "single crochet"],
  ["half treble crochet", "half double crochet"],
  ["half double treble crochet", "half triple/treble crochet"],
  ["double treble crochet", "triple/treble crochet"],
  ["triple treble crochet", "double triple/treble crochet"],
  ["front post treble crochet", "front post double crochet"],
  ["back post treble crochet", "back post double crochet"],
  ["treble crochet", "double crochet"],
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

function translateNode(selection, node, sourceIndex, destinationIndex) {
  if (selection.containsNode(node, true)) {
    if (node.hasChildNodes()) {
      for (let i = 0; i < node.childNodes.length; i++) {
        translateNode(
          selection,
          node.childNodes[i],
          sourceIndex,
          destinationIndex,
        );
      }
    } else {
      node.textContent = translateBlock(
        node.textContent,
        sourceIndex,
        destinationIndex,
      );
    }
  }
}

function translateReceiver(request, _sender, _sendResponse) {
  const selection = window.getSelection();
  if (selection) {
    for (let i = 0; i < selection.rangeCount; i++) {
      let commonAncestor = selection.getRangeAt(i).commonAncestorContainer;
      switch (request.translateTo) {
        case "US":
          translateNode(selection, commonAncestor, 0, 1);
          break;
        case "UK":
          translateNode(selection, commonAncestor, 1, 0);
          break;
      }
    }
  }
}

browser.runtime.onMessage.addListener(translateReceiver);
