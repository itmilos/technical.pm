import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Theme-aware color function
const getThemeColors = () => {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  
  if (isDark) {
    return {
      royalPurple: '#6C3EA6',
      electricLavender: '#B57EDC',
      deepCharcoal: '#1E1E1E',
      neonCoral: '#FF4F58',
      cyberTeal: '#0EC2A4',
      paleBlush: '#F3E6F8',
      background: '#1E1E1E',
      textPrimary: '#F3E6F8',
      textSecondary: '#1E1E1E',
    };
  } else {
    return {
      royalPurple: '#3B82F6',
      electricLavender: '#1D4ED8',
      deepCharcoal: '#1F2937',
      neonCoral: '#EF4444',
      cyberTeal: '#0EA5E9',
      paleBlush: '#1E293B',
      background: '#FFFFFF',
      textPrimary: '#1F2937',
      textSecondary: '#FFFFFF',
    };
  }
};

const coreValues = [
  { value: 'Results-Oriented', colorKey: 'neonCoral' },
  { value: 'Efficiency', colorKey: 'cyberTeal' },
  { value: 'Self-Sustaining Solutions', colorKey: 'electricLavender' },
  { value: 'Dedication', colorKey: 'royalPurple' },
  { value: 'Transparency', colorKey: 'paleBlush' },
  { value: 'Innovation', colorKey: 'deepCharcoal' },
];

// Use a Google Font for labels
const fontFamily = `'Montserrat', 'Inter', 'Segoe UI', Arial, sans-serif`;

