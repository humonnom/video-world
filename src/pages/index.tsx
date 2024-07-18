import React from 'react';
import Pagination from '@/components/pagination';
import { FIRST_PAGE, VIDEO_PER_PAGE } from '@/constants/page';
import { useRouter } from 'next/router';
import VideoCard from '@/components/pages/index/VideoCard';
import VideoSkeletonCard from '@/components/pages/index/VideoSkeletonCard';
import { Routes } from '@/constants/routes';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { NextSeo } from 'next-seo';
import { fetchVideos } from '../../api/video';

interface HomeProps {
  currentPage: number;
  pageSize: number;
}

const Home: React.FC<HomeProps> = ({ currentPage, pageSize }) => {
  const router = useRouter();
  const { data, isLoading } = useQuery(
    ['videos', currentPage, pageSize],
    () => fetchVideos(currentPage, pageSize),
    {
      cacheTime: 0,
    }
  );

  const videos = data?.videos || [];

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0 });
    router.push({
      pathname: Routes.HOME,
      query: { ...router.query, page },
    });
  };

  const handlePageSizeChange = (size: number) => {
    router.push({
      pathname: Routes.HOME,
      query: { ...router.query, pageSize: size, page: FIRST_PAGE },
    });
  };

  const handleClickVideoCard = (id: number) => {
    router.push(`${Routes.VIDEO_DETAIL}/${id}`);
  };

  return (
    <>
      <NextSeo
        title="Video List - Video world"
        description="Browse our collection of videos on various topics. Find educational, entertaining, and informative content that suits your interests."
        openGraph={{
          title: 'Video List - Video world',
          description:
            'Browse our collection of videos on various topics. Find educational, entertaining, and informative content that suits your interests.',
          url: `https://${process.env.NEXT_PUBLIC_HOST}`,
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Video List</h2>
        <div className="mb-4">
          <label className="block mb-2">
            Page Size:
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="px-2 py-1 border border-gray-300 rounded"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
        <ul className="space-y-4">
          {isLoading
            ? Array.from({ length: pageSize }).map((_, index) => (
                <VideoSkeletonCard key={index} />
              ))
            : videos.map((video) => (
                <VideoCard key={video.id} video={video} onClick={() => {}} />
              ))}
        </ul>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const currentPage = Number(context.query.page) || FIRST_PAGE;
  const pageSize = Number(context.query.pageSize) || VIDEO_PER_PAGE;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['videos', currentPage, pageSize], () =>
    fetchVideos(currentPage, pageSize)
  );

  return {
    props: {
      currentPage,
      pageSize,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
