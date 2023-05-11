import { api } from '~/utils/api';

const IndexPage = () => {
  const { data: articles, isLoading } = api.article.list.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!articles) return <div>No content.</div>;

  return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
