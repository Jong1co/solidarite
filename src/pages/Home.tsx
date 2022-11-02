import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Layout from "../layout/Layout";
import instance from "../app/instance";
import ArticleBlock from "../components/ArticleBlock";
import { useQueries, useQuery, useInfiniteQuery } from "react-query";

export type Article = {
  id: string; // 게시물 ID
  title: string; // 게시물 제목
  content: string; // 게시물 내용
  type: ArticleType; // a or b
  createdAt: string; // 게시물 생성일 (의미없음)
};

export type ArticleType = "a" | "b";

const Home = () => {
  const [mode, setMode] = useState<ArticleType>("a");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState({ a: 0, b: 0 });

  const getArticle = async (mode: ArticleType, page: number) => {
    const { data } = await instance.get(`/${mode}-posts?page=${page}`);
    return { data, nextPage: page + 1 };
  };

  const resultA = useInfiniteQuery("infiniteArticleA", ({ pageParam = 0 }) => getArticle("a", pageParam), {
    getNextPageParam: (last) => last.nextPage,
    refetchOnWindowFocus: false,
  });

  const resultB = useInfiniteQuery("infiniteArticleB", ({ pageParam = 0 }) => getArticle("b", pageParam), {
    getNextPageParam: (last) => last.nextPage,
    refetchOnWindowFocus: false,
  });

  console.log(resultA.data?.pages.map((page) => page.data).flat());

  return (
    <Layout>
      <input
        type='text'
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          resultA.fetchNextPage();
        }}>
        page up!A
      </button>
      <button
        onClick={() => {
          resultB.fetchNextPage();
        }}>
        page up!B
      </button>
      <Navbar setMode={setMode} />
      <main>
        {/* {data?.map((article) => {
          return <ArticleBlock article={article} key={`${article.type}${article.id}`} />;
        })} */}
      </main>
    </Layout>
  );
};

export default Home;
