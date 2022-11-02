import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Layout from "../layout/Layout";
import instance from "../app/instance";
import ArticleBlock from "../components/ArticleBlock";
import { useQueries, useQuery, useInfiniteQuery, useQueryClient } from "react-query";
import useInfiniteState from "../hooks/useInfiniteState";
import { useInView } from "react-intersection-observer";
import useThrottle from "../hooks/useThrottle";

export type Article = {
  id: string; // 게시물 ID
  title: string; // 게시물 제목
  content: string; // 게시물 내용
  type: ArticleType; // a or b
  createdAt: string; // 게시물 생성일 (의미없음)
};

export type ArticleType = "a" | "b";

const Home = () => {
  const [mode, setMode] = useState<ArticleType>(sessionStorage.mode || "a");

  const [keyword, setKeyword] = useState("");
  const [ref, inView] = useInView();
  const [throttle, setThrottle] = useThrottle(false, 50);

  useEffect(() => {
    setThrottle();
  }, []);

  // const queryClient = useQueryClient();

  // useEffect(() => {
  // queryClient.invalidateQueries();
  // }, [keyword]);

  /**
   * 데이터를 두 번씩 요청하는 현상
   * 첫 화면 렌더링 시 0번 페이지 뿐만 아니라 1번까지 요청하는 현상
   * => 요청 후 딜레이 필요 => 쓰로틀링으로 하면 될듯
   */
  const [loadNextA, pageAList, hasNextPageA]: any = useInfiniteState("infiniteArticleA", "a", keyword);
  const [loadNextB, pageBList, hasNextPageB]: any = useInfiniteState("infiniteArticleB", "b", keyword);

  const page = mode === "a" ? pageAList : pageBList;

  if (inView && throttle) {
    if (mode === "a" && hasNextPageA) {
      loadNextA();
      setThrottle();
    } else if (mode === "b" && hasNextPageB) {
      loadNextB();
      setThrottle();
    }
  }

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
        <div ref={ref} />
      </main>
    </Layout>
  );
};

export default Home;
