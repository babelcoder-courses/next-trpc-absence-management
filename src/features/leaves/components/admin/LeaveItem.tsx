import { LeaveStatus } from '@prisma/client';
import Image from 'next/image';
import ProtectedResource from '~/features/auth/guards/ProtectedResource';
import { getImagePath } from '~/features/shared/helpers/upload';
import Button from '~/features/ui/components/Button';
import { api } from '~/utils/api';

export interface LeaveItemProps {
  id: number | string;
}

export function LeaveItem({ id }: LeaveItemProps) {
  const utils = api.useContext();
  const list = utils.admin.leave.list;
  const { data: leave, isLoading } = api.admin.leave.byId.useQuery(+id);
  const { mutateAsync: approve } = api.admin.leave.approve.useMutation({
    onSettled() {
      void list.invalidate();
    },
  });
  const { mutateAsync: reject } = api.admin.leave.reject.useMutation({
    onSettled() {
      void list.invalidate();
    },
  });
  const avatarImage = '/assets/images/avatar.png';

  if (isLoading) return <div>Loading...</div>;
  if (!leave) return <div>No content</div>;

  const { leaveDate, reason, status, user } = leave;

  return (
    <div>
      <figure
        key={id}
        className="flex flex-col items-center bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800"
      >
        <Image
          className="rounded-full"
          src={user.image ? getImagePath(user.image) : avatarImage}
          alt="profile"
          width={100}
          height={100}
        ></Image>
        <span className="my-2 text-gray-900">{user.name}</span>
        <blockquote className="mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400 lg:mb-4">
          <h3 className="text-lg font-semibold  text-primary-500 dark:text-white">
            {new Date(leaveDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </h3>
          <p className="my-4 font-light">{reason}</p>
        </blockquote>
        {status === LeaveStatus.PENDING && (
          <ProtectedResource roles={['ADMIN']}>
            <div className="flex space-x-2">
              <Button color="success" onClick={() => approve(+id)}>
                Accept
              </Button>
              <Button color="danger" onClick={() => reject(+id)}>
                Reject
              </Button>
            </div>
          </ProtectedResource>
        )}
      </figure>
    </div>
  );
}

export default LeaveItem;
