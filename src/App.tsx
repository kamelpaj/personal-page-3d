import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import "./styles.css";
import Face from "./Face";
import Text from "./Text";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<span>loading...</span>}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          <Text
            hAlign="center"
            vAlign="center"
            position={[0, -0.5, 0]}
            children="ADAM"
            size={0.75}
          />
          <Text
            hAlign="center"
            vAlign="center"
            position={[0, -1.5, 0]}
            children="HERMANSSON"
            size={0.45}
          />
          <Center alignTop>
            <Face /* position={[0, -20, 0]} */ scale={6} />
          </Center>
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
