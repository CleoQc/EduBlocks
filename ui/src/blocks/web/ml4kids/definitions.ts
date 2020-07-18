export default function define(Blocks: Blockly.BlockDefinitions) {

  Blocks['api_key'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("API_KEY = ");
      this.appendValueInput("key")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#70CBCC");
   this.setTooltip("Set the Machine Learning For Kids API Key");
   this.setHelpUrl("");
    }
  };

  Blocks['key_inline'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("API_KEY");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#70CBCC");
   this.setTooltip("Grab the API Key");
   this.setHelpUrl("");
    }
  };
  

  Blocks['check_model'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldVariable("status"), "status")
          .appendField(" = checkModel(");
      this.appendValueInput("key")
          .setCheck(null);
      this.appendDummyInput()
          .appendField(")");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#70CBCC");
   this.setTooltip("Check the API Key");
   this.setHelpUrl("");
    }
  };

  Blocks['status_var'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldVariable("status"), "status");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#70CBCC");
   this.setTooltip("Grab ML Variables");
   this.setHelpUrl("");
    }
  };

  Blocks['classify'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldVariable("demo"), "demo")
          .appendField(" = classifyText(");
      this.appendValueInput("key")
          .setCheck(null);
      this.appendDummyInput()
          .appendField(", ");
      this.appendValueInput("text")
          .setCheck(null);
      this.appendDummyInput()
          .appendField(")");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#70CBCC");
   this.setTooltip("Classify the text");
   this.setHelpUrl("");
    }
  };

  Blocks['class_name'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("label = ")
          .appendField(new Blockly.FieldVariable("demo"), "demo")
          .appendField("[\"class_name\"]");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#70CBCC");
   this.setTooltip("Set the class name");
   this.setHelpUrl("");
    }
  };

  Blocks['confidence'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("confidence = ")
          .appendField(new Blockly.FieldVariable("demo"), "demo")
          .appendField("[\"confidence\"]");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#70CBCC");
   this.setTooltip("Set the confidence level");
   this.setHelpUrl("");
    }
  };

  Blocks['text_item'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["label","label"], ["confidence","confidence"]]), "item");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#70CBCC");
   this.setTooltip("Grab the label or confidence");
   this.setHelpUrl("");
    }
  };

  Blocks['store_text'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("storeText(");
      this.appendValueInput("key")
          .setCheck(null);
      this.appendDummyInput()
          .appendField(", ");
      this.appendValueInput("text")
          .setCheck(null);
      this.appendDummyInput()
          .appendField(", ");
      this.appendValueInput("label")
          .setCheck(null);
      this.appendDummyInput()
          .appendField(")");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#70CBCC");
   this.setTooltip("Store text in the project");
   this.setHelpUrl("");
    }
  };

  Blocks['train_model'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("storeText(");
      this.appendValueInput("key")
          .setCheck(null);
      this.appendDummyInput()
          .appendField(")");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#70CBCC");
   this.setTooltip("Train the model");
   this.setHelpUrl("");
    }
  };

}

