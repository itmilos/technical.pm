import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Remove global styles since they're now in global.css
let camera: THREE.OrthographicCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let mesh: THREE.Mesh;
let mesh2: THREE.Mesh;

function init(container: HTMLDivElement) {
  renderer = new THREE.WebGLRenderer({ alpha: true });
  // Set initial size based on viewport width
  const size = window.innerWidth < 768 ? window.innerWidth * 0.5 : window.innerWidth * 0.2;
  renderer.setSize(size, size);
  renderer.setPixelRatio(2);
  container.appendChild(renderer.domElement);

  // Apply canvas styles
  renderer.domElement.classList.add('experience-timeline-canvas');

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-10, 10, 10, -10, -10, 10);

  // Load textures
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('./images/out.png');
  const texture2 = textureLoader.load('./images/middle.png');

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true
  });

  const material2 = new THREE.MeshBasicMaterial({
    map: texture2,
    transparent: true
  });

  const geometry = new THREE.SphereGeometry(9.98, 50, 50);
  const geometry2 = new THREE.SphereGeometry(10, 50, 50);
  
  mesh = new THREE.Mesh(geometry, material);
  mesh2 = new THREE.Mesh(geometry2, material2);
  
  mesh2.rotation.y = -Math.PI/2;
  mesh.rotation.y = -Math.PI/2;
  
  scene.add(mesh2);
  scene.add(mesh);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
  mesh2.rotation.y -= 0.0009;
  mesh.rotation.y += 0.0009;
}

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize Three.js
    init(container);
    animate();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();

      const event = 'touches' in e ? e.touches[0] : e;
      const rect = container.getBoundingClientRect();
      
      // Calculate position relative to container instead of window
      const pos = (((360 * (event.clientX - rect.left - rect.width/2) / rect.width) * Math.PI / 180) / 2) - Math.PI/2;
      const pos2 = ((360 * (event.clientY - rect.top - rect.height/2) / rect.height) * Math.PI / 180) - Math.PI/2;

      mesh2.rotation.y = -pos - Math.PI;
      mesh.rotation.y = pos;
      mesh2.rotation.x = pos2/10;
      mesh.rotation.x = pos2/10;
    };

    // Add event listeners to container instead of document
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleMouseMove);
    container.addEventListener('touchstart', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      if (renderer) {
        const size = window.innerWidth < 768 ? window.innerWidth * 0.5 : window.innerWidth * 0.2;
        renderer.setSize(size, size);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleMouseMove);
      container.removeEventListener('touchstart', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (renderer) {
        renderer.dispose();
        if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative flex items-center justify-center w-full h-full"
      style={{ 
        touchAction: 'pan-left pan-right pan-up pan-down',
        minHeight: '300px' // Minimum height for the section
      }}
    />
  );
}
