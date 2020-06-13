export default function define(Python: Blockly.BlockGenerators) {
  Python['import_easygopigo3'] = function (block) {
    const code = 'from easygopigo3 import EasyGoPiGo3\n';
    return code;
  };
  Python['gpgset'] = function (block) {
    const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
    // var text_pin = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
    const code = variable_name + ' = EasyGoPiGo3()\n';
    return code;
  };
  Python['gpgsetspeed'] = function (block) {
    const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
    var text_bracket = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    const code = variable_name + '.set_speed(in_speed=' + text_bracket + ')\n';
    return code;
  };

  Python['gpgmovement_noarg'] = function (block) {
    const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
    const dropdown_action = block.getFieldValue('action');
    // var text_bracket = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    const code = variable_name + '.' + dropdown_action + '()\n';
    return code;
  };
}
