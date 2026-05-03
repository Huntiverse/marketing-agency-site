import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    id: 1,
    title: 'Prism Campaign',
    category: 'Brand Strategy',
    image: '/work_1.jpg',
    year: '2024',
  },
  {
    id: 2,
    title: 'Arcus Identity',
    category: 'Visual Identity',
    image: '/work_2.jpg',
    year: '2024',
  },
  {
    id: 3,
    title: 'Nexus Digital',
    category: 'Digital Experience',
    image: '/work_3.jpg',
    year: '2023',
  },
  {
    id: 4,
    title: 'Vertex Launch',
    category: 'Product Campaign',
    image: '/work_4.jpg',
    year: '2023',
  },
]

function WorkCard({ work }: { work: typeof works[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, card)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Liquid glass overlay */}
      <div className="absolute inset-x-4 bottom-4 liquid-glass rounded-xl p-4 md:p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-sans text-[10px] font-medium tracking-widest uppercase text-white/50 mb-1">
              {work.category}
            </p>
            <h4 className="font-serif text-xl md:text-2xl text-white">
              {work.title}
            </h4>
          </div>
          <span className="font-sans text-xs text-white/40">{work.year}</span>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: 'inset 0 0 60px rgba(255,255,255,0.05)',
        }}
      />
    </div>
  )
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, header)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full py-32"
      style={{ background: '#050505' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 md:mb-24">
          <h2 className="font-serif text-[8vw] md:text-[5vw] lg:text-[4vw] text-white leading-[1] tracking-tight mb-6">
            Selected Works
          </h2>
          <p className="font-sans text-base md:text-lg text-white/50 max-w-xl leading-relaxed">
            A curated collection of campaigns, identities, and digital experiences 
            that demonstrate our commitment to visual clarity and strategic impact.
          </p>
        </div>

        {/* Work grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-16 text-center">
          <button className="glass-pill px-8 py-3 font-sans text-sm font-medium tracking-wider uppercase text-white/70 hover:text-white transition-colors duration-300">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
}
