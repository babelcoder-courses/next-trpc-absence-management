import Badge from '~/features/ui/components/Badge';
import { type Leave } from '../types';
import { toDateString } from '~/features/shared/helpers/date';

export type LeaveItemProps = Leave;

const statusColor = (status: Leave['status']) => {
  switch (status) {
    case 'PENDING':
      return 'info';
    case 'APPROVED':
      return 'success';
    case 'REJECTED':
      return 'danger';
  }
};

const LeaveItem = ({ reason, status, leaveDate }: LeaveItemProps) => {
  return (
    <div>
      <Badge color={statusColor(status)}>{status}</Badge>
      <p>{reason}</p>
      <div>{toDateString(leaveDate)}</div>
    </div>
  );
};

export default LeaveItem;
