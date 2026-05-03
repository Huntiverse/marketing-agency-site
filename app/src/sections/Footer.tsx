export default function Footer() {
  return (
    <footer
      className="relative w-full py-12 border-t border-white/5"
      style={{ background: '#050505' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg text-white/80">Clear Visuals</span>
            <span className="font-sans text-xs text-white/30">
              &copy; {new Date().getFullYear()}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors duration-300"
            >
              Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors duration-300 flex items-center gap-2"
          >
            <span>Back to top</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="rotate-180"
            >
              <path
                d="M6 2L6 10M6 10L2 6M6 10L10 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
