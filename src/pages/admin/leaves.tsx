import Layout from '~/features/ui/components/layouts/Admin';
import { type NextPageWithLayout } from '../_app';
import LeaveList from '~/features/leaves/components/admin/LeaveList';
import ProtectedRoute from '~/features/auth/guards/ProtectedRoute';

const LeavesPage: NextPageWithLayout = () => {
  return (
    <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
      <LeaveList></LeaveList>
    </ProtectedRoute>
  );
};

LeavesPage.getLayout = Layout;

export default LeavesPage;
