import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import Lens from "./Lens";

const TileGlass = () => {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
      <Lens>
        <Text
          position={[0, 0, 0]}
          fontSize={0.4}
          textAlign="center"
          fontWeight={600}
          color="#491b11">
          Strategy &{"\n"}
          Positioning
        </Text>
      </Lens>
    </Canvas>
  );
};

export default TileGlass;
