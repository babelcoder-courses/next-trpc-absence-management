import Layout from '~/features/ui/components/layouts/Admin';
import { type NextPageWithLayout } from '../_app';

const ArticlesPage: NextPageWithLayout = () => {
  return <div>Articles Page</div>;
};

ArticlesPage.getLayout = Layout;

export default ArticlesPage;
