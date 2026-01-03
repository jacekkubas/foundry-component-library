import { Canvas } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";
import { EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing";
import Bubbles from "./bubbles/Bubbles";

const TileBalls = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: false }}
      camera={{ fov: 15, position: [0, 0, 20] }}>
      <color attach="background" args={["#fbff00"]} />
      <fog attach="fog" args={["red", 20, -5]} />
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <Bubbles />
      <EffectComposer disableNormalPass>
        <N8AO aoRadius={6} intensity={2} color="red" />
        <TiltShift2 blur={0.1} />
      </EffectComposer>
      <Environment preset="city" />
      <Text
        position={[0, 0, 0]}
        fontSize={0.4}
        textAlign="center"
        fontWeight={600}
        color="#380de8">
        Branding &{"\n"}Corporate ID
      </Text>
    </Canvas>
  );
};

export default TileBalls;
