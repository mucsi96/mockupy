module.exports = function () {
  var xmlns = "http://www.w3.org/2000/svg";
  var renderer = {
    body: renderBody,
    label: renderLabel,
    input: renderTextInput
  };
  var svg;

  function renderBody (node, position) {
    var width = position.width + 2 * position.left;
    var height = position.height + 2 * position.top;
    svg = document.createElementNS (xmlns, "svg");
    svg.setAttributeNS (null, "viewBox", "0 0 " + width + " " + height);
    svg.setAttributeNS (null, "width", width);
    svg.setAttributeNS (null, "height", height);
    svg.style.display = "block";
  }

  function renderLabel (node, position) {
    var fontSize = parseInt(window.getComputedStyle(node).fontSize, 10);
    var text = document.createElementNS(xmlns, "text");
    text.setAttributeNS(null,"x", position.left);
    text.setAttributeNS(null,"y", position.top + fontSize - 2);
    var textNode = document.createTextNode(node.textContent);
    text.appendChild(textNode);
    svg.appendChild(text);
  }

  function renderTextInput (node, position) {
    var myRect = document.createElementNS(xmlns, "rect");
    myRect.setAttributeNS(null,"x", position.left);
    myRect.setAttributeNS(null,"y", position.top);
    myRect.setAttributeNS(null,"width", position.width);
    myRect.setAttributeNS(null,"height", position.height);
    myRect.setAttributeNS(null,"rx", 5);
    myRect.setAttributeNS(null,"ry", 5);
    myRect.setAttributeNS(null,"fill","none");
    myRect.setAttributeNS(null,"stroke","black");
    svg.appendChild(myRect);
  }

  function renderNode (node, position) {
    var fn = renderer[node.tagName.toLowerCase()];

    if (!fn) {
      return;
    }

    fn(node, position);
  }

  function renderOutput (params) {
    var serializer = new XMLSerializer();
    return serializer.serializeToString(svg);
  }

  window.renderNode = renderNode;
  window.renderOutput = renderOutput;
}
