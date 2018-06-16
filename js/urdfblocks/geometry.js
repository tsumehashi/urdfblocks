// urdf_geometry
// urdf_geometry_box
Blockly.Blocks['urdf_geometry_box'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("geometry")
        .appendField("box");
    this.appendValueInput("size")
        .setCheck("URDF_VEC3_TYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("size");
    this.setInputsInline(true);
    this.setOutput(true, "URDF_GEOMETRY_TYPE");
    this.setColour(240);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_geometry_box'] = function(block) {
  var value_size = Blockly.JavaScript.valueToCode(block, 'size', Blockly.JavaScript.ORDER_ATOMIC) || '[1,1,1]';
  var code = 'createURDFGeometryBox(' + value_size + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
  
// urdf_geometry_cylinder
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#mnurfd
Blockly.Blocks['urdf_geometry_cylinder'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("geometry")
        .appendField("cylinder");
    this.appendValueInput("radius")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("radius");
    this.appendValueInput("length")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("length");
    this.setInputsInline(true);
    this.setOutput(true, "URDF_GEOMETRY_TYPE");
    this.setColour(240);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_geometry_cylinder'] = function(block) {
  var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC) || 1;
  var value_length = Blockly.JavaScript.valueToCode(block, 'length', Blockly.JavaScript.ORDER_ATOMIC) || 1;
  var code = 'createURDFGeometryCylinder(' + value_radius + ', ' + value_length + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// urdf_geometry_sphere
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#gmx8om
Blockly.Blocks['urdf_geometry_sphere'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("geometry")
        .appendField("sphere");
    this.appendValueInput("radius")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("radius");
    this.setInputsInline(true);
    this.setOutput(true, "URDF_GEOMETRY_TYPE");
    this.setColour(240);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_geometry_sphere'] = function(block) {
  var value_radius = Blockly.JavaScript.valueToCode(block, 'radius', Blockly.JavaScript.ORDER_ATOMIC) || 1;
  var code = 'createURDFGeometrySphere(' + value_radius + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// urdf_geometry_mesh
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pa4a2a
Blockly.Blocks['urdf_geometry_mesh'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("geometry")
        .appendField("mesh");
    this.appendValueInput("filename")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("filename");
    this.appendValueInput("scale")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("scale");
    this.setInputsInline(true);
    this.setOutput(true, "URDF_GEOMETRY_TYPE");
    this.setColour(240);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_geometry_mesh'] = function(block) {
  var value_filename = Blockly.JavaScript.valueToCode(block, 'filename', Blockly.JavaScript.ORDER_ATOMIC) || "''";
  var value_scale = Blockly.JavaScript.valueToCode(block, 'scale', Blockly.JavaScript.ORDER_ATOMIC) || 1;
  var code = 'createURDFGeometryMesh(' + value_filename + ', ' + value_scale + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};