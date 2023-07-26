import Login from '~/features/auth/components/Login';
import { type NextPageWithLayout } from '../_app';
import Layout from '~/features/ui/components/layouts/Normal';

const LoginPage: NextPageWithLayout = () => {
  return <Login></Login>;
};

LoginPage.getLayout = Layout;

export default LoginPage;
