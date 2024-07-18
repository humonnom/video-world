const videos = [
  {
    id: 1,
    title: 'Amazing Sunset at the Beach',
    description: 'Breathtaking view of the sun setting over the ocean',
    uploader: 'NatureLover123',
    uploadedAt: '2023-06-15T18:30:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 2,
    title: 'Quick and Easy Pasta Recipe',
    description: 'Learn how to make delicious pasta in just 15 minutes',
    uploader: 'ChefMaster',
    uploadedAt: '2023-06-14T12:45:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 3,
    title: '10-Minute Full Body Workout',
    description: 'Get fit with this quick and effective full body workout',
    uploader: 'FitnessGuru',
    uploadedAt: '2023-06-13T09:00:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 4,
    title: 'Top 5 Tourist Attractions in Paris',
    description: 'Discover the must-visit places in the City of Light',
    uploader: 'TravelExplorer',
    uploadedAt: '2023-06-12T15:20:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 5,
    title: 'DIY Home Decor Ideas',
    description: 'Creative and budget-friendly ways to decorate your home',
    uploader: 'CraftyCreator',
    uploadedAt: '2023-06-11T14:10:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 6,
    title: 'Understanding Blockchain Technology',
    description: "A beginner's guide to blockchain and its applications",
    uploader: 'TechExplained',
    uploadedAt: '2023-06-10T11:05:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 7,
    title: 'Classic Rock Guitar Solos Compilation',
    description: 'A collection of the greatest guitar solos in rock history',
    uploader: 'RockLegend',
    uploadedAt: '2023-06-09T20:30:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 8,
    title: 'Mastering Portrait Photography',
    description: 'Tips and tricks for taking stunning portrait photos',
    uploader: 'PhotoPro',
    uploadedAt: '2023-06-08T16:45:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 9,
    title: 'The Art of Bonsai',
    description: 'Learn the ancient Japanese art of growing miniature trees',
    uploader: 'BonsaiMaster',
    uploadedAt: '2023-06-07T13:15:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 10,
    title: 'Introduction to Machine Learning',
    description:
      'Understand the basics of machine learning and its applications',
    uploader: 'AIEnthusiast',
    uploadedAt: '2023-06-06T10:00:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 11,
    title: 'Extreme Sports Compilation',
    description: 'Adrenaline-pumping footage of various extreme sports',
    uploader: 'AdventureSeeker',
    uploadedAt: '2023-06-05T19:20:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 12,
    title: 'Mindfulness Meditation Guide',
    description: 'Learn how to practice mindfulness for stress relief',
    uploader: 'ZenMaster',
    uploadedAt: '2023-06-04T08:30:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 13,
    title: 'The History of Ancient Egypt',
    description: 'Explore the fascinating civilization of ancient Egypt',
    uploader: 'HistoryBuff',
    uploadedAt: '2023-06-03T14:50:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 14,
    title: "Beginner's Guide to Oil Painting",
    description: 'Start your journey into the world of oil painting',
    uploader: 'ArtistInspired',
    uploadedAt: '2023-06-02T11:25:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 15,
    title: 'Space Exploration: Past, Present, and Future',
    description:
      'A journey through the history and future of space exploration',
    uploader: 'SpaceEnthusiast',
    uploadedAt: '2023-06-01T17:40:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 16,
    title: 'Mastering the Art of Public Speaking',
    description: 'Tips to become a confident and effective public speaker',
    uploader: 'SpeakEasy',
    uploadedAt: '2023-05-31T13:00:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 17,
    title: 'The Science of Climate Change',
    description:
      'Understanding the causes and impacts of global climate change',
    uploader: 'ClimateScienceExpert',
    uploadedAt: '2023-05-30T09:15:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 18,
    title: 'Salsa Dancing for Beginners',
    description: 'Learn the basic steps and moves of salsa dancing',
    uploader: 'DanceInstructor',
    uploadedAt: '2023-05-29T20:10:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 19,
    title: 'The Art of Sushi Making',
    description: 'Master the techniques of making perfect sushi at home',
    uploader: 'SushiChef',
    uploadedAt: '2023-05-28T15:35:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 20,
    title: 'Understanding Cryptocurrency',
    description: "A beginner's guide to the world of cryptocurrency",
    uploader: 'CryptoExpert',
    uploadedAt: '2023-05-27T11:50:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 21,
    title: 'Wildlife of the African Savanna',
    description: 'Explore the diverse animal life in the African savanna',
    uploader: 'WildlifePhotographer',
    uploadedAt: '2023-05-26T18:05:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 22,
    title: 'Introduction to 3D Printing',
    description:
      'Learn the basics of 3D printing technology and its applications',
    uploader: 'TechInnovator',
    uploadedAt: '2023-05-25T14:20:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 23,
    title: 'The Art of Calligraphy',
    description: 'Master the beautiful art of handwritten lettering',
    uploader: 'CalligraphyArtist',
    uploadedAt: '2023-05-24T10:40:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 24,
    title: 'Understanding Quantum Physics',
    description:
      'A simplified explanation of the bizarre world of quantum physics',
    uploader: 'ScienceGuru',
    uploadedAt: '2023-05-23T16:55:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 25,
    title: 'Urban Gardening Tips',
    description: 'Learn how to create a thriving garden in small urban spaces',
    uploader: 'UrbanGardener',
    uploadedAt: '2023-05-22T12:30:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 26,
    title: 'The History of Jazz Music',
    description:
      'Explore the origins and evolution of jazz through the decades',
    uploader: 'JazzEnthusiast',
    uploadedAt: '2023-05-21T19:45:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 27,
    title: 'Mastering Digital Marketing',
    description: 'Learn effective strategies for successful digital marketing',
    uploader: 'MarketingPro',
    uploadedAt: '2023-05-20T15:10:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 28,
    title: 'The Art of Origami',
    description: 'Learn to create beautiful paper sculptures with origami',
    uploader: 'OrigamiMaster',
    uploadedAt: '2023-05-19T11:25:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 29,
    title: 'Understanding Artificial Intelligence',
    description: 'An introduction to AI and its impact on various industries',
    uploader: 'AIResearcher',
    uploadedAt: '2023-05-18T17:40:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 30,
    title: 'The Science of Sleep',
    description:
      'Explore the importance of sleep and tips for better sleep hygiene',
    uploader: 'SleepExpert',
    uploadedAt: '2023-05-17T13:55:00Z',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
];
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchVideos = async (
  page: number,
  pageSize: number
): Promise<{
  videos: typeof videos;
  totalSize: number;
}> => {
  // 5초 지연
  await delay(5000);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedVideos = videos.slice(start, end);

  return {
    videos: paginatedVideos,
    totalSize: videos.length,
  };
};

export const fetchVideo = async (id: string) => {
  const video = videos.find((video) => video.id.toString() === id);
  if (!video) {
    throw new Error('Video not found');
  }
  return {
    video,
  };
};
