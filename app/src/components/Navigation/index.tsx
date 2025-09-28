export function Navigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-gray-800">
      <div className="flex justify-around items-center py-4">
        {/* Profile - Active */}
        <div className="flex flex-col items-center space-y-1">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-xs text-white font-medium">Profile</span>
        </div>

        {/* Rewards - Disabled */}
        <div className="flex flex-col items-center space-y-1 opacity-50">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-xs text-gray-400">Rewards</span>
        </div>

        {/* Play - Disabled */}
        <div className="flex flex-col items-center space-y-1 opacity-50">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-xs text-gray-400">Play</span>
        </div>
      </div>
    </div>
  );
}
