import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    alert('Thank you for reaching out! We will be in touch soon.')
    setEmail('')
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center py-32"
      style={{ background: '#050505' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
        <h2
          ref={headlineRef}
          className="font-serif text-[10vw] md:text-[6vw] lg:text-[5vw] text-white leading-[1] tracking-tight mb-6"
        >
          Ready to{' '}
          <span className="italic font-light text-white/80">flow?</span>
        </h2>

        <p className="font-sans text-base md:text-lg text-white/50 mb-16 max-w-lg mx-auto leading-relaxed">
          Let's create something clear, compelling, and unmistakably yours. 
          Drop your email and we'll start the conversation.
        </p>

        <div ref={formRef}>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 max-w-xl mx-auto">
            {/* Email input with liquid glass styling */}
            <div className="relative flex-1 w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-transparent border-b border-white/20 focus:border-white/50 
                          text-white font-sans text-base px-0 py-4 outline-none 
                          placeholder:text-white/30 transition-colors duration-300"
              />
              {/* Bottom line glow on focus */}
              <div
                className="absolute bottom-0 left-0 h-px bg-white/40 transition-all duration-500"
                style={{
                  width: email ? '100%' : '0%',
                }}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="glass-pill px-10 py-4 font-sans text-sm font-semibold tracking-wider uppercase 
                        text-white bg-white/5 hover:bg-white/15 transition-all duration-300 shrink-0"
              style={{
                boxShadow: isHovered
                  ? '0 0 30px rgba(255,255,255,0.15), inset 0 1px 1px rgba(255,255,255,0.15)'
                  : undefined,
              }}
            >
              Send
            </button>
          </form>
        </div>

        {/* Contact details */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-sans text-[10px] font-medium tracking-widest uppercase text-white/30 mb-2">
              Email
            </p>
            <a
              href="mailto:hello@clearvisuals.co"
              className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-300"
            >
              hello@clearvisuals.co
            </a>
          </div>
          <div>
            <p className="font-sans text-[10px] font-medium tracking-widest uppercase text-white/30 mb-2">
              Location
            </p>
            <p className="font-sans text-sm text-white/60">
              New York, NY
            </p>
          </div>
          <div>
            <p className="font-sans text-[10px] font-medium tracking-widest uppercase text-white/30 mb-2">
              Social
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="#" className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-300">
                Instagram
              </a>
              <a href="#" className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-300">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
