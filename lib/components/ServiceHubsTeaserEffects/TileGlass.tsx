import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import Lens from "./glass/Lens";

const TileGlass = () => {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
      <Lens>
        <Text
          position={[0, 0, 0]}
          fontSize={0.4}
          textAlign="center"
          color="#491b11"
          font="/Karelia-Medium.otf">
          Strategy &{"\n"}
          Positioning
        </Text>
      </Lens>
    </Canvas>
  );
};

export default TileGlass;
