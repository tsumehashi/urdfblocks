let prevCameraProperties = null;

function renderUrdfScene(width, height, urdfRobot) {
    const canvas =  document.querySelector('#urdf_canvas');
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    
    // scene
    const scene = new THREE.Scene();
    
    // ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // light 0
    const light0 = new THREE.DirectionalLight(0xffffff, 0.5);
    light0.position.set(1, 1, 1).normalize();
    scene.add(light0);

    // light 1
    const light1 = new THREE.DirectionalLight(0xffffff, 0.3);
    light1.position.set(1, -1, 1).normalize();
    scene.add(light1);
    
    // light 2
    const light2 = new THREE.DirectionalLight(0xffffff, 0.2);
    light2.position.set(-0.5, -1, 1).normalize();
    scene.add(light2);
    
    // camera
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.up.set(0,0,1);
    camera.position.set(2, 2, 2);
    camera.lookAt(new THREE.Vector3(0,0,0));
    
    if (prevCameraProperties != null) {
        camera.copy(prevCameraProperties);
    }

    // controls
    const controls = new THREE.OrbitControls(camera, canvas);

    // world axis
    var worldAxis = new THREE.AxesHelper(10);
    scene.add(worldAxis);
    
    drawUrdf(scene, urdfRobot);

    update();

    function update() {
      renderer.render(scene, camera);
      prevCameraProperties = camera.clone();
      requestAnimationFrame(update);
    }
}

function drawUrdf(scene, urdfRobot) {
    if ((urdfRobot == null) || (urdfRobot.joints == null) || (urdfRobot.links == null)) {
        return;
    }

    // kinematics
    let joint_ps = {};    // joint position
    let joint_Rs = {};    // joint attitude
    
    let getOriginXYZ = function (origin) {
        if ((origin != null) && (origin.xyz != null)) {
            return vec3.clone(origin.xyz);
        } 
        return vec3.create();
    }
    
    // calc forward kinematics
    for (let joint of urdfRobot.joints) {
        let p = getOriginXYZ(joint.origin);
        if ((joint.parentJointName != null) && (joint_ps[joint.parentJointName] != null)) {
            // Parents exist
            let joint_p = joint_ps[joint.parentJointName];
            p[0] += joint_p[0];
            p[1] += joint_p[1];
            p[2] += joint_p[2];
//            vec3.add(p, joint_ps[joint.parentJointName]); // p += parent_p;
        }
        joint_ps[joint.name] = p;
    }
    
    // draw root link
    let drawLinkGeometry = function (parentJoint, link) {
        if ((link == null) || (link.visual == null) || (link.visual.geometry == null)) {
            return;
        }
        
        // calc position
        let p = getOriginXYZ(link.visual.origin);
        if ((parentJoint != null) && (joint_ps[parentJoint.name] != null)) {
            // p = joint_p + link_p;
            let joint_p = joint_ps[parentJoint.name];
            p[0] += joint_p[0];
            p[1] += joint_p[1];
            p[2] += joint_p[2];
//            vec3.add(p, joint_ps[parentJoint.name]);    // p = joint_p + link_p;
        }
        
        // draw geometry
        const geometry = link.visual.geometry;
        const getThreeMaterial = function (visual) {
            if ((visual.material != null) && (visual.material.color != null) && (visual.material.color.rgba != null)) {
                try {
                    const rgba = visual.material.color.rgba;
                    const r = parseInt(255 * rgba[0]);
                    const g = parseInt(255 * rgba[1]);
                    const b = parseInt(255 * rgba[2]);
                    const colorCode = (r << 16) | (g << 8) | b;
                    return new THREE.MeshLambertMaterial({color: colorCode});
                } catch (e) {
                    return new THREE.MeshNormalMaterial();
                }
            } 
            return new THREE.MeshNormalMaterial();
        }
        
        if (geometry.type == 'box') {
            const size = geometry.size;
            // size check
            if ((size[0] > 0) && (size[1] > 0) && (size[2] > 0)) {
                const geom = new THREE.BoxGeometry(size[0], size[1], size[2]);
                const mate = getThreeMaterial(link.visual);
                const mesh = new THREE.Mesh(geom, mate);
                mesh.position.x = p[0];
                mesh.position.y = p[1];
                mesh.position.z = p[2];
                scene.add(mesh);
            }
        } else if (geometry.type == 'cylinder') {
            const radius = geometry.radius;
            const length = geometry.length;
            // size check
            if ((radius > 0) && (length > 0)) {
                const geom = new THREE.CylinderGeometry(radius, radius, length);
                const mate = getThreeMaterial(link.visual);
                const mesh = new THREE.Mesh(geom, mate);
                mesh.position.x = p[0];
                mesh.position.y = p[1];
                mesh.position.z = p[2];
                
                mesh.rotation.x = 1.57; // z-up
                scene.add(mesh);
            }
        } else if (geometry.type == 'sphere') {
            const radius = geometry.radius;
            if (radius > 0) {
                const geom = new THREE.SphereGeometry(radius);
                const mate = getThreeMaterial(link.visual);
                const mesh = new THREE.Mesh(geom, mate);
                mesh.position.x = p[0];
                mesh.position.y = p[1];
                mesh.position.z = p[2];
                scene.add(mesh);
            }
        } else if (geometry.type == 'mesh') {
            // do nothing
        } else {
            // do nothing
        }
    }
    
    // draw root link
    drawLinkGeometry(null, urdfRobot.links[0]);
    
    // draw
    for (let joint of urdfRobot.joints) {
        if (joint.child != null) {
            const childLink = urdfRobot.links.find(link => link.name === joint.child);
            if (childLink != null) {
                drawLinkGeometry(joint, childLink);
            }
        }
    }
}

