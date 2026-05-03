import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect } from 'react'
import gsap from 'gsap'

// Vertex shader for liquid mesh distortion
const vertexShader = `
  uniform float uTime;
  uniform float uScrollSpeed;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Base wave oscillation
    float wave1 = sin(pos.x * 2.0 + uTime * 0.8) * 0.15;
    float wave2 = sin(pos.y * 1.5 + uTime * 0.6) * 0.1;
    float wave3 = sin((pos.x + pos.y) * 1.0 + uTime * 0.4) * 0.08;
    
    // Mouse repulsion
    float dist = distance(uv, uMouse);
    float repulsion = smoothstep(0.4, 0.0, dist) * 0.3;
    
    // Scroll tension
    float tension = uScrollSpeed * 0.5;
    
    pos.z += wave1 + wave2 + wave3 + repulsion + tension;
    vElevation = pos.z;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// Fragment shader with Fresnel rim light
const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Base void color
    vec3 baseColor = vec3(0.02, 0.02, 0.02);
    
    // Fresnel rim light effect
    float fresnel = pow(1.0 - abs(vElevation) * 2.0, 3.0);
    vec3 rimColor = vec3(0.3, 0.35, 0.4) * fresnel * 0.8;
    
    // Subtle blue bioluminescence
    float glow = smoothstep(0.0, 0.15, vElevation) * 0.15;
    vec3 glowColor = vec3(0.1, 0.2, 0.4) * glow;
    
    vec3 finalColor = baseColor + rimColor + glowColor;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function LiquidMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const scrollRef = useRef(0)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScrollSpeed: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight
    }

    const handleScroll = () => {
      scrollRef.current = window.scrollY * 0.001
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime
      
      // Smooth mouse lerp
      material.uniforms.uMouse.value.x +=
        (mouseRef.current.x - material.uniforms.uMouse.value.x) * 0.05
      material.uniforms.uMouse.value.y +=
        (mouseRef.current.y - material.uniforms.uMouse.value.y) * 0.05
      
      // Scroll tension
      material.uniforms.uScrollSpeed.value +=
        (scrollRef.current - material.uniforms.uScrollSpeed.value) * 0.02
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[8, 8, 100, 100]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60, rotateX: 10 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power3.out', delay: 0.3 }
      )

      gsap.fromTo(
        subheadRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.8 }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 2, 4], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#050505' }}
        >
          <LiquidMesh />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <h1
          ref={headlineRef}
          className="font-serif text-[10vw] md:text-[8vw] lg:text-[7vw] text-white text-center leading-[0.95] tracking-tight will-change-transform"
          style={{ perspective: '1000px' }}
        >
          <span className="block">Marketing</span>
          <span className="block italic font-light text-white/80">that flows.</span>
        </h1>

        <p
          ref={subheadRef}
          className="mt-8 text-sm md:text-base font-sans font-light text-white/50 tracking-widest uppercase"
        >
          Scroll to dive deeper
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #050505, transparent)',
        }}
      />
    </section>
  )
}
