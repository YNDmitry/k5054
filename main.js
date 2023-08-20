import { PerspectiveCamera, Scene, WebGLRenderer, PointLight, DirectionalLight, MeshPhysicalMaterial, Clock, PCFSoftShadowMap, FrontSide, Group, SphereGeometry, MeshBasicMaterial, Mesh, AmbientLight } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector('.progress_canvas')
const sizes = {
  width: canvas.offsetWidth,
  height: canvas.offsetHeight
}

// camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
camera.zoom = 0

const parameters = {
  color: '#353535',
}

// scene
const scene = new Scene();

const loader = new GLTFLoader();
let model
loader.load(
  'https://uploads-ssl.webflow.com/64da37b288b367f88afe78f1/64de55e179d170fc98e309be_k5054-blend-2-0.gltf.txt',
  (glft) => {
    const sphereMaterial = new MeshPhysicalMaterial({ color: parameters.color, roughness: 0.4, metalness: 0.5, reflectivity: 0.2 })
    const cubeMaterial = new MeshPhysicalMaterial({ color: parameters.color, roughness: 0.9, metalness: 0.5, reflectivity: 0.2 })
    const coneMaterial = new MeshPhysicalMaterial({ color: parameters.color, roughness: 0.4, metalness: 0.5, reflectivity: 0.2 })

    glft.scene.position.y = -2.5
    glft.scene.rotation.z = 0.1
    glft.scene.scale.set(1.1, 1.1, 1.1)
    glft.scene.children[0].material = cubeMaterial
    glft.scene.children[1].material = coneMaterial
    glft.scene.children[2].material = sphereMaterial
    glft.scene.traverse(child => {
      child.castShadow = true
      child.receiveShadow = true
    })
    model = glft.scene
    scene.add(model);
  })

const light = new PointLight('#E0BEFF', 0.5, 2000, 1)
const light2 = new PointLight('#ffffff', 1, 500, 1)
const light3 = new PointLight('#E0BEFF', 0.95, 5715, 1)
const dirLight = new DirectionalLight('#ffffff', 1, 500)
const ambientLight = new AmbientLight('#FFFFFF', 1.32);
dirLight.position.set(-33, 30, 5)
dirLight.castShadow = true
light.position.set(-1, 2, 1);
light.castShadow = true
light2.position.set(4, 4, 2);
light2.castShadow = true
light3.position.set(1, 2, 3);
light3.castShadow = true
scene.add(light, light2, light3, dirLight, ambientLight);

// renderer
const renderer = new WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
canvas.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  sizes.width = canvas.offsetWidth
  sizes.height = canvas.offsetHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

const clock = new Clock()
function animate() {
  const elapsedTime = clock.getElapsedTime()
  if (model) {
    model.rotation.y += 0.01;
    model.children[2].position.y = 4.8 + Math.cos(elapsedTime) / 10
    model.children[2].rotation.y += 0.01
  }
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate)
}
animate()
