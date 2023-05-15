// /articles/slug

import Card from '~/features/ui/components/Card';
import Loading from '~/features/ui/components/Loading';
import { api } from '~/utils/api';
import { type Article } from '../types';

export interface ArticleDetailsProps {
  slug: Article['slug'];
}

const ArticleDetails = ({ slug }: ArticleDetailsProps) => {
  const { data: article, isLoading } = api.article.bySlug.useQuery(slug);

  if (isLoading) return <Loading></Loading>;
  if (!article) return <div>No data found.</div>;

  return (
    <Card image={article.image} alt={article.title}>
      {article.title}
    </Card>
  );
};

export default ArticleDetails;
