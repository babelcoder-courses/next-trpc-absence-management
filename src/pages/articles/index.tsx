import { type GetStaticProps } from 'next';
import ArticleList from '~/features/articles/components/ArticleList';
import Layout from '~/features/ui/components/layouts/Normal';
import { generateServerSideHelper } from '~/server/shared/serverSideHelper';

const IndexPage = () => {
  return <ArticleList></ArticleList>;
};

export const getStaticProps: GetStaticProps = async () => {
  const helpers = generateServerSideHelper();
  await helpers.article.list.prefetch();

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
    revalidate: 60 * 5,
  };
};

IndexPage.getLayout = Layout;

export default IndexPage;
