import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Theme-aware color function
const getThemeColors = () => {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  
  if (isDark) {
    return {
      background: '#1E1E1E',
      accent: '#6C3EA6',
      secondary: '#B57EDC',
    };
  } else {
    return {
      background: '#FFFFFF',
      accent: '#3B82F6',
      secondary: '#1D4ED8',
    };
  }
};

// Remove global styles since they're now in global.css
let camera: THREE.OrthographicCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let mesh: THREE.Mesh;
let mesh2: THREE.Mesh;

function getTexturePaths(theme: string) {
  if (theme === 'dark') {
    return {
      out: './images/out-light.png',
      middle: './images/middle-light.png',
    };
  } else {
    return {
      out: './images/out-dark.png',
      middle: './images/middle-dark.png',
    };
  }
}

function init(container: HTMLDivElement, theme: string) {
  renderer = new THREE.WebGLRenderer({ alpha: true });
  // Set initial size based on viewport width - smaller on mobile
  const size = window.innerWidth < 768 ? Math.min(window.innerWidth * 0.4, 200) : window.innerWidth * 0.2;
  renderer.setSize(size, size);
  renderer.setPixelRatio(2);
  container.appendChild(renderer.domElement);

  // Apply canvas styles
  renderer.domElement.classList.add('experience-timeline-canvas');

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-10, 10, 10, -10, -10, 10);

  // Load textures based on theme
  const textureLoader = new THREE.TextureLoader();
  const texturePaths = getTexturePaths(theme);
  const texture = textureLoader.load(texturePaths.out);
  const texture2 = textureLoader.load(texturePaths.middle);

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

export default function GlobeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState('dark');

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

    const container = containerRef.current;
    if (!container) return;

    // Initialize Three.js with theme
    init(container, theme);
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
        const size = window.innerWidth < 768 ? Math.min(window.innerWidth * 0.4, 200) : window.innerWidth * 0.2;
        renderer.setSize(size, size);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      observer.disconnect();
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
  }, [theme]); // Re-run when theme changes

  return (
    <>
      <style>
        {`
          .globe-wrapper {
            width: 60%;
            margin: 0 auto;
            padding: 24px;
            border: 2px solid;
            border-image: linear-gradient(135deg, #6C3EA6, #B57EDC, #0EC2A4) 1;
            border-radius: 16px;
            background: rgba(108, 62, 166, 0.05);
            box-shadow: 0 8px 32px rgba(108, 62, 166, 0.2);
            transition: all 0.3s ease;
          }
          
          .globe-wrapper:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(108, 62, 166, 0.3);
          }
          
          .globe-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            min-height: 300px;
            border-radius: 12px;
            overflow: hidden;
            touch-action: pan-left pan-right pan-up pan-down;
          }
          
          .globe-controls-hint {
            text-align: center;
            margin-bottom: 16px;
            padding: 12px;
            background: rgba(108, 62, 166, 0.1);
            border-radius: 8px;
            border: 1px solid rgba(108, 62, 166, 0.3);
          }
          
          .globe-controls-hint h3 {
            margin: 0 0 8px 0;
            font-size: 1.1rem;
            font-weight: bold;
            color: var(--text-primary, #F3E6F8);
          }
          
          .globe-controls-text {
            font-size: 0.9rem;
            color: var(--text-secondary, rgba(243, 230, 248, 0.8));
            line-height: 1.4;
          }
          
          .globe-controls-desktop {
            display: block;
          }
          
          .globe-controls-mobile {
            display: none;
          }
          
          @media (max-width: 768px) {
            .globe-wrapper {
              width: 90%;
              padding: 16px;
            }
            
            .globe-container {
              min-height: 250px;
            }
            
            .globe-controls-desktop {
              display: none;
            }
            
            .globe-controls-mobile {
              display: block;
            }
            
            .globe-controls-hint h3 {
              font-size: 1rem;
            }
            
            .globe-controls-text {
              font-size: 0.85rem;
            }
          }
          
          /* Light theme adjustments */
          :root[data-theme="light"] .globe-wrapper {
            border-image: linear-gradient(135deg, #3B82F6, #1D4ED8, #0EA5E9) 1;
            background: rgba(59, 130, 246, 0.05);
            box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
          }
          
          :root[data-theme="light"] .globe-wrapper:hover {
            box-shadow: 0 12px 40px rgba(59, 130, 246, 0.3);
          }
          
          :root[data-theme="light"] .globe-controls-hint {
            background: rgba(59, 130, 246, 0.1);
            border-color: rgba(59, 130, 246, 0.3);
          }
          
          :root[data-theme="light"] .globe-controls-hint h3 {
            color: var(--text-primary, #1F2937);
          }
          
          :root[data-theme="light"] .globe-controls-text {
            color: var(--text-secondary, rgba(31, 41, 55, 0.8));
          }
        `}
      </style>
      <div className="globe-wrapper">
        <div className="globe-controls-hint">
          <h3>🌍 Interactive Globe Experience</h3>
          <div className="globe-controls-desktop">
            <div className="globe-controls-text">
              <strong>Mouse:</strong> Move cursor over the globe to control rotation and perspective
            </div>
          </div>
          <div className="globe-controls-mobile">
            <div className="globe-controls-text">
              <strong>Touch:</strong> Move finger across the globe to control rotation and perspective
            </div>
          </div>
        </div>
        <div 
          ref={containerRef} 
          className="globe-container"
        />
      </div>
    </>
  );
}
