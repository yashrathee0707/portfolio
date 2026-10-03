import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'

/** On wide screens the shape sits to the right of the text; on narrow ones it's centered behind it. */
function useLayout() {
  const vw = useThree(s => s.viewport.width)
  const wide = useThree(s => s.size.width) >= 1100
  return { x: wide ? vw * 0.26 : 0, scale: wide ? Math.min(1.3, vw * 0.105) : Math.min(1.3, vw * 0.3) }
}

function Blob() {
  const ref = useRef()
  const { x, scale } = useLayout()
  useFrame((state, dt) => {
    const m = ref.current
    m.rotation.y += dt * 0.12
    m.rotation.x += (state.pointer.y * 0.3 - m.rotation.x) * 0.04
    m.position.x += (x + state.pointer.x * 0.3 - m.position.x) * 0.04
    m.position.y += (state.pointer.y * 0.2 - m.position.y) * 0.04
  })
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} scale={scale} position={[x, 0, 0]}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial color="#3f30b8" emissive="#120838" emissiveIntensity={0.6} roughness={0.2} metalness={0.15} clearcoat={1} distort={0.32} speed={1.3} />
      </mesh>
    </Float>
  )
}

function Ring() {
  const ref = useRef()
  const { x, scale } = useLayout()
  useFrame((_, dt) => {
    ref.current.rotation.z += dt * 0.1
    ref.current.rotation.x = 1.2
  })
  return (
    <mesh ref={ref} scale={scale * 1.6} position={[x, 0, 0]}>
      <torusGeometry args={[1, 0.004, 16, 200]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
    </mesh>
  )
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 4, 4]} intensity={2.4} color="#a78bfa" />
      <pointLight position={[-2, -1, 3]} intensity={60} color="#22d3ee" />
      <pointLight position={[5, -3, 2]} intensity={45} color="#f472b6" />
      <pointLight position={[2, 4, -2]} intensity={30} color="#8b5cf6" />
      <Blob />
      <Ring />
      <Sparkles count={90} scale={[14, 9, 6]} size={2} speed={0.3} opacity={0.5} color="#c4b5fd" />
    </Canvas>
  )
}
