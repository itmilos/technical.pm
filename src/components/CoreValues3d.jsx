import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Brand Colors
const COLORS = {
  royalPurple: '#6C3EA6',
  electricLavender: '#B57EDC',
  deepCharcoal: '#1E1E1E',
  neonCoral: '#FF4F58',
  cyberTeal: '#0EC2A4',
  paleBlush: '#F3E6F8',
};

const coreValues = [
  { value: 'Results-Oriented', color: COLORS.neonCoral },
  { value: 'Efficiency', color: COLORS.cyberTeal },
  { value: 'Self-Sustaining Solutions', color: COLORS.electricLavender },
  { value: 'Dedication', color: COLORS.royalPurple },
  { value: 'Transparency', color: COLORS.paleBlush },
  { value: 'Innovation', color: COLORS.deepCharcoal },
];

// Use a Google Font for labels
const fontFamily = `'Montserrat', 'Inter', 'Segoe UI', Arial, sans-serif`;

export default function CoreValues3D() {
  const mountRef = useRef();

  useEffect(() => {
    // Inject Google Fonts if not already present
    if (!document.getElementById('core-values-google-font')) {
      const link = document.createElement('link');
      link.id = 'core-values-google-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap';
      document.head.appendChild(link);
    }

    const width = mountRef.current.clientWidth;
    const height = 500;
    const scene = new THREE.Scene();

    // Set background color
    scene.background = new THREE.Color(COLORS.deepCharcoal);

    // Starfield background (Electric Lavender)
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 300;
    const starVertices = [];
    for (let i = 0; i < starCount; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000
      );
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: COLORS.electricLavender, size: 2 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.z = 350;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setClearColor(COLORS.deepCharcoal, 1);
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // CSS2DRenderer for labels
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(width, height);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.left = '0';
    mountRef.current.appendChild(labelRenderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(0, 0, 400);
    scene.add(pointLight);

    // Orbit Controls
    const controls = new OrbitControls(camera, labelRenderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 200;
    controls.maxDistance = 600;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0; // Adjust rotation speed

    // Track rotation state
    let lastRotationY = 0;
    let lastRotationX = 0;
    let isRotating = false;
    let isUserControlling = false;

    function handlePointerDown(e) {
      if (e.button === 0) { // Only left mouse button
        isRotating = true;
        isUserControlling = true;
        controls.autoRotate = false;
        // Store current rotation when starting
        lastRotationY = solarSystem.rotation.y;
        lastRotationX = solarSystem.rotation.x;
      }
    }

    function handlePointerUp() {
      isRotating = false;
      isUserControlling = false;
      controls.autoRotate = true;
    }

    function handlePointerLeave() {
      if (isRotating) {
        isRotating = false;
        isUserControlling = false;
        controls.autoRotate = true;
      }
    }

    function handleTouchStart() {
      isRotating = true;
      isUserControlling = true;
      controls.autoRotate = false;
      lastRotationY = solarSystem.rotation.y;
      lastRotationX = solarSystem.rotation.x;
    }

    function handleTouchEnd() {
      isRotating = false;
      isUserControlling = false;
      controls.autoRotate = true;
    }

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    renderer.domElement.addEventListener('pointerleave', handlePointerLeave);
    renderer.domElement.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    // Create a group for the solar system
    const solarSystem = new THREE.Group();
    scene.add(solarSystem);

    // Central sphere (Royal Purple)
    const centerGeometry = new THREE.SphereGeometry(40, 48, 48);
    const centerMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.royalPurple,
      roughness: 0.3,
      metalness: 0.7,
      emissive: COLORS.royalPurple,
      emissiveIntensity: 0.2,
    });
    const centerSphere = new THREE.Mesh(centerGeometry, centerMaterial);
    solarSystem.add(centerSphere);

    // Glow effect for center (Electric Lavender)
    const glowGeometry = new THREE.SphereGeometry(44, 48, 48);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: COLORS.electricLavender,
      transparent: true,
      opacity: 0.18,
    });
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    centerSphere.add(glowSphere);

    // Center label
    const centerDiv = document.createElement('div');
    centerDiv.className = 'label';
    centerDiv.textContent = 'Core Values';
    centerDiv.style.color = COLORS.paleBlush;
    centerDiv.style.fontWeight = 'bold';
    centerDiv.style.fontSize = '1.1rem';
    centerDiv.style.textAlign = 'center';
    centerDiv.style.textShadow = `0 2px 8px ${COLORS.royalPurple}`;
    centerDiv.style.background = 'rgba(60,20,100,0.7)';
    centerDiv.style.borderRadius = '8px';
    centerDiv.style.padding = '6px 12px';
    centerDiv.style.fontFamily = fontFamily;
    const centerLabel = new CSS2DObject(centerDiv);
    centerLabel.position.set(0, 0, 50);
    centerSphere.add(centerLabel);

    // Orbiting spheres and labels
    const orbitRadius = 120;
    const spheres = [];
    coreValues.forEach((val, i) => {
      const angle = (i / coreValues.length) * Math.PI * 2;
      const geometry = new THREE.SphereGeometry(25, 48, 48);
      const material = new THREE.MeshStandardMaterial({
        color: val.color,
        roughness: 0.25,
        metalness: 0.8,
        emissive: val.color,
        emissiveIntensity: 0.08,
      });
      const sphere = new THREE.Mesh(geometry, material);

      // Glow effect for each sphere (Electric Lavender for all)
      const glowGeometry = new THREE.SphereGeometry(28, 48, 48);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: COLORS.electricLavender,
        transparent: true,
        opacity: 0.13,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      sphere.add(glow);

      sphere.position.set(
        Math.cos(angle) * orbitRadius,
        Math.sin(angle) * orbitRadius,
        0
      );
      solarSystem.add(sphere);

      // Label
      const labelDiv = document.createElement('div');
      labelDiv.className = 'label';
      labelDiv.textContent = val.value;
      labelDiv.style.color = COLORS.deepCharcoal;
      labelDiv.style.fontWeight = 'bold';
      labelDiv.style.fontSize = '0.95rem';
      labelDiv.style.textAlign = 'center';
      labelDiv.style.textShadow = `0 2px 8px ${COLORS.paleBlush}`;
      labelDiv.style.background = COLORS.paleBlush;
      labelDiv.style.borderRadius = '8px';
      labelDiv.style.padding = '4px 10px';
      labelDiv.style.pointerEvents = 'none';
      labelDiv.style.fontFamily = fontFamily;
      const label = new CSS2DObject(labelDiv);
      label.position.set(0, 0, 30);
      sphere.add(label);

      // Orbit line (Electric Lavender)
      const orbitSegments = 128;
      const orbitGeometry = new THREE.BufferGeometry();
      const orbitVertices = [];
      for (let j = 0; j <= orbitSegments; j++) {
        const theta = (j / orbitSegments) * Math.PI * 2;
        orbitVertices.push(
          Math.cos(theta) * orbitRadius,
          Math.sin(theta) * orbitRadius,
          0
        );
      }
      orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitVertices, 3));
      const orbitMaterial = new THREE.LineBasicMaterial({ color: COLORS.electricLavender, opacity: 0.18, transparent: true });
      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
      solarSystem.add(orbitLine);

      spheres.push(sphere);
    });

    // Hover effect
    let hoveredIndex = null;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onPointerMove(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }
    renderer.domElement.addEventListener('pointermove', onPointerMove);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Update controls and rotation
      if (isUserControlling) {
        controls.update();
      } else if (controls.autoRotate) {
        // Continue rotation from last position
        solarSystem.rotation.y = lastRotationY + 0.003;
        solarSystem.rotation.x = lastRotationX + 0.001;
        lastRotationY = solarSystem.rotation.y;
        lastRotationX = solarSystem.rotation.x;
      }

      // Raycasting for hover
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(spheres, false);

      if (intersects.length > 0) {
        const idx = spheres.indexOf(intersects[0].object);
        if (hoveredIndex !== idx) {
          // Reset all
          spheres.forEach((s, i) => {
            s.scale.set(1, 1, 1);
            s.children[0].material.opacity = 0.13;
          });
          // Highlight hovered
          spheres[idx].scale.set(1.18, 1.18, 1.18);
          spheres[idx].children[0].material.opacity = 0.28;
          hoveredIndex = idx;
        }
      } else {
        // Reset all
        spheres.forEach((s, i) => {
          s.scale.set(1, 1, 1);
          s.children[0].material.opacity = 0.13;
        });
        hoveredIndex = null;
      }

      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.domElement.removeEventListener('pointerleave', handlePointerLeave);
      renderer.domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      mountRef.current.removeChild(renderer.domElement);
      mountRef.current.removeChild(labelRenderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ width: '100%', height: 500, position: 'relative' }} />
  );
}
