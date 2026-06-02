function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      
      {/* SPINNER */}
      <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-[#3a2418] animate-spin" />

      <p className="text-sm text-gray-600">
        Preparing your avatar...
      </p>

    </div>
  );
}

export default Spinner;