export default function define(Python: Blockly.BlockGenerators) {

  Python['events_start_here'] = function (block) {
    const code = '#!/usr/bin/python3"\n';
    return code;
  };

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
    // Assemble Python into code variable.
    const code = variable_name + '.set_speed(in_speed=' + text_bracket + ')\n';
    return code;
  };

  Python['gpggetspeed'] = function (block) {
    const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('speed'), Blockly.Variables.NAME_TYPE);
    const robot_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
    const code = variable_name + ' = ' + robot_name + '.get_speed()\n';
    return code;
  }; 

  Python['gpggetvolt'] = function (block) {
    const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('voltage'), Blockly.Variables.NAME_TYPE);
    const robot_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
    const code = variable_name + ' = ' + robot_name + '.volt()\n';
    return code;
  }; 

  Python['gpgstop'] = function (block) {
    const robot_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
    const code = robot_name + '.stop()\n';
    return code;
  }; 

  Python['gpgmovement'] = function (block) {
    const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
    const dropdown_action = block.getFieldValue('action');    
    const dropdown_blocking = block.getFieldValue('blocking');
    var dist_bracket = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    // Assemble Python into code variable.
    const code = variable_name + '.' + dropdown_action + '('+ dist_bracket + ', blocking='+ dropdown_blocking+ ')\n';
    return code;
  };

  Python['gpgsteer'] = function (block) {
    const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
    var text_bracket1 = Blockly.Python.valueToCode(block, 'value1', Blockly.Python.ORDER_ATOMIC);
    var text_bracket2 = Blockly.Python.valueToCode(block, 'value2', Blockly.Python.ORDER_ATOMIC);
    // Assemble Python into code variable.
    const code = variable_name + '.steer(left_percent=' + text_bracket1 + ', right_percent='+ text_bracket2 + ')\n';
    return code;
  };

  Python['gpgorbit'] = function (block) {
    const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
    var text_bracket1 = Blockly.Python.valueToCode(block, 'value1', Blockly.Python.ORDER_ATOMIC);
    var text_bracket2 = Blockly.Python.valueToCode(block, 'value2', Blockly.Python.ORDER_ATOMIC);
    // Assemble Python into code variable.
    const code = variable_name + '.orbit(degrees=' + text_bracket1 + ', radius_cm='+ text_bracket2 + ')\n';
    return code;
  };

  Python['gpgmovement_noarg'] = function (block) {
    const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
    const dropdown_action = block.getFieldValue('action');
    // var text_bracket = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
    // Assemble Python into code variable.
    const code = variable_name + '.' + dropdown_action + '()\n';
    return code;
  };

  /////////////////////////////////////////////////////////////////////////
  //
  // LIGHTS
  //
  /////////////////////////////////////////////////////////////////////////

  Python['gpgseteyecolor'] = function (block) {
    const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
    const dropdown_action = block.getFieldValue('action');
    var text_bracket = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    // Assemble Python into code variable.
    const code = variable_name + '.' + dropdown_action + '('+ text_bracket + ")\n"
    return code;
  };

  Python['gpgopencloseyes'] = function (block) {
    const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
    const dropdown_action = block.getFieldValue('action');
    // Assemble Python into code variable.
    const code = variable_name + "."+dropdown_action+ "()\n";
    return code;
  };


  Python['gpgblinkers'] = function (block) {
    const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
    const dropdown_action = block.getFieldValue('action');
    const dropdown_which = block.getFieldValue('which');
    // var text_bracket = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
    // Assemble Python into code variable.
    const code = variable_name + '.' + dropdown_action + "('"+ dropdown_which +"')\n"
    return code;
  };

/////////////////////////////////////////////////////////////////////////
//
// SENSORS
//
/////////////////////////////////////////////////////////////////////////
Python['gpganalogdigitalsensors'] = function (block) {
  const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('my_sensor'), Blockly.Variables.NAME_TYPE);
  const robot_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
  const dropdown_action = block.getFieldValue('action');
  const dropdown_port = block.getFieldValue('port');
  const code = variable_name + ' = ' + robot_name + '.' + dropdown_action + "('" + dropdown_port + "')\n";
  return code;
}; 

Python['gpgsensorread'] = function (block) {
  const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('my_sensor'), Blockly.Variables.NAME_TYPE);
  const code = variable_name + '.read()';
  return [code, Blockly.Python.ORDER_ATOMIC]
}; 

/////////////////////////////////////////////////////////////////////////
//
// ACTUATORS
//
/////////////////////////////////////////////////////////////////////////
Python['gpganalogdigitalactuators'] = function (block) {
  const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('my_actuator'), Blockly.Variables.NAME_TYPE) ;
  const robot_name = Blockly.Python.variableDB_.getName(block.getFieldValue('gpg'), Blockly.Variables.NAME_TYPE);
  const dropdown_action = block.getFieldValue('action');
  const dropdown_port = block.getFieldValue('port');
  const code = variable_name + ' = ' + robot_name + '.' + dropdown_action + "('" + dropdown_port + "')\n";
  return code;
}; 

Python['gpgactuatorwrite'] = function (block) {
  const variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('my_actuator'), Blockly.Variables.NAME_TYPE);
  var text_bracket = Blockly.Python.valueToCode(block, 'actuator_value', Blockly.Python.ORDER_ATOMIC);

  const code = variable_name + '.write(' + text_bracket + ')\n';
  return code
}; 

}  // last curly bracket for export default function define(Python: Blockly.BlockGenerators)
