import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1A2B] text-white">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px]" />
      </div>

      {/* GRID PATTERN (optional subtle texture) */}
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle,_white_1px,_transparent_1px)] [background-size:20px_20px]" />

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        
        {/* BADGE */}
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-slate-300 backdrop-blur">
          🇰🇷 Study • Work • Travel
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
          Your Gateway to{" "}
          <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Korea
          </span>
          🇰🇷
        </h1>

        {/* SUBTEXT */}
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Complete visa guides, travel insights, and career pathways to help you
          start your journey in Korea with confidence.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          
          <Link
            href="/guides"
            className="
              px-8 py-4 rounded-full font-semibold
              bg-gradient-to-r from-blue-600 to-green-500
              hover:from-blue-500 hover:to-green-400
              shadow-lg shadow-blue-900/30
              transition-all duration-300
            "
          >
            Explore Guides →
          </Link>

          <Link
            href="#visa-types"
            className="
              px-8 py-4 rounded-full font-semibold
              border border-white/20
              text-slate-300
              hover:bg-white/10
              backdrop-blur
              transition-all duration-300
            "
          >
            Check Visa Types
          </Link>
        </div>
      </div>
    </section>
  );
}