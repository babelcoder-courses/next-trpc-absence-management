import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
} from 'next';
import AnnouncementDetails from '~/features/announcements/components/AnnouncementDetails';
import Layout from '~/features/ui/components/layouts/Normal';
import { generateServerSideHelper } from '~/server/shared/serverSideHelper';

const DetailsPage = ({
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <AnnouncementDetails slug={slug}></AnnouncementDetails>;
};

export const getServerSideProps: GetServerSideProps<{ slug: string }> = async (
  context,
) => {
  const slug = context.params?.slug as string;
  const helpers = generateServerSideHelper();

  await helpers.announcement.bySlug.prefetch(slug);

  return {
    props: {
      trpcState: helpers.dehydrate(),
      slug,
    },
  };
};

DetailsPage.getLayout = Layout;

export default DetailsPage;
