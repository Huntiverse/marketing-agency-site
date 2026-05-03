import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const pillRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const pill = pillRef.current
    const links = linksRef.current
    if (!pill || !links) return

    const linkEls = links.querySelectorAll('.nav-link')

    // Create scroll-driven morphing animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=300',
        scrub: 0.5,
      },
    })

    tl.to(pill, {
      width: 'min(600px, 85vw)',
      duration: 1,
      ease: 'power2.out',
    })

    tl.to(
      linkEls,
      {
        opacity: 1,
        x: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power2.out',
      },
      0.2
    )

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
      <div
        ref={pillRef}
        className="glass-pill flex items-center justify-between px-6 py-3 relative overflow-hidden"
        style={{ width: '200px' }}
      >
        {/* Soft glow behind pill */}
        <div
          className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Brand name */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="font-serif text-sm tracking-wide text-white/90 whitespace-nowrap relative z-10 shrink-0"
        >
          Clear Visuals
        </a>

        {/* Navigation links */}
        <div
          ref={linksRef}
          className="flex items-center gap-6 ml-4 relative z-10"
        >
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="nav-link text-xs font-sans font-medium tracking-wider uppercase text-white/60 hover:text-white transition-colors duration-300 opacity-0 translate-x-4 relative"
            >
              {link.label}
              {/* Underline indicator */}
              <span
                className="absolute -bottom-1 left-0 h-px bg-white/60 transition-all duration-300"
                style={{
                  width: hoveredIndex === i ? '100%' : '0%',
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
