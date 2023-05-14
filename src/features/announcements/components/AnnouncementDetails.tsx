import Card from '~/features/ui/components/Card';
import Loading from '~/features/ui/components/Loading';
import { api } from '~/utils/api';
import { type Announcement } from '../types';

export interface AnnouncementDetailsProps {
  slug: Announcement['slug'];
}

const AnnouncementDetails = ({ slug }: AnnouncementDetailsProps) => {
  const { data: announcement, isLoading } =
    api.announcement.bySlug.useQuery(slug);

  if (isLoading) return <Loading></Loading>;
  if (!announcement) return <div>No data found.</div>;

  return <Card>{announcement.title}</Card>;
};

export default AnnouncementDetails;
