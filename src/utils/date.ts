import { formatDistanceToNow } from 'date-fns';

export const formatRelativeTime = (dateString: string): string => {
  const uploadedAt = new Date(dateString);
  return formatDistanceToNow(uploadedAt, { addSuffix: true });
};
