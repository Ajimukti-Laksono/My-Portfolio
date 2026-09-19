/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import * as THREE from 'three'

extend({ MeshLineGeometry, MeshLineMaterial })

// ─── Band (the rope + card physics) ────────────────────────────────
function Band({ isDarkMode }) {
  const band = useRef()
  const fixed = useRef()
  const j1 = useRef()
  const j2 = useRef()
  const j3 = useRef()
  const card = useRef()
  const vec = new THREE.Vector3()
  const dir = new THREE.Vector3()

  const { width, height } = useThree((state) => state.viewport)
  const [dragged, setDragged] = useState(false)
  const [hovered, setHovered] = useState(false)

  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 }

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  )

  // Rope joints
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j2, j3, [[0, 0, 0], [0, 0, 0]])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  useFrame((state) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      })
    }

    if (fixed.current) {
      // Dampen angular velocity
      ;[j1, j2].forEach((ref) => {
        if (!ref.current) return
        const av = ref.current.angvel()
        ref.current.setAngvel({ x: av.x * 0.92, y: av.y * 0.92, z: av.z * 0.92 }, true)
      })

      // Update curve for the band
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.translation())
      curve.points[2].copy(j1.current.translation())
      curve.points[3].copy(fixed.current.translation())

      band.current.geometry.setPoints(curve.getPoints(32))

      // Straighten card rotation on Y axis
      const angvel = card.current.angvel()
      const quat = card.current.rotation()
      // Convert quaternion to euler for Y correction
      const euler = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion(quat.x, quat.y, quat.z, quat.w)
      )
      card.current.setAngvel(
        { x: angvel.x, y: angvel.y - euler.y * 0.25, z: angvel.z },
        true
      )
    }
  })

  // Colors
  const cardBg = isDarkMode ? '#0f172a' : '#f0f0f5'
  const accentColor = '#6366f1'

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          angularDamping={2}
          linearDamping={2}
        >
          <CuboidCollider args={[0.85, 1.25, 0.05]} />
          <group scale={2.25} position={[0, -1.2, -0.01]}>
            {/* Card body */}
            <mesh
              onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
              onPointerOut={() => { setHovered(false); setDragged(false) }}
              onPointerUp={(e) => {
                setDragged(false)
                e.target.releasePointerCapture(e.pointerId)
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                setDragged(
                  new THREE.Vector3()
                    .copy(e.point)
                    .sub(vec.copy(card.current.translation()))
                )
                e.target.setPointerCapture(e.pointerId)
              }}
            >
              <boxGeometry args={[0.76, 1.12, 0.03]} />
              <meshPhysicalMaterial
                color={cardBg}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.05}
              />
            </mesh>

            {/* Top accent stripe */}
            <mesh position={[0, 0.54, 0.017]}>
              <planeGeometry args={[0.76, 0.04]} />
              <meshBasicMaterial color={accentColor} />
            </mesh>

            {/* Photo placeholder (colored rectangle) */}
            <mesh position={[0, 0.18, 0.017]}>
              <planeGeometry args={[0.32, 0.32]} />
              <meshStandardMaterial color="#818cf8" metalness={0.3} roughness={0.5} />
            </mesh>

            {/* Photo border glow */}
            <mesh position={[0, 0.18, 0.016]}>
              <planeGeometry args={[0.34, 0.34]} />
              <meshBasicMaterial color={accentColor} transparent opacity={0.3} />
            </mesh>

            {/* Name bar */}
            <mesh position={[0, -0.06, 0.017]}>
              <planeGeometry args={[0.5, 0.06]} />
              <meshBasicMaterial color={isDarkMode ? '#e2e8f0' : '#1e293b'} />
            </mesh>

            {/* Title bar */}
            <mesh position={[0, -0.14, 0.017]}>
              <planeGeometry args={[0.35, 0.04]} />
              <meshBasicMaterial color="#818cf8" />
            </mesh>

            {/* Tech chip 1 */}
            <mesh position={[-0.19, -0.26, 0.017]}>
              <planeGeometry args={[0.16, 0.04]} />
              <meshBasicMaterial color={isDarkMode ? '#1e293b' : '#e2e8f0'} />
            </mesh>
            {/* Tech chip 2 */}
            <mesh position={[0, -0.26, 0.017]}>
              <planeGeometry args={[0.16, 0.04]} />
              <meshBasicMaterial color={isDarkMode ? '#1e293b' : '#e2e8f0'} />
            </mesh>
            {/* Tech chip 3 */}
            <mesh position={[0.19, -0.26, 0.017]}>
              <planeGeometry args={[0.16, 0.04]} />
              <meshBasicMaterial color={isDarkMode ? '#1e293b' : '#e2e8f0'} />
            </mesh>

            {/* Barcode area */}
            {Array.from({ length: 16 }).map((_, i) => (
              <mesh key={i} position={[-0.28 + i * 0.02, -0.4, 0.017]}>
                <planeGeometry args={[0.008, 0.02 + Math.sin(i * 1.7) * 0.015]} />
                <meshBasicMaterial color={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'} transparent opacity={isDarkMode ? 0.2 : 0.15} />
              </mesh>
            ))}

            {/* Metal clip at top */}
            <mesh position={[0, 0.59, 0]}>
              <boxGeometry args={[0.12, 0.08, 0.05]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Clip ring */}
            <mesh position={[0, 0.66, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.035, 0.01, 8, 16]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.05} />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* The rope/band mesh */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#6366f1"
          opacity={1}
          transparent
          depthTest={false}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}

// ─── Error Boundary ────────────────────────────────────────────────
class Lanyard3DErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    console.warn('[Lanyard3D] Error caught:', error?.message)
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

// ─── Main Component ────────────────────────────────────────────────
export default function Lanyard3D({ isDarkMode, fallback }) {
  return (
    <Lanyard3DErrorBoundary fallback={fallback}>
      <div style={{ width: '100%', height: '100%', minHeight: '520px', touchAction: 'none', cursor: 'grab' }}>
        <Canvas
          camera={{ position: [0, 0, 13], fov: 25 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1} />
          <React.Suspense fallback={null}>
            <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
              <Band isDarkMode={isDarkMode} />
            </Physics>
            <Environment blur={0.75}>
              <Lightformer intensity={2} color="white" rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
              <Lightformer intensity={3} color="#818cf8" rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
              <Lightformer intensity={3} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
              <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
              <Lightformer type="ring" intensity={2} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={10} />
            </Environment>
          </React.Suspense>
        </Canvas>
      </div>
    </Lanyard3DErrorBoundary>
  )
}
