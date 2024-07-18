import React from 'react';

const VideoSkeletonCard: React.FC = () => {
  return (
    <li className="border border-gray-300 p-4 rounded">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </li>
  );
};

export default VideoSkeletonCard;
