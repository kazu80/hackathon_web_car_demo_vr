(() => {
    const scene = new THREE.Scene ();

    const camera = new THREE.PerspectiveCamera (100, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set (0, 0, 0);

    // カメラコントローラーを作成
    //const controls = new THREE.OrbitControls (camera);

    const renderer = new THREE.WebGLRenderer ();
    renderer.setSize (window.innerWidth, window.innerHeight);

    document.body.appendChild (renderer.domElement);

    // Controls
    const controls = new THREE.VRControls (camera);
    controls.standing = true;

    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight (0xFFFFFF);
    directionalLight.position.set (1, 1, 1);
    scene.add (directionalLight);

    // 環境光を追加
    const ambientLight = new THREE.AmbientLight (0x888888);
    scene.add (ambientLight);

    // Effects
    const effect = new THREE.VREffect (renderer);
    effect.setSize (window.innerWidth, window.innerHeight);

    const manager = new WebVRManager (renderer, effect);

    window.addEventListener ('resize', onResize, true);
    window.addEventListener ('vrdisplaypresentchange', onResize, true);

    // 3DS形式のモデルデータを読み込む
    const loader = new THREE.ColladaLoader ();

    // 3dsファイルのパスを指定
    loader.load ('model/car4/ShelbyWD.dae', (collada) => {
        // 読み込み後に3D空間に追加
        const model = collada.scene;
        scene.add (model);

        model.position.set (-1, 0.5, -3);
        model.scale.set (0.9, 0.9, 0.9);
    });

    // renderer
    // renderer.render(scene, camera);

    function render () {
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