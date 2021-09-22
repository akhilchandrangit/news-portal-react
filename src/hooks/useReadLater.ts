import { toast } from 'react-toastify';

const useReadLater = () => {
  const addArticle = (article: any) => {
    const savedArticles =
      JSON.parse(localStorage.getItem('saved') as string) ?? [];
    const isFound = savedArticles.find(
      (item: any) => item.slug_name === article.slug_name
    );
    if (isFound) {
      toast.success('Already added');
      return;
    }
    const articles = [...savedArticles, article];
    localStorage.setItem('saved', JSON.stringify(articles));
    toast.success('Added to read later');
  };

  const removeArticle = (slug: any) => {
    const savedArticles =
      JSON.parse(localStorage.getItem('saved') as string) ?? [];
    const articles = savedArticles.filter(
      (item: any) => slug !== item.slug_name
    );
    localStorage.setItem('saved', JSON.stringify(articles));
  };

  return {
    addArticle,
    removeArticle,
  };
};

export default useReadLater;
