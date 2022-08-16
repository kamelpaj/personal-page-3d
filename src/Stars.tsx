import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";

function RotatingStars() {
  const starsRef = useRef<THREE.Points>();
  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.x -= delta / 55;
      starsRef.current.rotation.y -= delta / 45;
    }
  });
  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={5000}
      factor={6}
      saturation={0}
      fade
    />
  );
}

export default RotatingStars;
