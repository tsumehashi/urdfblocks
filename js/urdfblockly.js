var urdfRobot = {};

function clearURDFRobot(urdfRobot) {
    urdfRobot.name = "Robot";
    urdfRobot.links = [];
    urdfRobot.joints = [];
}
    
function dumpURDFRobot(urdfRobot) {
    console.log(JSON.stringify(urdfRobot));
    console.log("RobotName = " + urdfRobot.name);
    console.log("Num Links = " + urdfRobot.links.length);
    for(let link of urdfRobot.links) {
        console.log("link name = " + link.name);
    }
    console.log("Num Joints = " + urdfRobot.joints.length);
    for(let joint of urdfRobot.joints) {
        console.log("joint name = " + joint.name);
        console.log(" - parent = " + joint.parent);
        console.log(" - child = " + joint.child);
    }
}

function writeXMLURDFRobot(urdfRobot) {
    
    let xw = new XMLWriter('UTF-8');
    xw.formatting = 'indented'; // add indentation and newlines
    xw.indentChar = ' ';        // indent with spaces
    xw.indentation = 2;         // add 2 spaces per level

    xw.writeStartDocument();
    
    xw.writeStartElement('robot');      // <robot>
    xw.writeAttributeString('name', urdfRobot.name);
    
    let vec2str = function (vec) {
        if (vec.length <= 1) {
            return '"' + vec[0] + '"';
        }
        let str = '';
        for (let i = 0; i < vec.length-1; ++i) {
            str += vec[i] + ' ';
        }
        str += vec[vec.length-1];
        return str;
    }
    
    let addOrigin = function (xw, origin) {
        // origin
        if ((origin != null) && ((origin.xyz != null) || (origin.rpy != null))) {
            xw.writeStartElement('origin');      // <origin>
            // xyz
            if (origin.xyz != null) {
                xw.writeAttributeString('xyz', vec2str(origin.xyz)); 
            }
            // rpy
            if (origin.rpy != null) {
                xw.writeAttributeString('rpy', vec2str(origin.rpy)); 
            }
            xw.writeEndElement();   // </origin>
        }
    }
    
    let addGeometry = function (xw, geometry) {
        xw.writeStartElement('geometry');      // <geometry>
        if (geometry.type == 'box') {
            xw.writeStartElement('box');      // <box>
            xw.writeAttributeString('size', vec2str(geometry.size));
            xw.writeEndElement();   // </box>
        } else if (geometry.type == 'cylinder') {
            xw.writeStartElement('cylinder');      // <cylinder>
            xw.writeAttributeString('radius', geometry.radius);
            xw.writeAttributeString('length', geometry.length);
            xw.writeEndElement();   // </cylinder>
        } else if (geometry.type == 'sphere') {
            xw.writeStartElement('sphere');      // <sphere>
            xw.writeAttributeString('radius', geometry.radius);
            xw.writeEndElement();   // </sphere>
        } else if (geometry.type == 'mesh') {
            xw.writeStartElement('mesh');      // <mesh>
            xw.writeAttributeString('filename', geometry.filename);
            if (geometry.scale != null) {
                xw.writeAttributeString('scale', geometry.scale);
            }
            xw.writeEndElement();   // </mesh>
        } else {
            xw.writeStartElement('box');      // <box>
            xw.writeAttributeString('size', '1.0 1.0 1.0');
            xw.writeEndElement();   // </box>
        }
        
        xw.writeEndElement();   // </geometry>
    }
    
    // add link
    for (let link of urdfRobot.links) {
        xw.writeStartElement('link');      // <link>
        xw.writeAttributeString('name', link.name);
        
        // inertial
        if (link.inertial != null) {
            xw.writeStartElement('inertial');      // <inertial>
            // origin (optional)
            addOrigin(xw, link.inertial.origin);
            
            // mass (required)
            {
                xw.writeStartElement('mass');      // <mass>
                xw.writeAttributeString('value', link.inertial.mass);
                xw.writeEndElement();   // </mass>
            }
            
            // inertia (required)
            {
                xw.writeStartElement('inertia');      // <inertia>
                xw.writeAttributeString('ixx', link.inertial.inertia[0]);
                xw.writeAttributeString('ixy', link.inertial.inertia[1]);
                xw.writeAttributeString('ixz', link.inertial.inertia[2]);
                xw.writeAttributeString('iyy', link.inertial.inertia[3]);
                xw.writeAttributeString('iyz', link.inertial.inertia[4]);
                xw.writeAttributeString('izz', link.inertial.inertia[5]);
                xw.writeEndElement();   // </inertia>
            }
            
            xw.writeEndElement();   // </inertial>
        }
        
        // visual
        if (link.visual != null) {
            xw.writeStartElement('visual');      // <visual>
            // name (optional)
            if (link.visual.name != null) {
                xw.writeAttributeString('name', link.visual.name);
            }
            // origin (optional)
            addOrigin(xw, link.visual.origin);
            
            // geometry (required)
            addGeometry(xw, link.visual.geometry);
            
            // material (optional)
            if (link.visual.material != null) {
                xw.writeStartElement('material');      // <material>
                // name
                xw.writeAttributeString('name', link.visual.material.name);
                // color (optional)
                if (link.visual.material.color != null) {
                    xw.writeStartElement('color');      // <texture>
                    xw.writeAttributeString('rgba', vec2str(link.visual.material.color.rgba));
                    xw.writeEndElement();   // </texture>
                }
                // texture (optional)
                if (link.visual.material.texture != null) {
                    xw.writeStartElement('texture');      // <texture>
                    xw.writeAttributeString('filename', link.visual.material.texture.filename);
                    xw.writeEndElement();   // </texture>
                }
                xw.writeEndElement();   // </material>
            }
            
            xw.writeEndElement();   // </visual>
        }
        
        // collision (optional)
        if (link.collision != null) {
            xw.writeStartElement('collision');      // <collision>
            // name (optional)
            if (link.collision.name) {
                xw.writeAttributeString('name', link.collision.name);
            }
            // origin (optional)
            addOrigin(xw, link.collision.origin);
            // geometry (required)
            addGeometry(xw, link.collision.geometry);
            xw.writeEndElement();   // </collision>
        }
        
        xw.writeEndElement();   // </link>
    }
    
    // add joint
    for (let joint of urdfRobot.joints) {
        xw.writeStartElement('joint');      // <joint>
        xw.writeAttributeString('name', joint.name);    // name
        xw.writeAttributeString('type', joint.type);    // type
        
        // origin (optional)
        addOrigin(xw, joint.origin);
        
        // parent (required)
        {
            xw.writeStartElement('parent');      // <parent>
            xw.writeAttributeString('link', joint.parent);    // link
            xw.writeEndElement();   // </parent>
        }
        
        // child (required)
        {
            xw.writeStartElement('child');      // <child>
            xw.writeAttributeString('link', joint.child);    // link
            xw.writeEndElement();   // </child>
        }
        
        // axis (optional)
        if (joint.axis != null) {
            xw.writeStartElement('axis');      // <axis>
            xw.writeAttributeString('xyz', vec2str(joint.axis.xyz));    // xyz
            xw.writeEndElement();   // </axis>
        }
        
        // calibration (optional)
        if ((joint.calibration != null) && ((joint.calibration.rising != null) || (joint.calibration.falling != null))) {
            xw.writeStartElement('calibration');      // <calibration>
            if (joint.calibration.rising != null) {
                xw.writeAttributeString('rising', joint.calibration.rising);    // rising (optional)
            }
            if (joint.calibration.falling != null) {
                xw.writeAttributeString('falling', joint.calibration.falling);    // falling (optional)
            }
            xw.writeEndElement();   // </calibration>
        }
        
        // dynamics (optional)
        if ((joint.dynamics != null) && ((joint.dynamics.damping != null) || (joint.dynamics.friction != null))) {
            xw.writeStartElement('dynamics');      // <dynamics>
            if (joint.dynamics.damping != null) {
                xw.writeAttributeString('damping', joint.dynamics.damping);    // damping (optional)
            }
            if (joint.dynamics.friction != null) {
                xw.writeAttributeString('friction', joint.dynamics.friction);    // friction (optional)
            }
            xw.writeEndElement();   // </dynamics>
        }
        
        // limit (required only for revolute and prismatic joint)
        if (joint.limit != null) {
            xw.writeStartElement('limit');      // <limit>
            if (joint.limit.lower != null) {
                xw.writeAttributeString('lower', joint.limit.lower);     // lower (optional)
            }
            if (joint.limit.upper != null) {
                xw.writeAttributeString('upper', joint.limit.upper);     // upper (optional)
            }
            xw.writeAttributeString('effort', joint.limit.effort);       // effort (required)
            xw.writeAttributeString('velocity', joint.limit.velocity);   // velocity (required)
            xw.writeEndElement();   // </limit>
        }
        
        // mimic (optional)
        if (joint.mimic != null) {
            xw.writeStartElement('mimic');      // <mimic>
            xw.writeAttributeString('joint', joint.mimic.joint);    // joint (required)
            if (joint.mimic.multiplier != null) {
                xw.writeAttributeString('multiplier', joint.mimic.multiplier);    // multiplier (optional)
            }
            if (joint.mimic.offset != null) {
                xw.writeAttributeString('offset', joint.mimic.offset);            // offset (optional)
            }
            xw.writeEndElement();   // </mimic>
        }
        
        // safety_controller (optional)
        if (joint.safety_controller != null) {
            xw.writeStartElement('safety_controller');      // <safety_controller>
            if (joint.safety_controller.soft_lower_limit != null) {
                xw.writeAttributeString('soft_lower_limit', joint.safety_controller.soft_lower_limit);    // soft_lower_limit (optional)
            }
            if (joint.safety_controller.soft_upper_limit != null) {
                xw.writeAttributeString('soft_upper_limit', joint.safety_controller.soft_upper_limit);    // soft_upper_limit (optional)
            }
            if (joint.safety_controller.k_position != null) {
                xw.writeAttributeString('k_position', joint.safety_controller.k_position);    // k_position (optional)
            }
            xw.writeAttributeString('k_velocity', joint.safety_controller.k_velocity);    // k_velocity (required)
            xw.writeEndElement();   // </safety_controller>
        }
        
        xw.writeEndElement();   // </joint>
    }
    
    xw.writeEndElement();   // </robot>
    xw.writeEndDocument();
    
    let xml = xw.flush(); // generate the xml string
    xw.close();           // clean the writer
    console.log(xml);
    
    return xml;
}

