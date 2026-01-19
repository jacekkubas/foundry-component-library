"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { MeshBasicMaterial, DoubleSide, Mesh, Group } from "three";
import { LightSource } from "./rays/LightSource";
import {
  EffectComposer,
  EffectPass,
  GodRaysEffect,
  RenderPass,
} from "postprocessing";

function Slab({ url }: { url: string }) {
  const gltf = useGLTF(url);
  const slabRef = useRef<Group>(null);
  const { camera, scene, gl } = useThree();

  // GodRays light
  const lightRef = useRef<Mesh>(null);
  useFrame(({ pointer }) => {
    if (lightRef.current) {
      const LIGHT_RANGE = 5;
      lightRef.current.position.x = pointer.x * LIGHT_RANGE;
      lightRef.current.position.y = pointer.y * LIGHT_RANGE;
    }
  });

  React.useEffect(() => {
    if (!gltf) return;

    const slab = gltf.scene;
    slab.rotation.x = Math.PI / 2;

    slab.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.material = new MeshBasicMaterial({
          color: 0x491b11,
          side: DoubleSide,
        });
      }
    });

    if (slabRef.current) {
      slabRef.current.add(slab);
    }

    // Setup postprocessing
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, camera));

    if (!lightRef.current) return;

    const gre = new GodRaysEffect(camera, lightRef.current, {
      height: 480,
      kernelSize: 2,
      density: 1,
      decay: 0.8,
      weight: 0.5,
      exposure: 0.3,
      samples: 20,
      clampMax: 0.95,
    });

    composer.addPass(new EffectPass(camera, gre));

    // Render loop override
    // const originalSetAnimationLoop = gl.setAnimationLoop;
    gl.setAnimationLoop(() => composer.render());

    return () => {
      // Cleanup
      // gl.setAnimationLoop(originalSetAnimationLoop);
      composer.dispose();
    };
  }, [gltf, gl, scene, camera]);

  return (
    <>
      {/* <mesh ref={lightRef} position={[0, 0, -10]} /> */}
      <group ref={slabRef} />
      <LightSource ref={lightRef} position={[0, 0, -20]} />
    </>
  );
}

export default function SlabScene() {
  return (
    <Canvas
      camera={{ fov: 60, position: [0, 0, 10], near: 1, far: 100 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}>
      {/* <ambientLight intensity={0.2} /> */}
      {/* <OrbitControls /> */}
      <Slab url="/slab-with-text.glb" />
    </Canvas>
  );
}
