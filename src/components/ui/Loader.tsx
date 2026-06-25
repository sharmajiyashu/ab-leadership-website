import React from 'react';

export const Loader = () => {
  return (
    <div className="w-full min-h-[300px] flex flex-col items-center justify-center bg-transparent">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 font-medium font-bricolage-text text-sm">Loading...</p>
    </div>
  );
};
