import { useState } from 'react';
import Button from '~/features/ui/components/Button';
import { api } from '~/utils/api';

interface ArticleDetailsProps {
  id: number;
}

const ArticleDetails = ({ id }: ArticleDetailsProps) => {
  const { data: article, isLoading } = api.article.byId.useQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (!article) return <div>No content.</div>;

  return (
    <ul>
      <li>{article.title}</li>
      <li>{article.excerpt}</li>
      <li>{article.content}</li>
    </ul>
  );
};

const IndexPage = () => {
  const utils = api.useContext();
  const list = utils.article.list;
  const [currentId, setCurrentId] = useState(-1);
  const { data: articles, isLoading } = api.article.list.useQuery();
  const { mutateAsync: addArticle } = api.article.add.useMutation({
    onSuccess() {
      list.invalidate();
    },
  });
  const { mutateAsync: updateArticle } = api.article.update.useMutation({
    onSuccess() {
      list.invalidate();
    },
  });
  const { mutateAsync: removeArticle } = api.article.remove.useMutation({
    onSuccess() {
      list.invalidate();
    },
  });

  const dateString = new Date().toISOString();

  const add = () => {
    addArticle({
      title: `My Title: ${dateString}`,
      excerpt: `My Excerpt: ${dateString}`,
      content: `My Content: ${dateString}`,
    });
  };
  const update = (id: number) => {
    updateArticle({
      id,
      data: {
        title: `Update Title: ${dateString}`,
        excerpt: `Update Excerpt: ${dateString}`,
        content: `Update Content: ${dateString}`,
      },
    });
  };
  const remove = (id: number) => {
    removeArticle(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!articles) return <div>No content.</div>;

  return (
    <div>
      <Button color="primary" onClick={add}>
        Add
      </Button>
      <br />
      <ul>
        {articles.map((article) => (
          <li key={article.id} className="flex">
            <Button onClick={() => setCurrentId(article.id)}>
              Show Details
            </Button>
            <Button onClick={() => update(article.id)}>Edit</Button>
            <Button onClick={() => remove(article.id)}>Delete</Button>
            {article.title}
          </li>
        ))}
      </ul>
      {currentId !== -1 && <ArticleDetails id={currentId}></ArticleDetails>}
    </div>
  );
};

export default IndexPage;
