import logo from "../assets/pdntp-logo.png";

function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-b from-white via-emerald-50/40 to-white">

      {/* COMPLETION BANNER */}

      {/* LOGO */}
      <div className="mb-6 flex items-center justify-center">
        <img
          src={logo}
          alt="PDNTP Logo"
          className="h-40 w-auto object-contain"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        Pastoral and Deaconary Nominees Training Program (PDNTP)
      </h1>

      {/* SUBTITLE */}
      <p className="mt-4 max-w-xl text-base md:text-lg text-gray-600">
        Create your Pastors and Deaconary avatars.
      </p>

      {/* ACCENT LINE */}
      <div className="mt-8 h-[3px] w-28 bg-gradient-to-r from-emerald-500 to-yellow-400 rounded-full" />

      {/* BRAND HINT TEXT */}
      <p className="mt-6 text-xs tracking-wider text-gray-400 uppercase">
        Powered by PDNTP 2026
      </p>

    </section>
  );
}

export default Hero;