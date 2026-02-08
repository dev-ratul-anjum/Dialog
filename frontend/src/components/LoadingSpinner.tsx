const LoadingSpinner = () => {
  return (
    <div
      className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4 p-8 sm:min-h-[60vh] md:p-12 lg:min-h-[70vh]"
      aria-label="Loading content"
      role="status"
    >
      <div className="relative flex items-center justify-center">
        {/* Background Ring (Static) */}
        <div className="border-slate-200 h-12 w-12 rounded-full border-4 sm:h-14 sm:w-14 md:h-16 md:w-16"></div>

        {/* Rotating Ring (Animated) */}
        <div className="border-blue-600 absolute h-12 w-12 animate-spin rounded-full border-4 border-t-transparent sm:h-14 sm:w-14 md:h-16 md:w-16"></div>
      </div>

      {/* Loading Text */}
      <span className="text-slate-500 animate-pulse text-sm font-medium tracking-wide sm:text-base">
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;
