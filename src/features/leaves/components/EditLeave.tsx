import { api } from '~/utils/api';
import LeaveForm from './LeaveForm';
import { useRouter } from 'next/router';
import Loading from '~/features/ui/components/Loading';
import { type UpdateLeaveInput } from '../types';

const EditLeave = () => {
  const utils = api.useContext();

  const router = useRouter();
  const id = +(router.query.id as string);
  const { mutateAsync: update } = api.leave.update.useMutation({
    onSuccess() {
      utils.leave.byId.invalidate(id);
    },
  });
  const { data: leave, isLoading } = api.leave.byId.useQuery(id);
  const editLeave = async (leave: UpdateLeaveInput['data']) => {
    await update({
      id,
      data: leave,
    });
    router.push('/leaves');
  };

  if (isLoading) return <Loading></Loading>;
  if (!leave) return <div>No leave data found.</div>;

  return <LeaveForm kind="edit" leave={leave} onSubmit={editLeave}></LeaveForm>;
};

export default EditLeave;
