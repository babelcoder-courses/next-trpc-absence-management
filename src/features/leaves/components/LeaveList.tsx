import Loading from '~/features/ui/components/Loading';
import { api } from '~/utils/api';
import LeaveItem from './LeaveItem';

const LeaveList = () => {
  const { data: leaves, isLoading } = api.leave.list.useQuery();

  if (isLoading) return <Loading></Loading>;
  if (!leaves) return <div>Not found.</div>;

  return (
    <div>
      {leaves.map((leave) => (
        <LeaveItem key={leave.id} {...leave}></LeaveItem>
      ))}
    </div>
  );
};

export default LeaveList;
