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

        // 球体を作成
    const geometry = new THREE.SphereGeometry (300, 30, 30);

    // 画像を読み込む
    const loader = new THREE.TextureLoader ();
    const texture = loader.load ('images/earthmap1k.jpg');

    // マテリアルにテクスチャーを設定
    const material = new THREE.MeshStandardMaterial ({map: texture});

    // メッシュを作成
    const mesh = new THREE.Mesh (geometry, material);

    // 3D空間にメッシュを追加
    scene.add (mesh);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight (0xFFFFFF);
    directionalLight.position.set (1, 1, 1);

    // シーンに追加
    scene.add (directionalLight);

    tick ();

    function tick () {
        mesh.rotation.y += 0.01;
        renderer.render (scene, camera); // レンダリング

        requestAnimationFrame (tick);
    }
}) ();