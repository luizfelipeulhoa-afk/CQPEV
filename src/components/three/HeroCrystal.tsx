import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

interface HeroCrystalProps {
  progress?: number;
  onFail?: () => void;
  onReady?: () => void;
  className?: string;
}

/**
 * Cena 3D procedural de um cristal com fio de alumínio.
 * O scroll "enrola" o fio na pedra (drawRange).
 * Lazy loaded via React.lazy + Suspense.
 */
const HeroCrystal: React.FC<HeroCrystalProps> = ({
  progress = 1,
  onFail,
  onReady,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const crystalRef = useRef<THREE.Mesh | null>(null);
  const wireRef = useRef<THREE.Mesh | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const readyFired = useRef(false);

  const init = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      // Renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera
      const camera = new THREE.PerspectiveCamera(
        35,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 6);
      cameraRef.current = camera;

      // Lighting
      const ambient = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambient);

      const directional = new THREE.DirectionalLight(0xffffff, 1.2);
      directional.position.set(3, 5, 4);
      scene.add(directional);

      const rim = new THREE.DirectionalLight(0x8f7fd4, 0.6);
      rim.position.set(-3, -2, -3);
      scene.add(rim);

      // Crystal (hexagonal prism with cone tips)
      const crystalGroup = new THREE.Group();

      // Main crystal body
      const bodyGeo = new THREE.CylinderGeometry(0.6, 0.6, 2, 6);
      const crystalMat = new THREE.MeshPhysicalMaterial({
        color: 0x8f7fd4,
        transmission: 0.85,
        thickness: 1.2,
        roughness: 0.15,
        ior: 1.8,
        iridescence: 0.4,
        clearcoat: 1,
        transparent: true,
        opacity: progress,
      });
      const body = new THREE.Mesh(bodyGeo, crystalMat);
      crystalGroup.add(body);

      // Top cone
      const topGeo = new THREE.ConeGeometry(0.6, 0.8, 6);
      const top = new THREE.Mesh(topGeo, crystalMat);
      top.position.y = 1.4;
      crystalGroup.add(top);

      // Bottom cone (inverted)
      const botGeo = new THREE.ConeGeometry(0.6, 0.6, 6);
      const bot = new THREE.Mesh(botGeo, crystalMat);
      bot.position.y = -1.3;
      bot.rotation.x = Math.PI;
      crystalGroup.add(bot);

      crystalGroup.scale.setScalar(0.6 + 0.4 * progress);
      scene.add(crystalGroup);
      crystalRef.current = body;

      // Wire (spiral tube)
      const points: THREE.Vector3[] = [];
      const turns = 5;
      const segments = 100;
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const angle = t * Math.PI * 2 * turns;
        const radius = 0.75 + Math.sin(t * Math.PI * 3) * 0.05;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = -1.5 + t * 3;
        points.push(new THREE.Vector3(x, y, z));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 200, 0.03, 8, false);
      const wireMat = new THREE.MeshStandardMaterial({
        color: 0xaeb4c2,
        metalness: 0.9,
        roughness: 0.35,
      });
      const wire = new THREE.Mesh(tubeGeo, wireMat);
      // Set draw range based on progress
      const indexCount = tubeGeo.index ? tubeGeo.index.count : tubeGeo.attributes.position.count;
      tubeGeo.setDrawRange(0, Math.floor(progress * indexCount));
      scene.add(wire);
      wireRef.current = wire;

      // Small orbiting crystals
      for (let i = 0; i < 3; i++) {
        const smallGeo = new THREE.OctahedronGeometry(0.12, 0);
        const smallMat = new THREE.MeshPhysicalMaterial({
          color: 0x8f7fd4,
          transmission: 0.7,
          roughness: 0.2,
          transparent: true,
          opacity: 0.8,
        });
        const small = new THREE.Mesh(smallGeo, smallMat);
        const angle = (i / 3) * Math.PI * 2;
        small.position.set(
          Math.cos(angle) * 1.8,
          Math.sin(angle * 0.7) * 0.5,
          Math.sin(angle) * 1.8
        );
        scene.add(small);
      }

      if (!readyFired.current) {
        readyFired.current = true;
        onReady?.();
      }
    } catch {
      onFail?.();
    }
  }, [progress, onFail, onReady]);

  // Animation loop
  useEffect(() => {
    init();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const renderer = rendererRef.current;
      const scene = sceneRef.current;
      const camera = cameraRef.current;
      if (!renderer || !scene || !camera) return;

      // Slow rotation
      scene.rotation.y += 0.003;

      // Mouse influence
      const target = {
        x: mouseRef.current.y * 0.15,
        y: mouseRef.current.x * 0.15,
      };
      scene.rotation.x += (target.x - scene.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      // Dispose
      if (rendererRef.current) {
        rendererRef.current.dispose();
        const container = containerRef.current;
        if (container && rendererRef.current.domElement.parentNode === container) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      sceneRef.current?.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, [init]);

  // Update progress
  useEffect(() => {
    if (!wireRef.current || !crystalRef.current) return;
    const wire = wireRef.current;
    const geo = wire.geometry as THREE.TubeGeometry;
    const indexCount = geo.index ? geo.index.count : geo.attributes.position.count;
    geo.setDrawRange(0, Math.floor(progress * indexCount));

    const crystal = crystalRef.current;
    const parent = crystal.parent;
    if (parent) {
      parent.scale.setScalar(0.6 + 0.4 * progress);
    }
    (crystal.material as THREE.MeshPhysicalMaterial).opacity = progress;
  }, [progress]);

  // Mouse handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };

    container.addEventListener('pointermove', onMove);
    return () => container.removeEventListener('pointermove', onMove);
  }, []);

  // Resize
  useEffect(() => {
    const onResize = () => {
      const container = containerRef.current;
      const renderer = rendererRef.current;
      const camera = cameraRef.current;
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
};

export default HeroCrystal;
