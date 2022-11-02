export type Article = {
  id: string;
  title: string;
  content: string;
  type: ArticleType;
  createdAt: string;
};

export type ArticleType = "a" | "b";
