// /articles/slug

import { useRouter } from 'next/router';
import Card from '~/features/ui/components/Card';
import Loading from '~/features/ui/components/Loading';
import { api } from '~/utils/api';

const ArticleDetails = () => {
  const router = useRouter();
  const { data: article, isLoading } = api.article.bySlug.useQuery(
    router.query.slug as string,
  );

  if (isLoading) return <Loading></Loading>;
  if (!article) return <div>No data found.</div>;

  return (
    <Card image={article.image} alt={article.title}>
      {article.title}
    </Card>
  );
};

export default ArticleDetails;
