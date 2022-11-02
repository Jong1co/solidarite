import { useInfiniteQuery } from "react-query";
import { ArticleType, Article } from "../pages/Home";
import instance from "../app/instance";

type QueryFunc = {
  data: Article[];
  nextPage: number;
};

const getArticle = async (mode: ArticleType, page: number, keyword: string) => {
  const { data } = await instance.get(`/${mode}-posts?page=${page}&search=${keyword}`);
  return { data, nextPage: page + 1 };
};

const useInfiniteState = (queryKey: string, mode: ArticleType, keyword: string) => {
  const { fetchNextPage, isFetching, data, hasNextPage } = useInfiniteQuery(queryKey, ({ pageParam = 0 }) => getArticle(mode, pageParam, keyword), {
    getNextPageParam: (lastPage) => lastPage.data.length > 0 && lastPage.nextPage,
    refetchOnWindowFocus: false,
  });

  const loadNextArticleList = () => fetchNextPage();
  const everyPageArticleList: Article[] | undefined = data?.pages.map((page) => page.data).flat();
  return [fetchNextPage, everyPageArticleList, hasNextPage];
};

export default useInfiniteState;
