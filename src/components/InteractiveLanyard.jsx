import React, { useEffect, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

const LanyardComponent = ({ cardImg }) => {
  const { width, height } = useThree((state) => state.viewport)
  const [dragged, setDragged] = useState(false)
  const card = useRef()
  const fixed = useRef()
  const vec = new THREE.Vector3()
  
  // Try mapping texture - error boundary or safe check
  let texture;
  try {
    texture = useTexture(cardImg)
  } catch (e) {
    console.error("Texture load error", e)
  }

  // Simplified nodes to avoid joint complexity issues in development
  const j1 = useRef(), j2 = useRef(), j3 = useRef(), j4 = useRef()
  
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0.4, 0], [0, -0.4, 0], 1])
  useRopeJoint(j2, j3, [[0, 0.4, 0], [0, -0.4, 0], 1])
  useSphericalJoint(j3, card, [[0, 0.4, 0], [0, 1.2, 0]])

  useFrame((state) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x * width, state.pointer.y * height, 0)
      card.current.setNextKinematicTranslation(vec)
    }
  })

  return (
    <>
      <RigidBody ref={fixed} type="fixed" position={[0, height / 2, 0]} />
      <RigidBody ref={j1} linearDamping={2} angularDamping={2} colliders={false} position={[0, height / 2 - 1, 0]}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody ref={j2} linearDamping={2} angularDamping={2} colliders={false} position={[0, height / 2 - 2, 0]}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody ref={j3} linearDamping={2} angularDamping={2} colliders={false} position={[0, height / 2 - 3, 0]}><BallCollider args={[0.1]} /></RigidBody>

      <RigidBody 
        ref={card} 
        type={dragged ? 'kinematicPosition' : 'dynamic'} 
        colliders={false}
        position={[0, height / 2 - 4, 0]}
        linearDamping={1}
        angularDamping={1}
        onPointerDown={(e) => { e.target.setPointerCapture(e.pointerId); setDragged(true); }}
        onPointerUp={(e) => { e.target.releasePointerCapture(e.pointerId); setDragged(false); }}
      >
        <CuboidCollider args={[0.8, 1.2, 0.05]} />
        <mesh castShadow>
          <boxGeometry args={[1.6, 2.4, 0.08]} />
          <meshStandardMaterial map={texture || null} color={texture ? "white" : "gray"} roughness={0.15} metalness={0.5} />
        </mesh>
      </RigidBody>
    </>
  )
}

export default function InteractiveLanyard({ cardImg }) {
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleError = (e) => setError(e.message)
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  if (error) return <div className="p-4 text-red-500 bg-red-100 rounded">Interactive 3D Error: {error}</div>

  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        onError={(e) => setError(e.message)}
      >
        <React.Suspense fallback={null}>
          <Physics interpolate gravity={[0, -40, 0]}>
            <LanyardComponent cardImg={cardImg} />
          </Physics>
          <Environment preset="city" />
        </React.Suspense>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
      </Canvas>
    </div>
  )
}
