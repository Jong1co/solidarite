import { useInfiniteQuery } from "react-query";
import { ArticleType, Article } from "../pages/Home";

type QueryFunc = {
  data: Article[];
  nextPage: number;
};

const useInfiniteState = (queryKey: string, mode: ArticleType, queryFunc: any) => {
  const articleList = useInfiniteQuery(queryKey, ({ pageParam = 0 }) => queryFunc(mode, pageParam), {
    getNextPageParam: (last) => last.nextPage,
    refetchOnWindowFocus: false,
  });
  const loadNextArticleList = () => articleList.fetchNextPage();
  const everyPageArticleList: Article[] | undefined = articleList.data?.pages.map((page) => page.data).flat();
  return [loadNextArticleList, everyPageArticleList];
};

export default useInfiniteState;
