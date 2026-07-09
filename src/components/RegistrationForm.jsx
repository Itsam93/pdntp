import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const initialFormState = {
  title: "",
  fullName: "",
  churchName: "",
  magazineCategory: "",
  numberOfCopies: "",
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

    if (error) setError("");
  };

  const validateCopies = (category, copies) => {
    const count = Number(copies);

    if (isNaN(count) || count <= 0) {
      return "Please enter a valid number of copies.";
    }

    switch (category) {
      case "1-99":
        if (count < 1 || count > 99) {
          return "For the selected category, the number of copies must be between 1 and 99.";
        }
        break;

      case "100-499":
        if (count < 100 || count > 499) {
          return "For the selected category, the number of copies must be between 100 and 499.";
        }
        break;

      case "500-999":
        if (count < 500 || count > 999) {
          return "For the selected category, the number of copies must be between 500 and 999.";
        }
        break;

      case "1000+":
        if (count < 1000) {
          return "For the selected category, the number of copies must be 1000 or more.";
        }
        break;

      default:
        break;
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const {
      title,
      fullName,
      churchName,
      magazineCategory,
      numberOfCopies,
    } = formData;

    if (
      !title ||
      !fullName ||
      !churchName ||
      !magazineCategory ||
      !numberOfCopies
    ) {
      setError("Please complete all fields.");
      return;
    }

    const validationError = validateCopies(
      magazineCategory,
      numberOfCopies
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      localStorage.setItem(
        "avatarUser",
        JSON.stringify(formData)
      );

      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } catch {
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      navigate("/avatar");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-2xl">
      <div className="relative rounded-3xl border border-green-100 bg-white p-8 shadow-xl">
        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-white/80 backdrop-blur-sm">
            <Spinner />
          </div>
        )}

        <div
          className={
            isSubmitting ? "pointer-events-none opacity-40" : ""
          }
        >
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Generate Your Avatar
            </h2>

            <p className="mt-2 text-gray-600">
              Sponsor the Healing To The Nations Magazines
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Title
              </label>

              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
              >
                <option value="">Select Title</option>
                <option value="Pastor">Pastor</option>
                <option value="Deacon">Deacon</option>
                <option value="Deaconess">Deaconess</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Miss">Miss</option>
                <option value="Master">Master</option>
              </select>
            </div>

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
              />
            </div>

            {/* Church Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Name of Church
              </label>

              <input
                type="text"
                name="churchName"
                placeholder="Enter your church name"
                value={formData.churchName}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
              />
            </div>

            {/* Sponsorship Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Select your category
              </label>

              <select
                name="magazineCategory"
                value={formData.magazineCategory}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
              >
                <option value="">Select Sponsorship Category</option>

                <option value="1-99">
                  1 – 99 Copies (₦600 – ₦59,400 | 0.3 – 29.7 Espees)
                </option>

                <option value="100-499">
                  100 – 499 Copies (₦60,000 – ₦299,400 | 30 – 149.7
                  Espees)
                </option>

                <option value="500-999">
                  500 – 999 Copies (₦300,000 – ₦599,400 | 150 – 299.7
                  Espees)
                </option>

                <option value="1000+">
                  1000 Copies and Above (₦600,000 and above | 300
                  Espees and above)
                </option>
              </select>
            </div>

            {/* Number of Copies */}
            {formData.magazineCategory && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Number of Copies
                </label>

                <input
                  type="number"
                  name="numberOfCopies"
                  min="1"
                  placeholder="Enter the exact number of copies"
                  value={formData.numberOfCopies}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Enter the exact number of magazines you are
                  sponsoring.
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#0B7A3B] py-3 font-semibold text-white transition hover:bg-[#096431] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Generating Avatar..."
                : "Generate My Avatar"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegistrationForm;