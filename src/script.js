import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#F7BFB4");

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const matcapTexture = textureLoader.load("/textures/matcaps/cozycap.png");
const matcapKnotTexture = textureLoader.load("/textures/matcaps/gris.png");

/*
 * Fonts
 */
const fontLoader = new THREE.FontLoader();
let nameText;
let roleText;

fontLoader.load("/fonts/helvetiker_bold.typeface.json", (font) => {
  const nameTextGeometry = new THREE.TextBufferGeometry("ADAM\nHERMANSSON", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 30,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  const roleTextGeometry = new THREE.TextBufferGeometry("SOFTWARE DEVELOPER", {
    font,
    size: 0.3,
    height: 0.2,
    curveSegments: 30,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  nameTextGeometry.center();
  roleTextGeometry.center();

  const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
  });
  nameText = new THREE.Mesh(nameTextGeometry, material);
  roleText = new THREE.Mesh(roleTextGeometry, material);

  //roleText.position.x = -1;
  roleText.position.y = -1;
  scene.add(nameText);

  scene.add(roleText);
});

/**
 * Object
 */

const knots = [];
const knotGeometry = new THREE.TorusKnotBufferGeometry(0.2, 0.2, 20, 45);

const material = new THREE.MeshMatcapMaterial({
  matcap: matcapKnotTexture,
});

for (let i = 0; i < 100; i++) {
  const knot = new THREE.Mesh(knotGeometry, material);

  knot.position.x = (Math.random() - 0.5) * 10;
  knot.position.y = (Math.random() - 0.5) * 10;
  knot.position.z = (Math.random() - 0.5) * 10;

  knot.rotation.x = Math.random() * Math.PI;
  knot.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();
  knot.scale.set(scale, scale, scale);

  knots.push(knot);
  scene.add(knot);
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  100,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0.2;
camera.position.y = 0.2;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  knots.forEach((knot, i) => {
    knot.rotation.x = elapsedTime * 0.1 * Math.PI * 1.5;
    knot.rotation.y = elapsedTime * 0.1 * Math.PI * 1.5;

    knot.position.x = 5 * Math.cos(elapsedTime * 0.1 + i);
    knot.position.y = 5 * Math.sin(elapsedTime * 0.1 + i * 1.1);
  });

  if (nameText && roleText) {
    //nameText.rotation.z = -0.2 - (1 + Math.sin(elapsedTime / 1.5)) / 20;
    nameText.rotation.x = Math.cos(elapsedTime / 4) / 8;
    nameText.rotation.y = Math.sin(elapsedTime / 4) / 8;
    nameText.position.y = (1 + Math.sin(elapsedTime / 1.5)) / 10;

    roleText.rotation.z = -(1 + Math.sin(elapsedTime / 1.5)) / 20;
    roleText.rotation.x = Math.cos(elapsedTime / 4) / 8;
    roleText.rotation.y = Math.sin(elapsedTime / 4) / 8;
    //roleText.position.y = (1 + Math.sin(elapsedTime / 1.5)) / 10;
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
