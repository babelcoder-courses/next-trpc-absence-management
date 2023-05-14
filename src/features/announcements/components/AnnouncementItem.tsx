import Link from 'next/link';
import { type Announcement } from '../types';

export type AnnouncementItemProps = Announcement;

const AnnouncementItem = ({ slug, title }: AnnouncementItemProps) => {
  return <Link href={`/announcements/${slug}`}>{title}</Link>;
};

export default AnnouncementItem;
