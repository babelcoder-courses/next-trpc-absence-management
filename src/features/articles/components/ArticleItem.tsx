import Link from 'next/link';
import { type Article } from '../types';

export type ArticleItemProps = Article;

const ArticleItem = ({ slug, title }: ArticleItemProps) => {
  return <Link href={`/articles/${slug}`}>{title}</Link>;
};

export default ArticleItem;
