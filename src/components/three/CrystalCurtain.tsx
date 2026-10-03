import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useMotionPref } from '../../state/useMotionPref';

/**
 * Cortina de transição em shader GLSL.
 * 14 "fios de alumínio" verticais varrendo a tela.
 * Recebe evento 'cqpev-curtain' para executar transições.
 */
const CrystalCurtain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const frameRef = useRef<number>(0);
  const busyRef = useRef(false);
  const { reduced } = useMotionPref();

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current = renderer;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        },
        vertexShader: `
          void main() {
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uProgress;
          uniform float uTime;
          uniform vec2 uResolution;

          float hash(float n) {
            return fract(sin(n) * 43758.5453);
          }

          void main() {
            vec2 uv = gl_FragCoord.xy / uResolution.xy;
            float threads = 14.0;
            float idx = floor(uv.x * threads);
            float threadUv = fract(uv.x * threads);

            // Staggered progress per thread
            float delay = (idx / threads) * 0.3;
            float localProgress = clamp((uProgress - delay) / (1.0 - delay * 0.8), 0.0, 1.0);

            // Wavy edge
            float wave = sin(uv.y * 20.0 + hash(idx) * 6.28 + uTime * 2.0) * 0.02;
            float edge = smoothstep(localProgress - 0.05 + wave, localProgress + wave, threadUv);

            // Colors
            vec3 silver = vec3(0.68, 0.71, 0.76);
            vec3 crystal = vec3(0.56, 0.50, 0.83);
            vec3 brass = vec3(0.78, 0.64, 0.30);

            float colorMix = hash(idx * 7.0);
            vec3 color = silver;
            if (colorMix > 0.7) color = crystal;
            else if (colorMix > 0.54) color = brass;

            // Metallic streaks
            float streak = sin(uv.y * 200.0 + idx * 3.0) * 0.5 + 0.5;
            color += streak * 0.05;

            // Crystal sparkle
            float sparkle = smoothstep(0.98, 1.0, sin(uTime * 5.0 + hash(idx * 13.0) * 100.0));
            color += sparkle * 0.3;

            float alpha = (1.0 - edge) * step(0.001, localProgress);
            gl_FragColor = vec4(color, alpha * 0.95);
          }
        `,
      });

      materialRef.current = material;

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;
      scene.add(mesh);

      const animate = () => {
        frameRef.current = requestAnimationFrame(animate);
        material.uniforms.uTime.value += 0.016;
        renderer.render(scene, camera);
      };
      animate();
    } catch {
      // WebGL failed, curtain won't work — that's fine
    }
  }, []);

  useEffect(() => {
    init();

    const handleCurtain = (e: Event) => {
      const { callback } = (e as CustomEvent).detail;
      const material = materialRef.current;
      if (!material) {
        callback();
        return;
      }

      if (reduced || busyRef.current) {
        callback();
        return;
      }

      busyRef.current = true;

      // Phase 1: cover (0 → 0.5)
      const duration = 550;
      const start = performance.now();

      const animateIn = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        const eased = t * t; // power2.in
        material.uniforms.uProgress.value = eased * 0.5;
        if (t < 1) {
          requestAnimationFrame(animateIn);
        } else {
          callback();
          // Phase 2: reveal (0.5 → 1)
          const start2 = performance.now();
          const animateOut = (now2: number) => {
            const elapsed2 = now2 - start2;
            const t2 = Math.min(elapsed2 / duration, 1);
            const eased2 = 1 - Math.pow(1 - t2, 2); // power2.out
            material.uniforms.uProgress.value = 0.5 + eased2 * 0.5;
            if (t2 < 1) {
              requestAnimationFrame(animateOut);
            } else {
              material.uniforms.uProgress.value = 0;
              busyRef.current = false;
            }
          };
          requestAnimationFrame(animateOut);
        }
      };
      requestAnimationFrame(animateIn);
    };

    window.addEventListener('cqpev-curtain', handleCurtain);

    return () => {
      window.removeEventListener('cqpev-curtain', handleCurtain);
      cancelAnimationFrame(frameRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [init, reduced]);

  // Resize
  useEffect(() => {
    const onResize = () => {
      const renderer = rendererRef.current;
      const material = materialRef.current;
      if (!renderer || !material) return;
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[75] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default CrystalCurtain;
