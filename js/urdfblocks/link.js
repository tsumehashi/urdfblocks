'use strict';

// urdf_robot
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ix7kha
Blockly.Blocks['urdf_robot'] = {
  init: function() {
    this.appendValueInput("robot_name")
        .setCheck("String")
        .appendField("Robot Name");
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_robot'] = function(block) {
    var value_robot_name = Blockly.JavaScript.valueToCode(block, 'robot_name', Blockly.JavaScript.ORDER_ATOMIC) || "''";
    var code = 'setURDFRobotName(urdfRobot, ' + value_robot_name + ');\n';
    return code;
};

// urdf_link
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#p3uy83
Blockly.Blocks['urdf_link'] = {
    init: function() {
      this.appendValueInput("name")
          .setCheck(null)
          .appendField("Link")
          .appendField("name");
      this.appendValueInput("inertial")
          .setCheck("URDF_LINK_INERTIAL_TYPE")
          .appendField("inertial");
      this.appendValueInput("visual")
          .setCheck("URDF_LINK_VISUAL_TYPE")
          .appendField("visual");
      this.appendValueInput("collision")
          .setCheck("URDF_LINK_COLLISION_TYPE")
          .appendField("collision");
      this.appendDummyInput()
          .appendField("children");
      this.appendStatementInput("children")
          .setCheck("URDF_JOINT_TYPE");
      this.setInputsInline(false);
      this.setPreviousStatement(true, "URDF_LINK_TYPE");
      this.setColour(120);
      this.setTooltip("");
      this.setHelpUrl("");
   }
};

Blockly.JavaScript['urdf_link'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC) || "''";
    var value_inertial = Blockly.JavaScript.valueToCode(block, 'inertial', Blockly.JavaScript.ORDER_ATOMIC) || null;
    var value_visual = Blockly.JavaScript.valueToCode(block, 'visual', Blockly.JavaScript.ORDER_ATOMIC) || null;
    var value_collision = Blockly.JavaScript.valueToCode(block, 'collision', Blockly.JavaScript.ORDER_ATOMIC) || null;
    var statements_children = Blockly.JavaScript.statementToCode(block, 'children');
    var code = '// link : ' + value_name + '\n' +
               '(function () {\n' +
               '  addURDFRobotLink(urdfRobot, ((typeof parentJoint == "undefined") ? null : parentJoint), ' + value_name + ', ' + value_inertial + ', ' + value_visual + ', ' + value_collision + ');\n' +
               '  let parentLinkName = ' + value_name + ';\n' +
               '  let parentJointName = (typeof parentJoint == "undefined") ? null : parentJoint.name;\n' +
               statements_children + '\n' +
               '}());\n';
    return code;
};
  
