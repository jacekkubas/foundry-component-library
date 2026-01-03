import { MathUtils } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instances } from "@react-three/drei";
import Bubble from "./Bubble";

const particles = Array.from({ length: 20 }, () => ({
  factor: MathUtils.randInt(20, 100),
  speed: MathUtils.randFloat(0.01, 0.75),
  xFactor: MathUtils.randFloatSpread(3),
  yFactor: MathUtils.randFloatSpread(3),
  zFactor: MathUtils.randFloatSpread(5),
}));

const Bubbles = () => {
  const ref = useRef(null);

  useFrame(
    (state, delta) =>
      void (ref.current.rotation.y = MathUtils.damp(
        ref.current.rotation.y,
        (-state.pointer.x * Math.PI) / 6,
        2.75,
        delta
      ))
  );

  return (
    <Instances
      limit={particles.length}
      ref={ref}
      castShadow
      receiveShadow
      position={[0, 2.5, 0]}>
      <sphereGeometry args={[0.45, 64, 64]} />
      <meshStandardMaterial roughness={1} color="#f0f0f0" />
      {particles.map((data, i) => (
        <Bubble key={i} {...data} />
      ))}
    </Instances>
  );
};

export default Bubbles;
