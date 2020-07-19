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
      this.setTooltip('Instantiate the GopiGo3 and set a variable for it');
      // this.setHelpUrl('https://gopigo3.readthedocs.io/en/master/api-basic/easygopigo3.html#easygopigo3.EasyGoPiGo3');
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
      // this.setTooltip('Set speed');
      // this.setHelpUrl('https://gopigo3.readthedocs.io/en/master/api-basic/easygopigo3.html#easygopigo3.EasyGoPiGo3.set_speed');
    },
  };

  Blocks['gpggetvolt'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField('.volt()')
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
      this.setColour(maincolour, inputcolour, bordercolour);
      this.setTooltip('Get GopiGo3 overall voltage');
      // this.setHelpUrl('https://gopigo3.readthedocs.io/en/master/api-basic/easygopigo3.html#easygopigo3.EasyGoPiGo3');
    },
  };

  Blocks['gpgstop'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField('.stop()')
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      this.setTooltip('Stop GopiGo3');
      // this.setHelpUrl('https://gopigo3.readthedocs.io/en/master/api-basic/easygopigo3.html#easygopigo3.EasyGoPiGo3');
    },
  };

  Blocks['gpggetspeed'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField('.get_speed()')
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
      this.setColour(maincolour, inputcolour, bordercolour);
      this.setTooltip('Get GopiGo3 speed');
      // this.setHelpUrl('https://gopigo3.readthedocs.io/en/master/api-basic/easygopigo3.html#easygopigo3.EasyGoPiGo3');
    },
  };

  Blocks['gpgmovement'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField('.')
        .appendField(new Blockly.FieldDropdown([
          ['drive_cm', 'drive_cm'], 
          ['drive_inches', 'drive_inches'],
          ['drive_degrees', 'drive_degrees'],
          ['turn_degrees', 'turn_degrees'],
        ]), 'action')
        .appendField('(')
      this.appendValueInput("value")
        .setCheck(null)
      this.appendDummyInput()
        .appendField(', blocking=')
        .appendField(new Blockly.FieldDropdown([
          ['True', 'True'], 
          ['False', 'False'],
        ]), 'blocking')
        .appendField(')');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      this.setTooltip('Set gopigo movement');
      // this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#light-sensor-ldr');
    },
  };

  Blocks['gpgsteer'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField('.steer(left_percent=')
      this.appendValueInput("value1")
        .setCheck(null)
      this.appendDummyInput()
        .appendField(', right_percent=')
      this.appendValueInput("value2")
        .setCheck(null)
      this.appendDummyInput()
        .appendField(')');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      this.setTooltip('Set gopigo movement');
      // this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#light-sensor-ldr');
    },
  };

  Blocks['gpgorbit'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField('.orbit(degrees=')
      this.appendValueInput("value1")
        .setCheck(null)
        this.appendDummyInput()
          .appendField(', radius_cm=')
        this.appendValueInput("value2")
        .setCheck(null)
      this.appendDummyInput()
        .appendField(')');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      // this.setTooltip('Set gopigo movement');
      // this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#light-sensor-ldr');
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
        ]), 'action');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      // this.setTooltip('Set gopigo movement');
      // this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#light-sensor-ldr');
    },
  };

  /////////////////////////////////////////////////////////////////////////
  //
  // LIGHTS
  //
  /////////////////////////////////////////////////////////////////////////

  Blocks['gpgseteyecolor'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField('.')
        .appendField(new Blockly.FieldDropdown([
          ['set_eye_color', 'set_eye_color'], 
          ['set_left_eye_color', 'set_left_eye_color'],
          ['set_right_eye_color', 'set_right_eye_color'],
        ]), 'action')
        .appendField("(color=");
      this.appendValueInput("color")
        .setCheck(null)
        this.appendDummyInput()
        .appendField(")");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      // this.setTooltip('Set gopigo movement');
      // this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#light-sensor-ldr');
    },
  };

  Blocks['gpgopencloseyes'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField('.')
        .appendField(new Blockly.FieldDropdown([
          ['open_eyes()', 'open_eyes'], 
          ['open_left_eye()', 'open_left_eye'],
          ['open_right_eye()', 'open_right_eye'], 
          ['close_eyes()', 'close_eyes'],
          ['close_left_eye()', 'close_left_eye'], 
          ['close_right_eye()', 'close_right_eye'],
        ]), 'action')
        ;
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      // this.setTooltip('Set gopigo movement');
      // this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#light-sensor-ldr');
    },
  };

  Blocks['gpgblinkers'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField('.')
        .appendField(new Blockly.FieldDropdown([
          ['blinker_on', 'blinker_on'], 
          ['blinker_off', 'blinker_off'],
        ]), 'action')
        .appendField("('")
        .appendField(new Blockly.FieldDropdown([
          ['left', 'left'], 
          ['right', 'right'],
        ]), 'which')
        .appendField("')")
        ;
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      // this.setTooltip('Set gopigo movement');
      // this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#light-sensor-ldr');
    },
  };

  /////////////////////////////////////////////////////////////////////////
  //
  // SENSORS
  //
  /////////////////////////////////////////////////////////////////////////

  Blocks['gpgsensor'] = {
    init: function () {
      this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('my_sensor'), 'my_sensor')
      .appendField(' = ')
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField('.')
        .appendField(new Blockly.FieldDropdown([
          ['init_button_sensor', 'init_button_sensor'],
          ['init_light_sensor', 'init_light_sensor'], 
          ['init_loudness_sensor', 'init_loudness_sensor'],
          ['init_distance_sensor', 'init_distance_sensor'],
          ['init_imu_sensor', 'init_imu_sensor'], 
          ['init_light_color_sensor', 'init_light_color_sensor'],
          ['init_line_follower', 'init_line_follower'], 
        ]), 'action')
        .appendField("(port='")
        .appendField(new Blockly.FieldDropdown([
          ['I2C', 'I2C'], 
          ['AD1', 'AD1'], 
          ['AD2', 'AD2'],
        ]), 'port')
        .appendField("')")
        ;
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      // this.setTooltip('Set gopigo movement');
      // this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#light-sensor-ldr');
    },
  };

  Blocks['gpgsensorread'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('my_sensor'), 'my_sensor')
        .appendField(new Blockly.FieldDropdown([
          ['read()', 'read()'], 
          ['percent_read()', 'percent_read()'],
          ['read_inches()', 'read_inches()'], 
          ['read_mm()', 'read_mm()'],
          ['position()', 'position()'], 
          ['position_bw()', 'position_bw()'], 
          ['position_01()', 'position_01()'],
          ['position_val()', 'position_val()'],
        ]), 'action'); 
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
      this.setColour(maincolour, inputcolour, bordercolour);
      // this.setTooltip('negates a Boolean value');
      // this.setHelpUrl('');
    },
  };

  Blocks['gpglinefollowersetcalibration'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('my_sensor'), 'my_sensor')
        .appendField('.set_calibration(')
        .appendField(new Blockly.FieldDropdown([
          ['white', '"white"'], 
          ['black', '"black"'], 
        ]), 'action')
        .appendField(')')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      // this.setTooltip('negates a Boolean value');
      // this.setHelpUrl('');
    },
  };

  Blocks['gpglinefollowergetcalibration'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('my_sensor'), 'my_sensor')
        .appendField(new Blockly.FieldDropdown([
          ['get_white_calibration()', 'get_white_calibration()'], 
          ['get_black_calibration()', 'get_black_calibration()'], 
        ]), 'action')
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
      this.setColour(maincolour, inputcolour, bordercolour);
      // this.setTooltip('negates a Boolean value');
      // this.setHelpUrl('');
    },
  };


  /////////////////////////////////////////////////////////////////////////
  //
  // ACTUATORS
  //
  /////////////////////////////////////////////////////////////////////////

  Blocks['gpganalogdigitalactuators'] = {
    init: function () {
      this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('my_actuator'), 'my_actuator')
      .appendField(' = ')
        .appendField(new Blockly.FieldVariable('gpg'), 'gpg')
        .appendField('.')
        .appendField(new Blockly.FieldDropdown([
          ['init_buzzer', 'init_buzzer'], 
          ['init_led', 'init_led'],
          ['init_servo', 'init_servo'],
        ]), 'action')
        .appendField("(port='")
        .appendField(new Blockly.FieldDropdown([
          ['AD1', 'AD1'], 
          ['AD2', 'AD2'],
          ['SERVO1', 'SERVO1'],
          ['SERVO2', 'SERVO2'],
        ]), 'port')
        .appendField("')")
        ;
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      // this.setTooltip('Set gopigo movement');
      // this.setHelpUrl('https://gpiozero.readthedocs.io/en/stable/api_input.html#light-sensor-ldr');
    },
  };

  Blocks['gpgactuatorwrite'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('my_actuator'), 'my_actuator')
        .appendField(new Blockly.FieldDropdown([
          ['write', 'write'], 
          ['write_freq', 'write_freq'], 
          ['rotate_servo', 'rotate_servo'],
          ['reset_servo', 'reset_servo'],
          ['sound', 'sound'], 
          ['sound_off', 'sound_off'],
          ['sound_on', 'sound_on'],
        ]), 'action')
        .appendField('('); 
      this.appendValueInput("actuator_value")
        .setCheck(null);
      this.appendDummyInput()
        .appendField(')');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      // this.setTooltip('negates a Boolean value');
      // this.setHelpUrl('');
    },
  };

  Blocks['gpgactuatornoparams'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('my_actuator'), 'my_actuator')
        .appendField(new Blockly.FieldDropdown([
          ['reset_servo()', 'reset_servo()'],
          ['disable_servo()', 'disable_servo()'],
        ]), 'action');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(maincolour, inputcolour, bordercolour);
      // this.setTooltip('negates a Boolean value');
      // this.setHelpUrl('');
    },
  };

}  // end of define