// urdf_link_inertial
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#hywueu
Blockly.Blocks['urdf_link_inertial'] = {
  init: function() {
    this.appendValueInput("origin")
        .setCheck("URDF_ORIGIN_TYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("inertial")
        .appendField("origin");
    this.appendValueInput("mass")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("mass");
    this.appendValueInput("inertia")
        .setCheck("URDF_INERTIA_TYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("inertia");
    this.setInputsInline(false);
    this.setOutput(true, "URDF_LINK_INERTIAL_TYPE");
    this.setColour(285);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_link_inertial'] = function(block) {
  var value_origin = Blockly.JavaScript.valueToCode(block, 'origin', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_mass = Blockly.JavaScript.valueToCode(block, 'mass', Blockly.JavaScript.ORDER_ATOMIC) || 1;
  var value_inertia = Blockly.JavaScript.valueToCode(block, 'inertia', Blockly.JavaScript.ORDER_ATOMIC) || '[1,0,0,1,0,1]';
  var code = 'createURDFLinkInertial(' + value_origin + ', ' + value_mass + ', ' + value_inertia + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// urdf_link_visual
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#wqnr3d
Blockly.Blocks['urdf_link_visual'] = {
  init: function() {
    this.appendValueInput("name")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("visual")
        .appendField("name");
    this.appendValueInput("origin")
        .setCheck("URDF_ORIGIN_TYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("origin");
    this.appendValueInput("geometry")
        .setCheck("URDF_GEOMETRY_TYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("geometry");
    this.appendValueInput("material")
        .setCheck("URDF_MATERIAL_TYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("material");
    this.setInputsInline(false);
    this.setOutput(true, "URDF_LINK_VISUAL_TYPE");
    this.setColour(285);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_link_visual'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_origin = Blockly.JavaScript.valueToCode(block, 'origin', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_geometry = Blockly.JavaScript.valueToCode(block, 'geometry', Blockly.JavaScript.ORDER_ATOMIC) || '{"type":"box","size":[1,1,1]}';
  var value_material = Blockly.JavaScript.valueToCode(block, 'material', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var code = 'createURDFLinkVisual(' + value_name + ', ' + value_origin + ', ' + value_geometry + ', ' + value_material + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// urdf_link_collision
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#49oomx
Blockly.Blocks['urdf_link_collision'] = {
  init: function() {
    this.appendValueInput("name")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("collision")
        .appendField("name");
    this.appendValueInput("origin")
        .setCheck("URDF_ORIGIN_TYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("origin");
    this.appendValueInput("geometry")
        .setCheck("URDF_GEOMETRY_TYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("geometry");
    this.setInputsInline(false);
    this.setOutput(true, "URDF_LINK_COLLISION_TYPE");
    this.setColour(285);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_link_collision'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_origin = Blockly.JavaScript.valueToCode(block, 'origin', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_geometry = Blockly.JavaScript.valueToCode(block, 'geometry', Blockly.JavaScript.ORDER_ATOMIC) || '{"type":"box","size":[1,1,1]}';
  var code = 'createURDFLinkCollision(' + value_name + ', ' + value_origin + ', ' + value_geometry + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// urdf_material
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pign84
Blockly.Blocks['urdf_material'] = {
  init: function() {
    this.appendValueInput("name")
        .setCheck("String")
        .appendField("material")
        .appendField("name");
    this.appendValueInput("color")
        .setCheck("URDF_VEC4_TYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("color")
        .appendField(new Blockly.FieldColour("#33ff33"), "default_color");
    this.appendValueInput("texture")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("texture");
    this.setInputsInline(false);
    this.setOutput(true, "URDF_MATERIAL_TYPE");
    this.setColour(180);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_material'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC) || "''";
  var colour_default_color = block.getFieldValue('default_color');
  var r = parseInt(colour_default_color.substring(1, 3), 16) / 255.0;
  var g = parseInt(colour_default_color.substring(3, 5), 16) / 255.0;
  var b = parseInt(colour_default_color.substring(5, 7), 16) / 255.0;
  var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC) || ('[' + r + ', ' + g + ', ' + b + ', 1]');
  var value_texture = Blockly.JavaScript.valueToCode(block, 'texture', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var code = 'createURDFMaterial(' + value_name + ', ' + value_color + ', ' + value_texture + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// urdf_origin
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#szosbw
Blockly.Blocks['urdf_origin'] = {
  init: function() {
    this.appendValueInput("xyz")
        .setCheck("URDF_VEC3_TYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("origin")
        .appendField("xyz");
    this.appendValueInput("rpy")
        .setCheck("URDF_VEC3_TYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("rpy");
    this.setInputsInline(true);
    this.setOutput(true, "URDF_ORIGIN_TYPE");
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_origin'] = function(block) {
  var value_xyz = Blockly.JavaScript.valueToCode(block, 'xyz', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_rpy = Blockly.JavaScript.valueToCode(block, 'rpy', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var code = 'createURDFOrigin(' + value_xyz + ', ' + value_rpy + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// urdf_inertia
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#mxz5qt
Blockly.Blocks['urdf_inertia'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("inertia");
    this.appendValueInput("ixx")
        .setCheck("Number")
        .appendField("ixx");
    this.appendValueInput("ixy")
        .setCheck("Number")
        .appendField("ixy");
    this.appendValueInput("ixz")
        .setCheck("Number")
        .appendField("ixz");
    this.appendValueInput("iyy")
        .setCheck("Number")
        .appendField("iyy");
    this.appendValueInput("iyz")
        .setCheck("Number")
        .appendField("iyz");
    this.appendValueInput("izz")
        .setCheck("Number")
        .appendField("izz");
    this.setInputsInline(true);
    this.setOutput(true, "URDF_INERTIA_TYPE");
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_inertia'] = function(block) {
  var value_ixx = Blockly.JavaScript.valueToCode(block, 'ixx', Blockly.JavaScript.ORDER_ATOMIC) || 1;
  var value_ixy = Blockly.JavaScript.valueToCode(block, 'ixy', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var value_ixz = Blockly.JavaScript.valueToCode(block, 'ixz', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var value_iyy = Blockly.JavaScript.valueToCode(block, 'iyy', Blockly.JavaScript.ORDER_ATOMIC) || 1;
  var value_iyz = Blockly.JavaScript.valueToCode(block, 'iyz', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var value_izz = Blockly.JavaScript.valueToCode(block, 'izz', Blockly.JavaScript.ORDER_ATOMIC) || 1;
  var code = '[' + value_ixx + ', ' + value_ixy + ', ' + value_ixz + ', ' + value_iyy + ', ' + value_iyz + ', ' + value_izz + ']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
