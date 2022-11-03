import { useInfiniteQuery } from "react-query";
import { ArticleType, Article } from "../typings";
import instance from "../utils/instance";
import useDebounce from "./useDebounce";

type QueryFunc = {
  data: Article[];
  nextPage: number;
};

const useInfiniteState = (queryKey: string, mode: ArticleType, keyword: string): [() => void, Article[] | undefined, boolean | undefined] => {
  /** 150ms 지연되어 나온 keyword */
  const debouncedKeyword = useDebounce(keyword, 150);

  const getArticle = async (mode: ArticleType, page: number, keyword: string): Promise<QueryFunc> => {
    const { data } = await instance.get(`/${mode}-posts?page=${page}&search=${keyword}`);
    return { data, nextPage: page + 1 };
  };

  const { fetchNextPage, data, hasNextPage } = useInfiniteQuery([queryKey, debouncedKeyword], ({ pageParam = 0 }) => getArticle(mode, pageParam, keyword), {
    getNextPageParam: (lastPage) => lastPage.data.length > 0 && lastPage.nextPage,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  const everyPageArticleList: Article[] | undefined = data?.pages.map((page) => page.data).flat();
  return [fetchNextPage, everyPageArticleList, hasNextPage];
};

export default useInfiniteState;
