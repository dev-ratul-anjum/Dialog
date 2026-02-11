const LoadingSpinner = () => {
  return (
    <div
      className="bg-white flex min-h-[50vh] w-full flex-col items-center justify-center gap-4 p-8 sm:min-h-[60vh] md:p-12 lg:min-h-[70vh]"
      aria-label="Loading content"
      role="status"
    >
      <div className="relative flex items-center justify-center">
        {/* Background Ring (Static) */}
        <div className="border-slate-200 h-8 w-8 rounded-full border-4 sm:h-10 sm:w-10 md:h-12 md:w-12"></div>

        {/* Rotating Ring (Animated) */}
        <div className="border-blue-600 absolute h-8 w-8 animate-spin rounded-full border-4 border-t-transparent sm:h-10 sm:w-10 md:h-12 md:w-12"></div>
      </div>

      {/* Loading Text */}
      <span className="text-slate-500 animate-pulse text-sm font-medium tracking-wide sm:text-base">
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;
