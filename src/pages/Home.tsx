import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Layout from "../layout/Layout";
import instance from "../app/instance";
import ArticleBlock from "../components/ArticleBlock";
import { useQueries, useQuery, useInfiniteQuery, useQueryClient } from "react-query";
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

  // const queryClient = useQueryClient();

  // useEffect(() => {
  //   queryClient.invalidateQueries();
  // }, [keyword]);

  const [loadNextA, pageAList, hasNextPageA]: any = useInfiniteState("infiniteArticleA", "a", keyword);
  const [loadNextB, pageBList, hasNextPageB]: any = useInfiniteState("infiniteArticleB", "b", keyword);

  const page = mode === "a" ? pageAList : pageBList;

  if (inView) {
    if (mode === "a" && hasNextPageA) {
      loadNextA();
    } else if (mode === "b" && hasNextPageB) {
      loadNextB();
    }
  }

  return (
    <Layout>
      <input
        type='text'
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
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
