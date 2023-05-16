import Loading from '~/features/ui/components/Loading';
import { api } from '~/utils/api';
import LeaveItem from './LeaveItem';
import FloatingActionButton from '~/features/ui/components/FloatingActionButton';
import { useRouter } from 'next/router';

const LeaveList = () => {
  const router = useRouter();
  const { data: leaves, isLoading } = api.leave.list.useQuery(); // CSR

  if (isLoading) return <Loading></Loading>;
  if (!leaves) return <div>Not found.</div>;

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {leaves.map((leave) => (
        <LeaveItem key={leave.id} {...leave}></LeaveItem>
      ))}
      <FloatingActionButton onClick={() => router.push('/leaves/new')}>
        +
      </FloatingActionButton>
    </div>
  );
};

export default LeaveList;
