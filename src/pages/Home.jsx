import Hero from "../components/Hero";
import RegistrationForm from "../components/RegistrationForm";
import WelcomeBox from "../components/WelcomeBox";

function Home() {
  const isUnlocked =
    typeof window !== "undefined" &&
    localStorage.getItem("pdntp_unlocked") === "true";

  return (
    <>
      {/* GATE */}
      {!isUnlocked && <WelcomeBox />}

      {/* MAIN WRAPPER */}
      <div
        className={`min-h-screen transition-all duration-500 ${
          isUnlocked ? "" : "blur-sm pointer-events-none select-none"
        }`}
      >
        {/* BACKGROUND */}
        <div className="min-h-screen bg-gradient-to-br from-[#1c120c] via-[#2b1b12] to-[#3a2418] px-4 sm:px-6 lg:px-8 py-10">
          
          {/* CENTER CONTAINER */}
          <div className="mx-auto w-full max-w-6xl">
            
            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              
              {/* LEFT - HERO */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <Hero />
              </div>

              {/* RIGHT - FORM */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-md rounded-2xl bg-[#f7f1ec] p-5 sm:p-6 lg:p-8 shadow-2xl">
                  <RegistrationForm />
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Home;