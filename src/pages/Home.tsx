import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Layout from "../layout/Layout";
import instance from "../app/instance";
import ArticleBlock from "../components/ArticleBlock";
import { useQueries, useQuery, useInfiniteQuery } from "react-query";
import useInfiniteState from "../hooks/useInfiniteState";
import { useInView } from "react-intersection-observer";

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
  const [ref, inView] = useInView();

  const getArticle = async (mode: ArticleType, page: number) => {
    const { data } = await instance.get(`/${mode}-posts?page=${page}`);
    return { data, nextPage: page + 1 };
  };

  const [loadNextA, pageAList]: any = useInfiniteState("infiniteArticleA", "a", getArticle);
  const [loadNextB, pageBList]: any = useInfiniteState("infiniteArticleB", "b", getArticle);

  const page = mode === "a" ? pageAList : pageBList;

  if (inView) mode === "a" ? loadNextA() : loadNextB();

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
          loadNextA();
        }}>
        page up!A
      </button>
      <button
        onClick={() => {
          loadNextB();
        }}>
        page up!B
      </button>
      <Navbar setMode={setMode} />
      <main>
        {page?.map((article: Article) => {
          return <ArticleBlock article={article} key={`${article.type}${article.id}`} />;
        })}
        <div ref={ref} />
      </main>
    </Layout>
  );
};

export default Home;
