import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Layout from "../layout/Layout";
import ArticleBlock from "../components/ArticleBlock";
import useInfiniteState from "../hooks/useInfiniteState";
import { useInView } from "react-intersection-observer";
import useThrottle from "../hooks/useThrottle";
import { Article, ArticleType } from "../typings";

const Home = () => {
  const [mode, setMode] = useState<ArticleType>(sessionStorage.mode || "a");

  const [keyword, setKeyword] = useState("");
  const [ref, inView] = useInView();
  const [throttle, setThrottle] = useThrottle(false, 50);

  const [loadNextA, pageAList, hasNextPageA]: any = useInfiniteState("infiniteArticleA", "a", keyword);
  const [loadNextB, pageBList, hasNextPageB]: any = useInfiniteState("infiniteArticleB", "b", keyword);

  const page = mode === "a" ? pageAList : pageBList;
  const inViewTarget = mode === "a" ? hasNextPageA : hasNextPageB;

  if (inView && throttle) {
    mode === "a" ? hasNextPageA && loadNextA() : hasNextPageB && loadNextB();
    setThrottle();
  }

  useEffect(() => {
    setThrottle();
  }, []);

  /** 어떻게 스토리지에 저장 안 하고 b post에 남아있을까? query때문인가 */
  useEffect(() => {
    sessionStorage.setItem("mode", mode);
  }, [mode]);

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
        {inViewTarget && <div ref={ref} />}
      </main>
    </Layout>
  );
};

export default Home;
