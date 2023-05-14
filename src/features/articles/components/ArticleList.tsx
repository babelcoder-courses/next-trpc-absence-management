import Loading from '~/features/ui/components/Loading';
import { api } from '~/utils/api';
import ArticleItem from './ArticleItem';

const ArticleList = () => {
  const { data: articles, isLoading } = api.article.list.useQuery();

  if (isLoading) return <Loading></Loading>;
  if (!articles) return <div>Not found.</div>;

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {articles.map((article) => (
        <ArticleItem key={article.id} {...article}></ArticleItem>
      ))}
    </div>
  );
};

export default ArticleList;
