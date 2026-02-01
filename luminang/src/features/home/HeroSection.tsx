export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Placeholder */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
        <div className="absolute inset-0 bg-zinc-900" />
      </div>

      {/* Centered Content */}
      <div className="relative z-20 section-container text-center px-4">
        <h1 className="font-serif text-6xl md:text-8xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 drop-shadow-2xl">
          LUMINANG
        </h1>
        <p className="text-2xl md:text-3xl text-amber-100 max-w-4xl mx-auto drop-shadow-lg font-light">
          Voices of the Regions
        </p>
      </div>
    </section>
  );
}