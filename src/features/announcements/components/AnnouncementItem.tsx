import Link from 'next/link';
import { type AnnouncementItem } from '../types';

export type AnnouncementItemProps = AnnouncementItem;

const AnnouncementItem = ({ slug, title }: AnnouncementItemProps) => {
  return <Link href={`/announcements/${slug}`}>{title}</Link>;
};

export default AnnouncementItem;
