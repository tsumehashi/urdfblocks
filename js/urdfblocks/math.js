// urdf_vec3
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#phwmud
Blockly.Blocks['urdf_vec3'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Vec3");
    this.appendValueInput("vec3_0")
        .setCheck("Number");
    this.appendValueInput("vec3_1")
        .setCheck("Number");
    this.appendValueInput("vec3_2")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, "URDF_VEC3_TYPE");
    this.setColour(240);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_vec3'] = function(block) {
  var value_vec3_0 = Blockly.JavaScript.valueToCode(block, 'vec3_0', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var value_vec3_1 = Blockly.JavaScript.valueToCode(block, 'vec3_1', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var value_vec3_2 = Blockly.JavaScript.valueToCode(block, 'vec3_2', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var code = '[' + value_vec3_0 + ", " + value_vec3_1 + ", " + value_vec3_2 + ']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// urdf_vec4
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#8wh9g9
Blockly.Blocks['urdf_vec4'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Vec4");
    this.appendValueInput("vec4_0")
        .setCheck("Number");
    this.appendValueInput("vec4_1")
        .setCheck("Number");
    this.appendValueInput("vec4_2")
        .setCheck("Number");
    this.appendValueInput("vec4_3")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, "URDF_VEC4_TYPE");
    this.setColour(240);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_vec4'] = function(block) {
  var value_vec4_0 = Blockly.JavaScript.valueToCode(block, 'vec4_0', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var value_vec4_1 = Blockly.JavaScript.valueToCode(block, 'vec4_1', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var value_vec4_2 = Blockly.JavaScript.valueToCode(block, 'vec4_2', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var value_vec4_3 = Blockly.JavaScript.valueToCode(block, 'vec4_3', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var code = '[' + value_vec4_0 + ", " + value_vec4_1 + ", " + value_vec4_2 + ", " + value_vec4_3 + ']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};