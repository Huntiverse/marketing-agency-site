import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const manifestoLines = [
  'Clarity is a rare force.',
  'It cuts through noise,',
  'exposes',
  'and demands attention.',
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const linesRef = useRef<(HTMLDivElement | null)[]>([])
  const truthRef = useRef<HTMLSpanElement>(null)
  const visionRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Line reveal animation with clip-path
      linesRef.current.forEach((line) => {
        if (!line) return
        gsap.fromTo(
          line,
          {
            clipPath: 'inset(100% 0 0 0)',
            y: 40,
          },
          {
            clipPath: 'inset(0% 0 0 0)',
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.8,
            },
          }
        )
      })

      // Word morph: truth -> vision
      const morphTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 40%',
          end: 'top 10%',
          scrub: 1,
        },
      })

      if (truthRef.current && visionRef.current) {
        morphTl
          .to(truthRef.current, {
            rotateX: -90,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          })
          .fromTo(
            visionRef.current,
            { rotateX: 90, opacity: 0 },
            { rotateX: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
            0.25
          )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center py-32"
      style={{ background: '#050505' }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="space-y-2">
          {manifestoLines.map((line, i) => (
            <div
              key={i}
              ref={(el) => { linesRef.current[i] = el }}
              className="overflow-hidden"
            >
              <p className="font-serif text-[6vw] md:text-[4vw] lg:text-[3.5vw] text-white leading-[1.1] tracking-tight">
                {i === 2 ? (
                  <span className="inline-flex items-center" style={{ perspective: '1000px' }}>
                    <span
                      ref={truthRef}
                      className="inline-block text-white/90 italic"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      truth
                    </span>
                    <span
                      ref={visionRef}
                      className="inline-block text-white/90 italic absolute"
                      style={{
                        transformStyle: 'preserve-3d',
                        opacity: 0,
                        transform: 'rotateX(90deg)',
                      }}
                    >
                      vision
                    </span>
                    <span className="ml-2">,</span>
                  </span>
                ) : (
                  line
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Philosophy statement */}
        <div className="mt-20 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-sans text-xs font-medium tracking-widest uppercase text-white/40 mb-4">
              Our Philosophy
            </h3>
            <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed">
              We believe the best marketing doesn't shout — it resonates. In a world 
              drowning in content, clarity becomes your competitive advantage. We craft 
              visual narratives that cut through the static and land with precision.
            </p>
          </div>
          <div>
            <h3 className="font-sans text-xs font-medium tracking-widest uppercase text-white/40 mb-4">
              Our Approach
            </h3>
            <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed">
              Every campaign begins with a single question: what truth are we 
              revealing? From strategy to execution, we strip away the unnecessary 
              until only the essential remains. The result is work that feels 
              inevitable — as if it always existed, waiting to be discovered.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
