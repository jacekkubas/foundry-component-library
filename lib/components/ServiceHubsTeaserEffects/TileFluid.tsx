import { Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "./fluid/Fluid";

const TileFluid = () => {
  return (
    <Canvas
      style={{
        height: "100%",
        width: "100%",
      }}
      camera={{ position: [0, 0, 20], fov: 15 }}>
      <Text
        position={[0, 0, 0]}
        fontSize={0.4}
        textAlign="center"
        fontWeight={600}>
        Content and{"\n"}Campaigning
      </Text>
      <EffectComposer>
        <Fluid backgroundColor="#380de8" />
      </EffectComposer>
    </Canvas>
  );
};

export default TileFluid;
