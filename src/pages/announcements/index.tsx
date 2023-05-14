import { type GetServerSideProps } from 'next';
import AnnouncementList from '~/features/announcements/components/AnnouncementList';
import Layout from '~/features/ui/components/layouts/Normal';
import { generateServerSideHelper } from '~/server/shared/serverSideHelper';

const IndexPage = () => {
  return <AnnouncementList></AnnouncementList>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const helpers = generateServerSideHelper();
  await helpers.announcement.list.prefetch();

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};

IndexPage.getLayout = Layout;

export default IndexPage;
