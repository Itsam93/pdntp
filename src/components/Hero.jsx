import logo from "../assets/healing-streams-logo.png";

function Hero() {
  return (
    <section className="flex flex-col items-center lg:items-start text-center lg:text-left py-8">

      {/* Logo */}
      <div className="flex justify-center w-full mb-8">
        <img
          src={logo}
          alt="Healing Streams Live Healing Services"
          className="h-32 md:h-40 lg:h-44 w-auto object-contain"
        />
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
        Sponsor Healing To The Nations Magazines
      </h1>

      {/* Decorative Line */}
      <div className="mt-8 h-1 w-32 rounded-full bg-gradient-to-r from-green-400 via-white to-red-500" />

      {/* Supporting Text */}
      <p className="mt-8 text-sm md:text-base text-white/80 max-w-xl">
        Join millions around the world in spreading hope, healing, and the
        Gospel by sponsoring the Healing To The Nations (HTTN) Magainzes.
      </p>

    </section>
  );
}

export default Hero;