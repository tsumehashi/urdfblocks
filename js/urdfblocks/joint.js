// urdf_joint
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#zom6ar
Blockly.Blocks['urdf_joint'] = {
  init: function() {
    this.appendValueInput("name")
        .setCheck(null)
        .appendField("Joint")
        .appendField("name");
    this.appendDummyInput()
        .appendField("type")
        .appendField(new Blockly.FieldDropdown([["revolute","revolute"], ["continuous","continuous"], ["prismatic","prismatic"], ["fixed","fixed"], ["floating","floating"]]), "type");
    this.appendValueInput("origin")
        .setCheck("URDF_ORIGIN_TYPE")
        .appendField("origin");
    this.appendValueInput("axis")
        .setCheck("URDF_JOINT_AXIS_TYPE")
        .appendField("axis");
    this.appendValueInput("calibration")
        .setCheck("URDF_JOINT_CALIBRATION_TYPE")
        .appendField("calibration");
    this.appendValueInput("dynamics")
        .setCheck("URDF_JOINT_DYNAMICS_TYPE")
        .appendField("dynamics");
    this.appendValueInput("limit")
        .setCheck("URDF_JOINT_LIMIT_TYPE")
        .appendField("limit");
    this.appendValueInput("mimic")
        .setCheck("URDF_JOINT_MIMIC_TYPE")
        .appendField("mimic");
    this.appendValueInput("safety_controller")
        .setCheck("URDF_JOINT_SAFETY_CONTROLLER_TYPE")
        .appendField("safety_controller");
    this.appendDummyInput()
        .appendField("child link");
    this.appendStatementInput("child_link")
        .setCheck("URDF_LINK_TYPE");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "URDF_JOINT_TYPE");
    this.setNextStatement(true, "URDF_JOINT_TYPE");
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
  
Blockly.JavaScript['urdf_joint'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC) || "''";
  var dropdown_type = block.getFieldValue('type');
  var value_origin = Blockly.JavaScript.valueToCode(block, 'origin', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_axis = Blockly.JavaScript.valueToCode(block, 'axis', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_calibration = Blockly.JavaScript.valueToCode(block, 'calibration', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_dynamics = Blockly.JavaScript.valueToCode(block, 'dynamics', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_limit = Blockly.JavaScript.valueToCode(block, 'limit', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_mimic = Blockly.JavaScript.valueToCode(block, 'mimic', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_safety_controller = Blockly.JavaScript.valueToCode(block, 'safety_controller', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var statements_child_link = Blockly.JavaScript.statementToCode(block, 'child_link') || 'createURDFDummyLinkSite(urdfRobot, parentJoint);';
  var code = '// joint : ' + value_name + '\n' +
             '(function () {\n' +
             '  let parentJoint = addURDFRobotJoint(urdfRobot, ((typeof parentLinkName == "undefined") ? null : parentLinkName), ' +
             '((typeof parentJointName == "undefined") ? null : parentJointName), ' + value_name + ', "' + dropdown_type + '", ' + value_origin +
             ', ' + value_axis + ', ' + value_calibration + ', ' + value_dynamics + ', ' + value_limit +
             ', ' + value_mimic + ', ' + value_safety_controller + ');\n' +
             statements_child_link + '\n' +
             '}());\n';
  return code;
};

// urdf_joint_axis
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#cwbgy3
Blockly.Blocks['urdf_joint_axis'] = {
  init: function() {
    this.appendValueInput("xyz")
        .setCheck("URDF_VEC3_TYPE")
        .appendField("axis")
        .appendField("xyz");
    this.setInputsInline(false);
    this.setOutput(true, "URDF_JOINT_AXIS_TYPE");
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_joint_axis'] = function(block) {
  var value_xyz = Blockly.JavaScript.valueToCode(block, 'xyz', Blockly.JavaScript.ORDER_ATOMIC) || '[1, 0, 0]';
  var code = 'createURDFJointAxis(' + value_xyz + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// urdf_joint_calibration
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#fgv3uw
Blockly.Blocks['urdf_joint_calibration'] = {
  init: function() {
    this.appendValueInput("rising")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("calibration")
        .appendField("rising");
    this.appendValueInput("falling")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("falling");
    this.setInputsInline(false);
    this.setOutput(true, "URDF_JOINT_CALIBRATION_TYPE");
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_joint_calibration'] = function(block) {
  var value_rising = Blockly.JavaScript.valueToCode(block, 'rising', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_falling = Blockly.JavaScript.valueToCode(block, 'falling', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var code = 'createURDFCalibration(' + value_rising + ', ' + value_falling + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// urdf_joint_dynamics
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#jmnixt
Blockly.Blocks['urdf_joint_dynamics'] = {
  init: function() {
    this.appendValueInput("damping")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("dynamics")
        .appendField("damping");
    this.appendValueInput("friction")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("friction");
    this.setInputsInline(false);
    this.setOutput(true, "URDF_JOINT_DYNAMICS_TYPE");
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_joint_dynamics'] = function(block) {
  var value_damping = Blockly.JavaScript.valueToCode(block, 'damping', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_friction = Blockly.JavaScript.valueToCode(block, 'friction', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var code = 'createURDFDynamics(' + value_damping + ', ' + value_friction + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// urdf_joint_limit
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#c9vkmc
Blockly.Blocks['urdf_joint_limit'] = {
  init: function() {
    this.appendValueInput("lower")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("limit")
        .appendField("lower");
    this.appendValueInput("upper")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("upper");
    this.appendValueInput("effort")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("effort");
    this.appendValueInput("velocity")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("velocity");
    this.setInputsInline(false);
    this.setOutput(true, "URDF_JOINT_LIMIT_TYPE");
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_joint_limit'] = function(block) {
  var value_lower = Blockly.JavaScript.valueToCode(block, 'lower', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_upper = Blockly.JavaScript.valueToCode(block, 'upper', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_effort = Blockly.JavaScript.valueToCode(block, 'effort', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var value_velocity = Blockly.JavaScript.valueToCode(block, 'velocity', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var code = 'createURDFLimit(' + value_lower + ', ' + value_upper + ', ' + value_effort + ', ' + value_velocity + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// urdf_joint_mimic
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#gmod3y
Blockly.Blocks['urdf_joint_mimic'] = {
  init: function() {
    this.appendValueInput("joint")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("mimic")
        .appendField("joint");
    this.appendValueInput("multiplier")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("multiplier");
    this.appendValueInput("offset")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("offset");
    this.setInputsInline(false);
    this.setOutput(true, "URDF_JOINT_MIMIC_TYPE");
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_joint_mimic'] = function(block) {
  var value_joint = Blockly.JavaScript.valueToCode(block, 'joint', Blockly.JavaScript.ORDER_ATOMIC) || "''";
  var value_multiplier = Blockly.JavaScript.valueToCode(block, 'multiplier', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_offset = Blockly.JavaScript.valueToCode(block, 'offset', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var code = 'createURDFMimic(' + value_joint + ', ' + value_multiplier + ', ' + value_offset + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

// urdf_joint_safety_controller
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#4njz6x
Blockly.Blocks['urdf_joint_safety_controller'] = {
  init: function() {
    this.appendValueInput("soft_lower_limit")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("safety_controller")
        .appendField("soft_lower_limit");
    this.appendValueInput("soft_upper_limit")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("soft_upper_limit");
    this.appendValueInput("k_position")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("k_position");
    this.appendValueInput("k_velocity")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("k_velocity");
    this.setInputsInline(false);
    this.setOutput(true, "URDF_JOINT_SAFETY_CONTROLLER_TYPE");
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_joint_safety_controller'] = function(block) {
  var value_soft_lower_limit = Blockly.JavaScript.valueToCode(block, 'soft_lower_limit', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_soft_upper_limit = Blockly.JavaScript.valueToCode(block, 'soft_upper_limit', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_k_position = Blockly.JavaScript.valueToCode(block, 'k_position', Blockly.JavaScript.ORDER_ATOMIC) || null;
  var value_k_velocity = Blockly.JavaScript.valueToCode(block, 'k_velocity', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var code = 'createURDFSafetyController(' + value_soft_lower_limit + ', ' + value_soft_upper_limit + ', ' + value_k_position + ', ' + value_k_velocity + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
  
  