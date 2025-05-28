import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type Experience = {
  title: string;
  company: string;
  period: string;
};

export default function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-3, 3, 3, -3, -10, 10);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    // Set renderer size based on container size
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      renderer.setSize(size, size);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.clipPath = 'circle(calc(50% - 1px))';
    };
    
    updateSize();
    renderer.setPixelRatio(2);
    container.appendChild(renderer.domElement);

    // Create single texture with company names using / as separator
    const texture = createTextTexture(
      experiences.map(exp => exp.company).join(' / '), // Changed separator from • to /
      '#4C1D95',
      '#F3E8FF'
    );

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: false,
      opacity: 1
    });

    // Create single mesh
    const geometry = new THREE.SphereGeometry(3, 32, 32);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = -Math.PI / 2;
    meshRef.current = mesh;
    scene.add(mesh);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      
      const event = 'touches' in e ? e.touches[0] : e;
      const rect = container.getBoundingClientRect();
      
      // Calculate position relative to container
      const pos = (((360 * (event.clientX - rect.left - rect.width/2) / rect.width) * Math.PI / 180) / 2) - Math.PI/2;
      const pos2 = ((360 * (event.clientY - rect.top - rect.height/8) / rect.height) * Math.PI / 180) - Math.PI/2;
      
      if (meshRef.current) {
        meshRef.current.rotation.y = pos;
        meshRef.current.rotation.x = pos2/10;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleMouseMove);
    container.addEventListener('touchstart', handleMouseMove);

    // Animation
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.0009;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      updateSize();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleMouseMove);
      container.removeEventListener('touchstart', handleMouseMove);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [experiences]);

  return (
    <div 
      ref={mountRef} 
      className="relative w-full aspect-square max-w-md mx-auto"
      style={{ 
        touchAction: 'none',
        minHeight: '200px'
      }}
    />
  );
}

// Create text texture function
function createTextTexture(text: string, color: string, bgColor: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 4096; // Increased from 3072 for higher resolution
  canvas.height = 4096; // Increased from 3072 for higher resolution
  const context = canvas.getContext('2d')!;
  
  // Enable high-quality text rendering
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  
  // Background with gradient
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#F3E8FF');
  gradient.addColorStop(1, '#EDE9FE');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add subtle pattern
  context.fillStyle = 'rgba(139, 92, 246, 0.03)';
  for (let i = 0; i < canvas.width; i += 40) {
    for (let j = 0; j < canvas.height; j += 40) {
      context.fillRect(i, j, 20, 20);
    }
  }
  
  // Text with enhanced styling
  context.font = 'bold 400px "Inter", system-ui, -apple-system, sans-serif'; // Increased size
  context.fillStyle = '#4C1D95';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  
  // Enhanced text shadow
  context.shadowColor = 'rgba(0, 0, 0, 0.3)';
  context.shadowBlur = 100; // Increased for higher resolution
  context.shadowOffsetY = 50; // Increased for higher resolution
  
  // Add text stroke
  context.strokeStyle = '#8B5CF6';
  context.lineWidth = 12; // Increased for higher resolution
  
  // Process text to ensure no line breaks
  const companies = text.split(' / '); // Split by the new separator
  const lines = [];
  let currentLine = '';
  
  // Try to fit as many companies as possible on each line
  for (const company of companies) {
    const testLine = currentLine ? `${currentLine} / ${company}` : company;
    const width = context.measureText(testLine).width;
    
    if (width < canvas.width - 400) { // Increased margin
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = company;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  
  // Draw lines with increased spacing
  const lineHeight = 500; // Increased for larger font
  const totalHeight = lines.length * lineHeight;
  const startY = (canvas.height - totalHeight) / 2;
  
  // Draw each line with stroke and fill
  lines.forEach((line, i) => {
    const y = startY + i * lineHeight;
    // Draw stroke first
    context.strokeText(line, canvas.width / 2, y);
    // Then draw fill
    context.fillText(line, canvas.width / 2, y);
  });
  
  // Add subtle highlight
  context.fillStyle = 'rgba(255, 255, 255, 0.1)';
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, canvas.width * 0.4, 0, Math.PI * 2);
  context.fill();
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
