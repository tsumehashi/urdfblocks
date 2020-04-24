function updateURDFScene(urdfRobot) {
    const aspect = 480.0/320.0;
    let width = 0.38 * document.documentElement.clientWidth;
    renderUrdfScene(width, width/aspect, urdfRobot);
} 

function updateURDFBlockly() {
  // Generate JavaScript code and run it.
  window.LoopTrap = 1000;
  Blockly.JavaScript.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
  var code = Blockly.JavaScript.workspaceToCode(blocklyWorkspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  //console.log(code); // for debug
  
  try {
    clearURDFRobot(urdfRobot);
    eval(code);
    //dumpURDFRobot(urdfRobot);
    let urdf_xml = writeXMLURDFRobot(urdfRobot);
    document.getElementById('urdf_output').value = urdf_xml;
  } catch (e) {
    alert(e);
  }

  updateURDFScene(urdfRobot);
}

function saveToLocal(filename, data) {
    let blob = new Blob([data], {type: "text/plain"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.target = '_blank';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function saveBlocklyWorkspace() {
    var xml = Blockly.Xml.workspaceToDom(blocklyWorkspace);
    var text = Blockly.Xml.domToText(xml);
    console.log(text);
    
    saveToLocal('urdf_blockly_workspace.xml', text);
}

function loadBlocklyXML(text) {
    console.log("loadBlocklyXML");
    console.log(text);
    if (text != null) {
        try {
            let dom = Blockly.Xml.textToDom(text);
            blocklyWorkspace.clear();
            Blockly.Xml.domToWorkspace(dom, blocklyWorkspace);
        } catch (e) {
            console.log("error loadBlocklyXML : " + e);
        }
    }
}

function onClickLoadBlocklyFile() {
    document.getElementById("onLoadBlocklyFile").click();
}

function loadBlocklyWorkspace() {
    let file  = document.getElementById("onLoadBlocklyFile").files[0];
    if (file.type.indexOf("text") == 0) {
        let reader = new FileReader();
        reader.onload = function(event) {
            loadBlocklyXML(event.target.result);
            
            // clear
            document.getElementById("onLoadBlocklyFile").value = "";
        }
        reader.readAsText(file, 'utf-8');
    }
}

function saveURDFFile() {
    var text = document.getElementById('urdf_output').value;
    console.log(text);
    
    saveToLocal('urdfblocks.urdf', text);
}