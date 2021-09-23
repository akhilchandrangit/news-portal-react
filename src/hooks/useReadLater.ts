import { useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';

const useReadLater = () => {
  const { user } = useContext(UserContext);

  const addArticle = (article: any) => {
    const savedArticles =
      JSON.parse(localStorage.getItem('saved') as string) ?? [];
    const isFound = savedArticles.find(
      (item: any) =>
        item.slug_name === article.slug_name && item.email === user?.email
    );
    if (isFound) {
      toast.success('Already added');
      return;
    }
    const articles = [...savedArticles, { ...article, email: user?.email }];
    localStorage.setItem('saved', JSON.stringify(articles));
    toast.success('Added to read later');
  };

  const removeArticle = (slug: any) => {
    const savedArticles =
      JSON.parse(localStorage.getItem('saved') as string) ?? [];
    const articles = savedArticles.filter(
      (item: any) => slug !== item.slug_name && item.email !== user?.email
    );
    localStorage.setItem('saved', JSON.stringify(articles));
    toast.success('Removed from read later');
  };

  return {
    addArticle,
    removeArticle,
  };
};

export default useReadLater;
