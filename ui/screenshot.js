var DOMURL = self.URL || self.webkitURL || self;

function svg() {
    canvas = Blockly.mainWorkspace.svgBlockCanvas_.cloneNode(true);
    if (canvas.children[0] === undefined) throw "Couldn't find Blockly canvas."

    canvas.removeAttribute("transform");

    var cssContent = Blockly.Css.CONTENT.join('');

    cssContent += ".blocklyConnectionIndicator{display:none;} .blocklyEditableText text.blocklyText{fill: #575E75;}";

    var css = '<defs><style type="text/css" xmlns="http://www.w3.org/1999/xhtml"><![CDATA[' + cssContent + ' ]]></style></defs>';

    var bbox = document.getElementsByClassName("blocklyBlockCanvas")[0].getBBox();
    var content = new XMLSerializer().serializeToString(canvas);

    xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' +
        bbox.width + '" height="' + bbox.height + '" viewBox=" ' + bbox.x + ' ' + bbox.y + ' ' + bbox.width + ' ' + bbox.height + '">' +
        css + '">' + content + '</svg>';

    if (xml.includes('<use height="12px" width="12px" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#blocklyDropdownArrowSvg"')) {

        while (xml.includes('<use height="12px" width="12px" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#blocklyDropdownArrowSvg"')) {

            xml = xml.replace('<use height="12px" width="12px" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#blocklyDropdownArrowSvg" ', '<image xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="12px" width="12px" xlink:href="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi43MSIgaGVpZ2h0PSI4Ljc5IiB2aWV3Qm94PSIwIDAgMTIuNzEgOC43OSI+PHRpdGxlPmRyb3Bkb3duLWFycm93PC90aXRsZT48ZyBvcGFjaXR5PSIwLjEiPjxwYXRoIGQ9Ik0xMi43MSwyLjQ0QTIuNDEsMi40MSwwLDAsMSwxMiw0LjE2TDguMDgsOC4wOGEyLjQ1LDIuNDUsMCwwLDEtMy40NSwwTDAuNzIsNC4xNkEyLjQyLDIuNDIsMCwwLDEsMCwyLjQ0LDIuNDgsMi40OCwwLDAsMSwuNzEuNzFDMSwwLjQ3LDEuNDMsMCw2LjM2LDBTMTEuNzUsMC40NiwxMiwuNzFBMi40NCwyLjQ0LDAsMCwxLDEyLjcxLDIuNDRaIiBmaWxsPSIjMjMxZjIwIi8+PC9nPjxwYXRoIGQ9Ik02LjM2LDcuNzlhMS40MywxLjQzLDAsMCwxLTEtLjQyTDEuNDIsMy40NWExLjQ0LDEuNDQsMCwwLDEsMC0yYzAuNTYtLjU2LDkuMzEtMC41Niw5Ljg3LDBhMS40NCwxLjQ0LDAsMCwxLDAsMkw3LjM3LDcuMzdBMS40MywxLjQzLDAsMCwxLDYuMzYsNy43OVoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=" ');

        }

    }

    return new Blob([xml], { type: 'image/svg+xml;base64' });
}

function download(url, filename) {
    let element = document.createElement('a')
    element.href = url
    element.download = filename;
    element.click();
    DOMURL.revokeObjectURL(element.href)
}

function exportSVG() {
    download(DOMURL.createObjectURL(svg()), 'blocks.svg');
}

function exportPNG() {
    var img = new Image();

    var bbox = document.getElementsByClassName("blocklyBlockCanvas")[0].getBBox();

    img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = bbox.width * 2.5 + 20;
        canvas.height = bbox.height * 2.5 + 20;

        canvas.getContext('2d').scale(2.5, 2.5);

        canvas.getContext("2d").drawImage(img, 0, 0);

        download(canvas.toDataURL("image/png"), 'code.png');
    };
    img.src = DOMURL.createObjectURL(svg());
}