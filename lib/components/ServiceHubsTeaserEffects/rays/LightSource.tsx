"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import noise from "./noise";

export function LightSource(props: React.ComponentProps<"mesh">) {
  const meshRef = useRef(null);

  // shared time uniform
  const time = useMemo(() => ({ value: 0 }), []);

  const material = useMemo(() => {
    const m = new THREE.MeshBasicMaterial({
      color: 0xf197f4,
      transparent: true,
    } as any);

    (m as any).onBeforeCompile = (shader: any) => {
      shader.uniforms.time = time;

      shader.fragmentShader = `
        uniform float time;
        ${shader.fragmentShader}
      `
        .replace(
          `void main() {`,
          `
          ${noise}
          void main() {
        `
        )
        .replace(
          `vec4 diffuseColor = vec4( diffuse, opacity );`,
          `
          vec2 uv = vUv - 0.5;
          vec3 col = vec3(0.0);

          float f = smoothstep(0.5, 0.0, length(uv));
          f = pow(f, 4.0);

          float n = snoise(vec3(uv * 7.0, time)) * 0.5 + 0.5;
          n = n * 0.5 + 0.5;

          col = mix(col, diffuse, f * n);
          vec4 diffuseColor = vec4(col, opacity);
        `
        );
    };

    m.defines = { USE_UV: "" };
    return m;
  }, [time]);

  useFrame((_, delta) => {
    time.value += delta;
  });

  return (
    <mesh ref={meshRef} material={material} {...props}>
      <circleGeometry args={[50, 64]} />
    </mesh>
  );
}
