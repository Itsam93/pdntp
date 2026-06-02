import { useEffect, useState } from "react";

function WelcomeBox() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unlocked = localStorage.getItem("pdntp_unlocked");

    if (!unlocked) {
      setVisible(true);
    }
  }, []);

  const handleProceed = () => {
    localStorage.setItem("pdntp_unlocked", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* MODAL */}
      <div className="relative z-10 w-[90%] max-w-md rounded-2xl
        bg-[#f7f1ec] p-8 text-center shadow-2xl">

        <h2 className="text-2xl font-bold text-[#3a2418]">
          🎉 Congratulations
        </h2>

        <p className="mt-3 text-gray-700">
           on Completing your PDNTP Program!
        </p>

        <button
          onClick={handleProceed}
          className="mt-6 w-full rounded-xl bg-[#3a2418] py-3
            font-semibold text-white hover:bg-[#4a2f1f] transition"
        >
          Click to Proceed
        </button>

      </div>
    </div>
  );
}

export default WelcomeBox;