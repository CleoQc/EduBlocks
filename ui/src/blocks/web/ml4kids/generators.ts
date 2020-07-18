export default function define(Python: Blockly.BlockGenerators) {
  
  Python['api_key'] = function(block) {
    var value_key = Blockly.Python.valueToCode(block, 'key', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = 'API_KEY = ' + value_key + '\n';
    return code;
  };

  Python['key_inline'] = function(block) {
    // TODO: Assemble Python into code variable.
    var code = 'API_KEY';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Python['check_model'] = function(block) {
    var variable_status = Blockly.Python.variableDB_.getName(block.getFieldValue('status'), Blockly.Variables.NAME_TYPE);
    var value_key = Blockly.Python.valueToCode(block, 'key', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = variable_status + ' = checkModel(' +value_key+ ')\n';
    return code;
  };

  Python['status_var'] = function(block) {
    var variable_status = Blockly.Python.variableDB_.getName(block.getFieldValue('status'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble Python into code variable.
    var code = variable_status;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Python['classify'] = function(block) {
    var variable_demo = Blockly.Python.variableDB_.getName(block.getFieldValue('demo'), Blockly.Variables.NAME_TYPE);
    var value_key = Blockly.Python.valueToCode(block, 'key', Blockly.Python.ORDER_ATOMIC);
    var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = variable_demo + ' = classifyText(' +value_key+ ', ' +value_text+ ')\n';
    return code;
  };

  Python['class_name'] = function(block) {
    var variable_demo = Blockly.Python.variableDB_.getName(block.getFieldValue('demo'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble Python into code variable.
    var code = 'label = ' +variable_demo+ '["class_name"]\n';
    return code;
  };

  Python['confidence'] = function(block) {
    var variable_demo = Blockly.Python.variableDB_.getName(block.getFieldValue('demo'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble Python into code variable.
    var code = 'confidence = ' +variable_demo+ '["confidence"]\n';
    return code;
  };

  Python['text_item'] = function(block) {
    var dropdown_item = block.getFieldValue('item');
    // TODO: Assemble Python into code variable.
    var code = dropdown_item;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Python['store_text'] = function(block) {
    var value_key = Blockly.Python.valueToCode(block, 'key', Blockly.Python.ORDER_ATOMIC);
    var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
    var value_label = Blockly.Python.valueToCode(block, 'label', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = 'storeText(' +value_key+ ', ' +value_text+ ', ' +value_label+ ')\n';
    return code;
  };

  Python['train_model'] = function(block) {
    var value_key = Blockly.Python.valueToCode(block, 'key', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = 'trainModel(' +value_key+ ')\n';
    return code;
  };

}
