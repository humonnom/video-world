import React from 'react';
import { Video } from '@/types/video';
import { formatRelativeTime } from '@/utils/date';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <li
      className="border border-gray-300 p-4 rounded cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
      <p className="text-gray-600">
        Uploaded by {video.uploader} {formatRelativeTime(video.uploadedAt)}
      </p>
    </li>
  );
};

export default VideoCard;
