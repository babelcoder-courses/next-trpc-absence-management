import ArticleDetails from '~/features/articles/components/ArticleDetails';
import Layout from '~/features/ui/components/layouts/Normal';

const DetailsPage = () => {
  return <ArticleDetails></ArticleDetails>;
};

DetailsPage.getLayout = Layout;

export default DetailsPage;
