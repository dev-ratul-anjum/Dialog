const ContactInfoSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Profile Section */}
      <div className="flex flex-col items-center bg-white p-6 shadow-sm rounded-lg">
        <div className="mb-4 h-36 w-36 rounded-full bg-gray-300 sm:h-36 sm:w-36"></div>

        <div className="h-6 w-32 rounded bg-gray-300 mb-1 sm:w-40"></div>
        <div className="h-4 w-40 rounded bg-gray-200 sm:w-48"></div>

        {/* Action Buttons */}
        <div className="mt-6 flex w-full justify-center gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-10 w-10 rounded-xl bg-gray-200"></div>
              <div className="h-3 w-10 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white p-4 shadow-sm rounded-lg">
        <div className="h-3 w-20 rounded bg-gray-200 mb-2"></div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-200 sm:w-5/6"></div>
          <div className="h-3 w-full rounded bg-gray-200 sm:w-4/6"></div>
        </div>
      </div>
    </div>
  );
};
export default ContactInfoSkeleton;
