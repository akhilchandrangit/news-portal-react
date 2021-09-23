import { User } from '../types';

export const getPaginationItems = (page: number, limit: number): number[] => {
  const start = Math.floor((page - 1) / limit) * limit;
  return new Array(limit).fill(0).map((_, index) => start + index + 1);
};

export const getUserSavedArticles = (articles: any[], user: User | null): any[] =>
  articles.filter((article: any) => article.email === user?.email);
