module.exports = function () {
  var excludedTags = ['script', 'style', 'option', 'svg'];

  function walk(node, callback) {
    callback(node)

    node = node.firstChild;

    while (node) {
        if (node.nodeType === 1 && excludedTags.indexOf(node.tagName.toLowerCase()) < 0) {
            walk(node, callback);
        }

        node = node.nextSibling;
    }
  }

  function getOffsetTop (node) {
    return node.getBoundingClientRect().top;
  }

  walk(document.body, function (node) {
    // https://msdn.microsoft.com/en-us/library/hh781509(VS.85).aspx
    var clientRect = node.getBoundingClientRect();
    var position = {
      top:  window.pageYOffset + clientRect.top,
      left: window.pageXOffset + clientRect.left,
      width: clientRect.width,
      height: clientRect.height
    }
    renderNode(node, position);
  });

  return renderOutput();
}
