(() => {
    const scene = new THREE.Scene ();
    const camera = new THREE.PerspectiveCamera (75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer ();
    renderer.setSize (window.innerWidth, window.innerHeight);

    document.body.appendChild (renderer.domElement);

    // Controls
    const controls = new THREE.VRControls (camera);
    controls.standing = true;

    // Effects
    const effect = new THREE.VREffect (renderer);
    effect.setSize (window.innerWidth, window.innerHeight);

    const manager = new WebVRManager (renderer, effect);

    window.addEventListener ('resize', onResize, true);
    window.addEventListener ('vrdisplaypresentchange', onResize, true);

    const loader = new THREE.ObjectLoader ();

    loader.load (
        'model/car.json',
        (obj) => {
            console.log ('foo');
            scene.add (obj);
        },
        // onProgress callback
        function (err) {
            // console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },

        // onError callback
        function (xhr) {
            console.error ('An error happened');
        }
    );

    // renderer
    // renderer.render(scene, camera);

    function render () {
        // cube.rotation.x += 0.1;
        // cube.rotation.y += 0.1;
        requestAnimationFrame (render);

        controls.update ();

        //renderer.render(scene, camera);
        manager.render (scene, camera);
    }

    render ();

    function onResize (e) {
        effect.setSize (window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix ();
    }
}) ();