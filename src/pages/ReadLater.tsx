import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import useReadLater from '../hooks/useReadLater';
import { getUserSavedArticles } from '../lib/utility';

const ReadLater: React.FC = () => {
  const { user } = useContext(UserContext);
  const savedArticles =
    JSON.parse(localStorage.getItem('saved') as string) ?? [];
  const [items, setItems] = useState(getUserSavedArticles(savedArticles, user));
  const { removeArticle } = useReadLater();

  const removeFromSaved = (slug: string) => {
    removeArticle(slug);
    const savedArticles =
      JSON.parse(localStorage.getItem('saved') as string) ?? [];
    setItems(getUserSavedArticles(savedArticles, user));
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-center mb-4">Read Later</h2>
      <div className="w-full">
        {items.map((article: any) => (
          <div className="card lg:card-side bordered mb-4" key={article.slug_name}>
            <div className="card-body">
              <h2 className="card-title text-base">{article.title}</h2>
              <p className="text-sm">{article.abstract}</p>
              <div className="card-actions">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => removeFromSaved(article.slug_name)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadLater;
