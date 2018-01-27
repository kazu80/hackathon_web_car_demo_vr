(() => {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer ();
    renderer.setSize (window.innerWidth, window.innerHeight);
    document.body.appendChild (renderer.domElement);

    // シーンを作成
    const scene = new THREE.Scene ();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera (45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set (0, 0, 5);

    // カメラコントローラーを作成
    const controls = new THREE.OrbitControls (camera);

    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight (0xFFFFFF);
    directionalLight.position.set (1, 1, 1);
    scene.add (directionalLight);

    // 環境光を追加
    const ambientLight = new THREE.AmbientLight (0xFFFFFF);
    scene.add (ambientLight);

    /*
    // VR Controls
    const controls = new THREE.VRControls(camera);
    controls.standing = true;

    // VR Effects
    const effect = new THREE.VREffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);

    // VR Manger
    const manager = new WebVRManager(renderer, effect);

    // VR Event
    window.addEventListener('resize', onResize, true);
    window.addEventListener('vrdisplaypresentchange', onResize, true);

    function onResize(e) {
        effect.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    */

    /***
     * コード
     ***/

        // 3DS形式のモデルデータを読み込む
    const loader = new THREE.TDSLoader ();

    // テクスチャーのパスを指定
    // loader.setPath('model/bmw_x5/');

    // 3dsファイルのパスを指定
    loader.load ('model/bmw_x5/BMW X5 4.3ds', (object) => {
        // 読み込み後に3D空間に追加
        scene.add (object);
    });

    tick ();

    function tick () {
        renderer.render (scene, camera); // レンダリング

        requestAnimationFrame (tick);
    }
}) ();