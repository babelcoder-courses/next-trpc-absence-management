import Layout from '~/features/ui/components/layouts/Admin';
import { type NextPageWithLayout } from '../_app';

const AnnouncementsPage: NextPageWithLayout = () => {
  return <div>Announcements Page</div>;
};

AnnouncementsPage.getLayout = Layout;

export default AnnouncementsPage;
