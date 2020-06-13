export default function define(Blocks: Blockly.BlockDefinitions) {

  var maincolour = "#CC3333";
  var bordercolour = "#999999";
  var inputcolour = "#CC3333";
  Blocks['import_easygopigo3'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('from easygopigo3 import EasyGoPiGo3');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      this.setTooltip('Imports the easygopigo3 library.');
    },
  };
  Blocks['gpgset'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField(' = EasyGoPiGo3()')
      // this.appendValueInput("text")
      //   .setCheck(null);
      // this.appendDummyInput()
      //   .appendField(')');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      this.setTooltip('Set a variable for the GopiGo3');
      this.setHelpUrl('https://gopigo3.readthedocs.io/en/master/api-basic/easygopigo3.html#easygopigo3.EasyGoPiGo3');
    },
  };

  Blocks['gpgsetspeed'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField('.set_speed(in_speed=')
      this.appendValueInput("speed")
        .setCheck(null);
      this.appendDummyInput()
        .appendField(')');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      this.setTooltip('Set speed');
      this.setHelpUrl('https://gopigo3.readthedocs.io/en/master/api-basic/easygopigo3.html#easygopigo3.EasyGoPiGo3.set_speed');
    },
  };
  Blocks['gpgmovement_noarg'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField('.')
        .appendField(new Blockly.FieldDropdown([
          ['forward()', 'forward'], 
          ['backward()', 'backward'],
          ['right()', 'right'],
          ['left()', 'left'],
          ['spin_right()', 'spin_right'],
          ['spin_left()', 'spin_left'],
          ['stop()', 'stop'],
        ]), 'action');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      this.setTooltip('Set gopigo movement');
      // this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#light-sensor-ldr');
    },
  };
}

