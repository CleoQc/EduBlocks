export default function define(Blocks: Blockly.BlockDefinitions) {

  var maincolour = "#004466";
  var bordercolour = "#b3235a";
  var inputcolour = "#004466";
  Blocks['import_easygopigo3'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('import easygopigo3');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      this.setTooltip('Imports the easygopigo3 library.');
    },
  };

  
}

