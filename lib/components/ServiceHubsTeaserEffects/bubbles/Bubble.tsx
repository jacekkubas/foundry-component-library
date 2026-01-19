import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instance } from "@react-three/drei";
import type { Mesh } from "three";

const Bubble = ({
  factor,
  speed,
  xFactor,
  yFactor,
  zFactor,
}: {
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
}) => {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 2);

    ref.current!.scale.setScalar(Math.max(1.5, Math.cos(t) * 5));

    ref.current!.position.set(
      Math.cos(t) +
        Math.sin(t * 1) / 10 +
        xFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        yFactor +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        zFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 3) * factor) / 4
    );
  });

  return <Instance ref={ref} />;
};

export default Bubble;
