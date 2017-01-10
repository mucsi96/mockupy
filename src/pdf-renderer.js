module.exports = function () {
  var renderer = {
    body: renderBody,
    label: renderLabel,
    input: renderTextInput
  };
  var pdf;

  function renderBody (node, position) {
    var width = position.width + 2 * position.left;
    var height = position.height + 2 * position.top;

    pdf = new jsPDF({
      unit: 'pt',
      format: [width, height],
      orientation: width > height ? 'l' : 'p'
    });
  }

  function renderLabel (node, position) {
    var fontSize = parseInt(window.getComputedStyle(node).fontSize, 10);

    pdf.text(node.textContent, position.left, position.top + fontSize - 2);
  }

  function renderTextInput (node, position) {
    pdf.setLineWidth(1);
    pdf.roundedRect(position.left, position.top, position.width, position.height, 5, 5, 'S');
  }

  function renderNode (node, position) {
    var fn = renderer[node.tagName.toLowerCase()];

    if (!fn) {
      return;
    }

    fn(node, position);
  }

  function renderOutput (params) {
    return pdf.output();
  }

  window.renderNode = renderNode;
  window.renderOutput = renderOutput;
}
