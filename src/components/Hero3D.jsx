import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'

function Blob() {
  const ref = useRef()
  // Shrink on narrow/portrait screens so it doesn't swallow the page.
  const vw = useThree(s => s.viewport.width)
  const scale = Math.min(1.65, vw * 0.3)
  useFrame((state, dt) => {
    const m = ref.current
    m.rotation.y += dt * 0.15
    m.rotation.x += (state.pointer.y * 0.4 - m.rotation.x) * 0.04
    m.position.x += (state.pointer.x * 0.5 - m.position.x) * 0.04
    m.position.y += (state.pointer.y * 0.3 - m.position.y) * 0.04
  })
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={ref} scale={scale}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial color="#5b3df0" emissive="#1e0d5c" emissiveIntensity={0.6} roughness={0.18} metalness={0.15} clearcoat={1} distort={0.42} speed={1.6} />
      </mesh>
    </Float>
  )
}

function Ring() {
  const vw = useThree(s => s.viewport.width)
  const ref = useRef()
  useFrame((_, dt) => {
    ref.current.rotation.z += dt * 0.12
    ref.current.rotation.x = 1.2
  })
  return (
    <mesh ref={ref} scale={Math.min(2.9, vw * 0.5)}>
      <torusGeometry args={[1, 0.004, 16, 200]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
    </mesh>
  )
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 4, 4]} intensity={2.4} color="#a78bfa" />
      <pointLight position={[-4, -1, 3]} intensity={70} color="#22d3ee" />
      <pointLight position={[3, -3, 2]} intensity={55} color="#f472b6" />
      <pointLight position={[0, 4, -2]} intensity={30} color="#8b5cf6" />
      <Blob />
      <Ring />
      <Sparkles count={140} scale={[14, 9, 6]} size={2.4} speed={0.35} opacity={0.75} color="#c4b5fd" />
    </Canvas>
  )
}
