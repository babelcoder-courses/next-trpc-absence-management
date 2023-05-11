import Layout from '~/features/ui/components/layouts/Normal';
import { type NextPageWithLayout } from '../_app';
import LeaveList from '~/features/leaves/components/LeaveList';

const IndexPage: NextPageWithLayout = () => {
  return <LeaveList></LeaveList>;
};

IndexPage.getLayout = Layout;

export default IndexPage;
