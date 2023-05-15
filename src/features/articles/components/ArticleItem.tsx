import Link from 'next/link';
import { type ArticleItem } from '../types';

export type ArticleItemProps = ArticleItem;

const ArticleItem = ({ slug, title }: ArticleItemProps) => {
  return <Link href={`/articles/${slug}`}>{title}</Link>;
};

export default ArticleItem;
