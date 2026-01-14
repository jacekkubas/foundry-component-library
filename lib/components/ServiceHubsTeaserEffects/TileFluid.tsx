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
        fontWeight={600}
        color="#380de8">
        Branding &{"\n"}Corporate ID
      </Text>
      <EffectComposer>
        <Fluid backgroundColor="#fbff00" fluidColor="#380de8" rainbow={true} />
      </EffectComposer>
    </Canvas>
  );
};

export default TileFluid;
