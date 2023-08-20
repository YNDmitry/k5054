import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const canvas = document.querySelector('.home_canvas')
const sizes = {
  width: canvas.offsetWidth,
  height: canvas.offsetHeight
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
camera.position.z = 7
camera.zoom = 0

const loader = new GLTFLoader()
let model
loader.load(
  'https://uploads-ssl.webflow.com/64da37b288b367f88afe78f1/64dfa15d7c34e7d2ab993495_plane.gltf.txt',
  (glft) => {
    const backedMaterial = new THREE.MeshPhongMaterial({ color: '#7A7A70', fog: true, shininess: 30 })
    model = glft.scene
    model.traverse((child) => {
      console.log(child)
      child.material = backedMaterial
    })
    model.position.y = -2
    scene.add(model)
  }
)

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
canvas.appendChild(renderer.domElement);

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

function animate() {
  if (model) {
    model.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate)
}
animate()
