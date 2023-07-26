import Layout from '~/features/ui/components/layouts/Admin';
import { type NextPageWithLayout } from '../_app';

const DashboardPage: NextPageWithLayout = () => {
  return <div>Dashboard Page</div>;
};

DashboardPage.getLayout = Layout;

export default DashboardPage;
