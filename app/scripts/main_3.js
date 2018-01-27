(() => {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer ();
    renderer.setSize (window.innerWidth, window.innerHeight);
    document.body.appendChild (renderer.domElement);

    // シーンを作成
    const scene = new THREE.Scene ();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera (45, window.innerWidth / window.innerHeight);
    camera.position.set (0, 0, +1000);

    // VR Controls
    const controls = new THREE.VRControls (camera);
    controls.standing = true;

    // VR Effects
    const effect = new THREE.VREffect (renderer);
    effect.setSize (window.innerWidth, window.innerHeight);

    // VR Manger
    const manager = new WebVRManager (renderer, effect);

    // VR Event
    window.addEventListener ('resize', onResize, true);
    window.addEventListener ('vrdisplaypresentchange', onResize, true);

    function onResize (e) {
        effect.setSize (window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix ();
    }

    /***
     * コード
     ***/

        // 箱を作成
    const geometry = new THREE.BoxGeometry (400, 400, 400);
    const material = new THREE.MeshNormalMaterial ();
    const box = new THREE.Mesh (geometry, material);
    scene.add (box);

    tick ();

    function tick () {
        box.rotation.y += 0.01;
        renderer.render (scene, camera); // レンダリング

        requestAnimationFrame (tick);
    }
}) ();