import Hero from "../components/Hero";
import RegistrationForm from "../components/RegistrationForm";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B7A3B] via-[#0F8E46] to-[#0C5AA6] px-4 sm:px-6 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen">

          {/* Hero Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <Hero />
          </div>

          {/* Registration Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-green-100">
              <RegistrationForm />
            </div>
          </div>

        </div>
        <p className="flex justify-center text-sm md:text-base text-white/80">Christ Embassy Nigeria North West Zone One</p>
      </div>
    </div>
  );
}

export default Home;