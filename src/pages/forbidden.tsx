import Layout from '~/features/ui/components/layouts/Normal';
import { type NextPageWithLayout } from './_app';

const ForbiddenPage: NextPageWithLayout = () => {
  return <div>Forbidden</div>;
};

ForbiddenPage.getLayout = Layout;

export default ForbiddenPage;
