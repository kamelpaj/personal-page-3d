import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, Loader } from "@react-three/drei";
import "./styles.css";
import Face from "./Face";
import RotatingStars from "./Stars";

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <RotatingStars />

          <Center>
            <Face scale={9} />
          </Center>
          <OrbitControls />
        </Canvas>
      </Suspense>
      <Loader />
    </div>
  );
}

export default App;
