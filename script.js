import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, controls;

function init() {
    // Escena
    scene = new THREE.Scene();

    // Cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth - 300, window.innerHeight - 80);
    document.getElementById('container-3d').appendChild(renderer.domElement);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Controles
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Cargar Modelo (Asegúrate de que el nombre del archivo coincida)
    const loader = new GLTFLoader();
    loader.load('estatua_yaqui.glb', function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        
        // Centrar modelo
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
    }, undefined, function (error) {
        console.error('Error al cargar el modelo:', error);
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Ajustar ventana al cambiar tamaño
window.addEventListener('resize', () => {
    camera.aspect = (window.innerWidth - 300) / (window.innerHeight - 80);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth - 300, window.innerHeight - 80);
});

window.resetCamera = function() {
    controls.reset();
};

init();