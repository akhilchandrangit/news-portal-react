import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import Pagination from '../components/Pagination/Pagination';
import Sections from '../components/Sections/Sections';
import useReadLater from '../hooks/useReadLater';
import { getArticles } from '../services/NewsService';

const Feeds: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [section, setSection] = useState<string | null>(null);
  const [articles, setArticles] = useState([]);
  const { addArticle } = useReadLater();
  const { isLoading, data, isError } = useQuery(
    ['articles', page, limit, section],
    () => getArticles(page, limit, section as string)
  );

  useEffect(() => {
    if (data?.data?.results) {
      setArticles(data.data.results);
      setTotal(data.data.num_results);
    }
  }, [data]);

  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-1/5">
        <Sections
          onClick={(section) => {
            setSection(section);
            setPage(1);
          }}
        />
      </div>
      <div className="w-full sm:w-4/5">
        {isLoading ? (
          <SkeletonTheme color="rgb(42, 46, 55)" highlightColor="#25282e">
            <Skeleton
              count={3}
              width={320}
              height={320}
              className="ml-2 rounded-box"
            />
          </SkeletonTheme>
        ) : (
          <>
            <div className="flex flex-wrap">
              {articles.map((article: any) => (
                <div className=" w-full sm:w-1/3" key={article.slug_name}>
                  <div className="card bordered m-3">
                    <figure className="relative">
                      <img
                        src={article.thumbnail_standard}
                        style={{ height: '200px' }}
                      />
                    </figure>
                    <div className="card-body">
                      <a
                        className="card-title text-base"
                        href={article.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {article.title}
                        <div className="badge mx-2 badge-secondary">
                          {article.section}
                        </div>
                      </a>
                      <p className="text-sm">{article.abstract}</p>
                      <button
                        className="btn btn-xs btn-outline btn-accent mt-3"
                        style={{ width: '100px' }}
                        onClick={() => addArticle(article)}
                      >
                        read later
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Pagination
                page={page}
                total={limit}
                onClick={setPage}
                onPrevious={() => setPage(page > 0 ? page - 1 : 0)}
                onNext={() => setPage(page + 1)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Feeds;