function setURDFRobotName(urdfRobot, name) {
    urdfRobot.name = name;
}

function addURDFRobotLink(urdfRobot, parentJoint, name, inertial, visual, collision) {
    let link = {};
    link.name = name;
    link.inertial = inertial;
    link.visual = visual;
    // for debug
//    if (link.visual == null) {
//        link.visual = {'geometry': {'type':'box', 'size':[1,1,1]}};
//    }
    link.collision = collision;
    if (parentJoint != null) {
        parentJoint.child = name;
    }
    urdfRobot.links.push(link);
}

function addURDFRobotJoint(urdfRobot, parentLinkName, parentJointName, name, type, origin, axis, calibration, dynamics, limit, mimic, safety_controller) {
    let joint = {};
    joint.name = name;
    joint.type = type;
    joint.parent = parentLinkName;
    joint.child = null;
    joint.origin = origin;
    joint.axis = axis;
    joint.calibration = calibration;
    joint.dynamics = dynamics;
    joint.limit = limit;
    joint.mimic = mimic;
    joint.safety_controller = safety_controller;
    joint.parentJointName = parentJointName;
    urdfRobot.joints.push(joint);
    return joint;
}

function createURDFDummyLinkSite(urdfRobot, parentJoint) {
    let name = parentJoint.name + '_dummy_site';
    addURDFRobotLink(urdfRobot, parentJoint, name, null, null, null);
}

