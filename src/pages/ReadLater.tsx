import { useContext, useEffect, useState } from 'react';
import Pagination from '../components/Pagination/Pagination';
import { UserContext } from '../context/UserContext';
import useReadLater from '../hooks/useReadLater';
import { getUserSavedArticles } from '../lib/utility';

const limit = 10;

const ReadLater: React.FC = () => {
  const { user } = useContext(UserContext);
  const savedArticles = JSON.parse(localStorage.getItem('saved') as string) ?? [];
  const [items, setItems] = useState(getUserSavedArticles(savedArticles, user));
  const [page, setPage] = useState<number>(1);
  const [paginatedItems, setPaginatedItems] = useState<any[]>([]);
  const { removeArticle } = useReadLater();

  useEffect(() => {
    if (items) {
      const savedItems = [...items];
      setPaginatedItems(savedItems.splice((page - 1) * limit, limit)); 
    }
  }, [items, page]);

  const removeFromSaved = (slug: string) => {
    removeArticle(slug);
    const savedArticles =
      JSON.parse(localStorage.getItem('saved') as string) ?? [];
    setItems(getUserSavedArticles(savedArticles, user));
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-center mb-4">Read Later</h2>
      <div className="w-full flex flex-wrap">
        {paginatedItems.map((article: any) => (
          <div className="w-full sm:w-1/4" key={article.slug_name}>
            <div className="card lg:card-side bordered m-2">
              <div className="card-body">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-title text-base"
                >
                  {article.title}
                </a>
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
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {items.length > limit && (
          <Pagination
            page={page}
            total={Math.ceil(items.length / limit)}
            onClick={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default ReadLater;
