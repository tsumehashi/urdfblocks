// urdf_comment
// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#cqvzw8
Blockly.Blocks['urdf_comment'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("#")
        .appendField(new Blockly.FieldTextInput("..."), "comment");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['urdf_comment'] = function(block) {
  var text_comment = block.getFieldValue('comment');
  var code = '// ' + text_comment + '\n';
  return code;
};