function createURDFLinkInertial(origin, mass, inertia) {
    return {"origin":origin, "mass":mass, "inertia":inertia};
}

function createURDFLinkVisual(name, origin, geometry, material) {
    return {"name":name, "origin":origin, "geometry":geometry, "material":material};
}

function createURDFLinkCollision(name, origin, geometry) {
    return {"name":name, "origin":origin, "geometry":geometry};
}

function createURDFMaterial(name, color_rgba, texture) {
    return {"name":name, "color":{"rgba":color_rgba}, "texture":texture};
}
    
function createURDFOrigin(xyz, rpy) {
    return {"xyz":xyz, "rpy":rpy};
}

// create geometory
function createURDFGeometryBox(size) {
    return {"type":"box", "size":size};
}

function createURDFGeometryCylinder(radius, length) {
    return {"type":"cylinder", "radius":radius, "length":length};
}

function createURDFGeometrySphere(radius) {
    return {"type":"sphere", "radius":radius};
}

function createURDFGeometryMesh(filename, scale) {
    return {"type":"mesh", "filename":filename, "scale":scale};
}

// create joint
function createURDFJointAxis(xyz) {
    return {"xyz":xyz};
}

function createURDFCalibration(rising, falling) {
    return {"rising":rising, "falling":falling};
}

function createURDFDynamics(damping, friction) {
    return {"damping":damping, "friction":friction};
}

function createURDFLimit(lower, upper, effort, velocity) {
    return {"lower":lower, "upper":upper, "effort":effort, "velocity":velocity};
}

function createURDFMimic(joint, multiplier, offset) {
    return {"joint":joint, "multiplier":multiplier, "offset":offset};
}

function createURDFSafetyController(soft_lower_limit, soft_upper_limit, k_position, k_velocity) {
    return {"soft_lower_limit":soft_lower_limit, "soft_upper_limit":soft_upper_limit, "k_position":k_position, "k_velocity":k_velocity};
}