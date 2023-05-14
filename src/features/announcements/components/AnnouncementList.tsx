import Loading from '~/features/ui/components/Loading';
import { api } from '~/utils/api';
import AnnouncementItem from './AnnouncementItem';

const AnnouncementList = () => {
  const { data: announcements, isLoading } = api.announcement.list.useQuery();

  if (isLoading) return <Loading></Loading>;
  if (!announcements) return <div>Not found.</div>;

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {announcements.map((announcement) => (
        <AnnouncementItem
          key={announcement.id}
          {...announcement}
        ></AnnouncementItem>
      ))}
    </div>
  );
};

export default AnnouncementList;
