import { atom } from "recoil";

type Page = {
  a: PageDetail;
  b: PageDetail;
};

type PageDetail = {
  page: number;
  articleList: Article[];
};

export type Article = {
  id: string; // 게시물 ID
  title: string; // 게시물 제목
  content: string; // 게시물 내용
  type: ArticleType; // a or b
  createdAt: string; // 게시물 생성일 (의미없음)
};

export type ArticleType = "a" | "b";

const initialState: Page = {
  a: { page: 0, articleList: [] },
  b: { page: 0, articleList: [] },
};

export const recoilArticleState = atom<Page>({
  key: "recoilArticleState",
  default: initialState,
});
