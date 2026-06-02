import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const initialFormState = {
  title: "",
  fullName: "",
  zone: "",
  region: "",
};

function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { title, fullName, zone, region } = formData;

    if (!title || !fullName || !zone || !region) {
      setError("Please complete all fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Save locally for avatar page
      localStorage.setItem("avatarUser", JSON.stringify(formData));

      // Optional API call
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } catch {
        // ignore analytics failure
      }

      const avatarType =
        title === "Pastor"
          ? "pastor"
          : "deacon";

      // small UX delay so spinner is visible
      await new Promise((res) => setTimeout(res, 800));

      navigate(`/avatar/${avatarType}`);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-12">

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm relative">

        {/* LOADING OVERLAY */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
            <Spinner />
          </div>
        )}

        {/* FORM CONTENT */}
        <div className={isSubmitting ? "opacity-40 pointer-events-none" : ""}>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Registration Form
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Complete the form below to proceed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* TITLE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title
              </label>

              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 focus:border-black outline-none"
              >
                <option value="">Select Title</option>
                <option value="Pastor">Pastor</option>
                <option value="Deacon">Deacon</option>
                <option value="Deaconess">Deaconess</option>
              </select>
            </div>

            {/* FULL NAME */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 focus:border-black outline-none"
              />
            </div>

            {/* ZONE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Zone
              </label>

              <input
                name="zone"
                type="text"
                value={formData.zone}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 focus:border-black outline-none"
              />
            </div>

            {/* REGION */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Region
              </label>

              <input
                name="region"
                type="text"
                value={formData.region}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 focus:border-black outline-none"
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#3a2418] text-white py-3 font-medium transition disabled:opacity-60"
            >
              Generate Avatar
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}

export default RegistrationForm;