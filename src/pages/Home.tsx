import { useEffect } from "react";
import Layout from "../layout/Layout";
import Navbar from "../components/NavBar";
import SearchBlock from "../components/SearchBlock";
import useInfiniteState from "../hooks/useInfiniteState";
import { useInView } from "react-intersection-observer";
import useThrottle from "../hooks/useThrottle";
import { useRecoilState } from "recoil";
import modeState from "../atom/modeState";
import keywordState from "../atom/keywordState";
import ArticleBox from "../components/ArticleBox";

const Home = () => {
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const [mode, setMode] = useRecoilState(modeState);

  const [ref, inView] = useInView();
  const [throttle, setThrottle] = useThrottle(false, 50);

  const [loadNextA, pageAList, hasNextPageA] = useInfiniteState("infiniteArticleA", "a", keyword);
  const [loadNextB, pageBList, hasNextPageB] = useInfiniteState("infiniteArticleB", "b", keyword);
  const page = mode === "a" ? pageAList : pageBList;
  const inViewTarget = mode === "a" ? hasNextPageA : hasNextPageB;

  useEffect(() => {
    setThrottle();
  }, []);

  useEffect(() => {
    if (inView && throttle) {
      mode === "a" ? hasNextPageA && loadNextA() : hasNextPageB && loadNextB();
      setThrottle();
    }
  }, [inView]);

  return (
    <Layout>
      <SearchBlock keyword={keyword} setKeyword={setKeyword} />
      <Navbar mode={mode} setMode={setMode} />
      <ArticleBox view={ref} page={page} inViewTarget={inViewTarget} />
    </Layout>
  );
};

export default Home;
