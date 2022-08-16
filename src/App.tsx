import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import "./styles.css";
import Face from "./Face";
import RotatingStars from "./Stars";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<span>loading...</span>}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <RotatingStars />

          <Center>
            <Face scale={10} />
          </Center>
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