export default function CoreValues3D() {
  const mountRef = useRef();
  const [theme, setTheme] = useState('dark');
  const sceneRef = useRef();
  const rendererRef = useRef();
  const labelRendererRef = useRef();
  const spheresRef = useRef([]);
  const centerLabelRef = useRef();
  const centerSphereRef = useRef();

  useEffect(() => {
    // Theme detection
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(currentTheme);
    };

    // Initial theme detection
    updateTheme();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          updateTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Inject Google Fonts if not already present
    if (!document.getElementById('core-values-google-font')) {
      const link = document.createElement('link');
      link.id = 'core-values-google-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap';
      document.head.appendChild(link);
    }

    // Calculate responsive width
    const isMobile = window.innerWidth <= 768;
    const width = mountRef.current.clientWidth * (isMobile ? 0.8 : 0.6); // 85% on mobile, 60% on desktop
    const height = 500;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Get current theme colors
    const COLORS = getThemeColors();

    // Set background color
    scene.background = new THREE.Color(COLORS.background);

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
    camera.position.z = isMobile ? 385 : 350; // Even closer camera on mobile

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setClearColor(COLORS.background, 1);
    renderer.setSize(width, height);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.left = '50%';
    renderer.domElement.style.transform = 'translateX(-50%)';
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // CSS2DRenderer for labels
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(width, height);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.left = '50%';
    labelRenderer.domElement.style.transform = 'translateX(-50%)';
    mountRef.current.appendChild(labelRenderer.domElement);
    labelRendererRef.current = labelRenderer;

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
    controls.minDistance = isMobile ? 120 : 200;
    controls.maxDistance = isMobile ? 300 : 600;
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
    const centerSize = isMobile ? 22 : 40; // Even smaller center sphere on mobile
    const centerGeometry = new THREE.SphereGeometry(centerSize, 48, 48);
    const centerMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.royalPurple,
      roughness: 0.3,
      metalness: 0.7,
      emissive: COLORS.royalPurple,
      emissiveIntensity: 0.2,
    });
    const centerSphere = new THREE.Mesh(centerGeometry, centerMaterial);
    solarSystem.add(centerSphere);
    centerSphereRef.current = centerSphere;

    // Glow effect for center (Electric Lavender)
    const glowGeometry = new THREE.SphereGeometry(centerSize + 3, 48, 48);
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
    centerDiv.style.color = COLORS.textPrimary;
    centerDiv.style.fontWeight = 'bold';
    centerDiv.style.fontSize = isMobile ? '0.75rem' : '1.1rem';
    centerDiv.style.textAlign = 'center';
    centerDiv.style.textShadow = `0 2px 8px ${COLORS.royalPurple}`;
    centerDiv.style.background = 'rgba(60,20,100,0.7)';
    centerDiv.style.borderRadius = '8px';
    centerDiv.style.padding = isMobile ? '3px 6px' : '6px 12px';
    centerDiv.style.fontFamily = fontFamily;
    const centerLabel = new CSS2DObject(centerDiv);
    centerLabel.position.set(0, 0, 50);
    centerSphere.add(centerLabel);
    centerLabelRef.current = centerLabel;

    // Orbiting spheres and labels
    const orbitRadius = isMobile ? 65 : 120; // Even smaller orbit radius on mobile
    const spheres = [];
    spheresRef.current = spheres;
    coreValues.forEach((val, i) => {
      const angle = (i / coreValues.length) * Math.PI * 2;
      const sphereSize = isMobile ? 14 : 25; // Even smaller orbiting spheres on mobile
      const geometry = new THREE.SphereGeometry(sphereSize, 48, 48);
      const material = new THREE.MeshStandardMaterial({
        color: COLORS[val.colorKey],
        roughness: 0.25,
        metalness: 0.8,
        emissive: COLORS[val.colorKey],
        emissiveIntensity: 0.08,
      });
      const sphere = new THREE.Mesh(geometry, material);

      // Glow effect for each sphere (Electric Lavender for all)
      const glowGeometry = new THREE.SphereGeometry(sphereSize + 2, 48, 48);
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
      labelDiv.style.color = COLORS.textSecondary;
      labelDiv.style.fontWeight = 'bold';
      labelDiv.style.fontSize = isMobile ? '0.65rem' : '0.95rem';
      labelDiv.style.textAlign = 'center';
      labelDiv.style.textShadow = `0 2px 8px ${COLORS.paleBlush}`;
      labelDiv.style.background = COLORS.paleBlush;
      labelDiv.style.borderRadius = '8px';
      labelDiv.style.padding = isMobile ? '2px 6px' : '4px 10px';
      labelDiv.style.pointerEvents = 'none';
      labelDiv.style.fontFamily = fontFamily;
      const label = new CSS2DObject(labelDiv);
      label.position.set(0, 0, 30);
      sphere.add(label);

      // Store label reference for theme updates
      sphere.userData = { label, labelDiv, colorKey: val.colorKey };

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
      observer.disconnect();
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
  }, []); // Remove theme dependency to prevent recreation

  // Update colors when theme changes
  useEffect(() => {
    if (!sceneRef.current || !rendererRef.current || !labelRendererRef.current) return;

    const COLORS = getThemeColors();
    
    // Update scene background
    sceneRef.current.background = new THREE.Color(COLORS.background);
    
    // Update renderer clear color
    rendererRef.current.setClearColor(COLORS.background, 1);
    
    // Update center sphere material
    if (centerSphereRef.current) {
      centerSphereRef.current.material.color.setHex(COLORS.royalPurple.replace('#', '0x'));
      centerSphereRef.current.material.emissive.setHex(COLORS.royalPurple.replace('#', '0x'));
    }
    
    // Update center label
    if (centerLabelRef.current) {
      const centerDiv = centerLabelRef.current.element;
      centerDiv.style.color = COLORS.textPrimary;
      centerDiv.style.textShadow = `0 2px 8px ${COLORS.royalPurple}`;
    }
    
    // Update orbiting spheres and their labels
    spheresRef.current.forEach((sphere) => {
      const colorKey = sphere.userData.colorKey;
      sphere.material.color.setHex(COLORS[colorKey].replace('#', '0x'));
      sphere.material.emissive.setHex(COLORS[colorKey].replace('#', '0x'));
      
      // Update label
      const labelDiv = sphere.userData.labelDiv;
      labelDiv.style.color = COLORS.textSecondary;
      labelDiv.style.background = COLORS.paleBlush;
      labelDiv.style.textShadow = `0 2px 8px ${COLORS.paleBlush}`;
    });
    
  }, [theme]); // Only update colors when theme changes

  return (
    <>
      <style>
        {`
          .core-values-container {
            width: 60%;
            height: 500px;
            position: relative;
            margin: 0 auto;
          }
          @media (max-width: 768px) {
            .core-values-container {
              width: 85%;
              margin: 0 auto;
            }
          }
        `}
      </style>
      <div ref={mountRef} className="core-values-container" />
    </>
  );
}
