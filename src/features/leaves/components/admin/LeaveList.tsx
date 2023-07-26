import DataGrid, {
  type DataGridColumn,
} from '~/features/ui/components/DataGrid';
import { api } from '~/utils/api';
import { type AdminLeaveItem } from '~/features/leaves/types';
import LeaveDetails from './LeaveItem';
import { toDateString } from '~/features/shared/helpers/date';

export function LeaveList() {
  const { data, isLoading } = api.admin.leave.list.useQuery();
  const columns: DataGridColumn<AdminLeaveItem>[] = [
    {
      field: 'leaveDate',
      headerName: 'Leave Date',
      value: (leave) => toDateString(leave.leaveDate),
    },
    {
      field: 'status',
      headerName: 'Status',
    },
    {
      field: 'user',
      headerName: 'User',
      value: (leave) => leave.user.name,
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <DataGrid
      title="All Leave Requests"
      columns={columns}
      rows={data}
      detailsComponent={LeaveDetails}
    ></DataGrid>
  );
}

export default LeaveList;
