import React from 'react'
import { Canvas } from '@react-three/fiber'

export default function TestCanvas() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas>
        <ambientLight intensity={0.5} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Canvas>
    </div>
  )
}
