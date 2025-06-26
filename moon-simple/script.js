// 🌌 Three.js Sahne Kurulumu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2.5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 💡 Işıklandırma
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(3, 0, 1);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// 🌕 Ay dokusu ve mesh oluşturma
const loader = new THREE.TextureLoader();
loader.load('moon-texture.jpg', function (texture) {
  const geometry = new THREE.SphereGeometry(1, 64, 64);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const moon = new THREE.Mesh(geometry, material);
  scene.add(moon);

  function animate() {
    requestAnimationFrame(animate);
    moon.rotation.y += 0.002;
    renderer.render(scene, camera);
  }
  
  animate();
});

// Responsive
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
