import { api } from '~/utils/api';
import { type AddLeaveInput } from '../types';
import LeaveForm from './LeaveForm';
import { useRouter } from 'next/router';
import { useAppStore } from '~/features/store';

const CreateLeave = () => {
  const setUiToast = useAppStore((state) => state.setUiToast);
  const router = useRouter();
  const utils = api.useContext();
  const list = utils.leave.list;
  const { mutate: add } = api.leave.add.useMutation({
    async onMutate(input) {
      await list.cancel();

      const prevData = list.getData();
      list.setData(undefined, (old) => {
        if (!old) return old;
        return [
          {
            ...input,
            id: +new Date(),
            status: 'PENDING',
            user: {
              id: 1,
              name: 'Admin',
              email: 'admin@babelcoder.com',
            },
          },
          ...old,
        ];
      });

      return { prevData };
    },
    onError(_err, _data, ctx) {
      list.setData(undefined, ctx?.prevData);
    },
    onSettled() {
      list.invalidate();
    },
  });
  const createLeave = (leave: AddLeaveInput) => {
    add(leave);
    setUiToast({
      type: 'Success',
      message: 'The leave has been already created.',
    });
    router.push('/leaves');
  };

  return <LeaveForm kind="create" onSubmit={createLeave}></LeaveForm>;
};

export default CreateLeave;
