import Layout from '~/features/ui/components/layouts/Admin';
import { type NextPageWithLayout } from '../_app';

const UsersPage: NextPageWithLayout = () => {
  return <div>Users Page</div>;
};

UsersPage.getLayout = Layout;

export default UsersPage;
