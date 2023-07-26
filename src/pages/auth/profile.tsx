import Profile from '~/features/auth/components/Profile';
import { type NextPageWithLayout } from '../_app';
import Layout from '~/features/ui/components/layouts/Normal';

const ProfilePage: NextPageWithLayout = () => {
  return <Profile></Profile>;
};

ProfilePage.getLayout = Layout;

export default ProfilePage;
