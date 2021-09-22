import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

export const getSections = async (): Promise<any> => {
  const data = axios.get(
    `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${apiKey}`
  );

  return data;
};

export const getArticles = async (
  page: number,
  limit: number,
  section?: string,
): Promise<any> => {
  const data = axios.get(
    `https://api.nytimes.com/svc/news/v3/content/all/${section ?? 'all'}.json?api-key=${apiKey}&page=${page}&limit=${limit}`
  );

  return data;
};

export const getArticlesBySection = async (
  page: number,
  limit: number,
  section: string,
): Promise<any> => {
  const data = axios.get(
    `https://api.nytimes.com/svc/news/v3/content/all/${section}.json?api-key=${apiKey}&page=${page}&limit=${limit}`
  );

  return data;
};
