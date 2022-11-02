import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Layout from "../layout/Layout";
import ArticleBlock from "../components/ArticleBlock";
import useInfiniteState from "../hooks/useInfiniteState";
import { useInView } from "react-intersection-observer";
import useThrottle from "../hooks/useThrottle";
import { Article, ArticleType } from "../typings";
import styled from "styled-components";

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
      <Main>
        <section className='search-box'>
          <input
            placeholder='검색어를 입력하세요'
            type='text'
            value={keyword}
            className='search-bar'
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </section>
        <section className='nav-box'>
          <Navbar setMode={setMode} />
        </section>
        <Line />
        <section className='article-box'>
          <ul className='article-list'>
            {page?.map((article: Article) => {
              return <ArticleBlock article={article} key={`${article.type}${article.id}`} />;
            })}
          </ul>
          {inViewTarget && <div ref={ref} />}
        </section>
      </Main>
    </Layout>
  );
};

export default Home;

const Main = styled.main`
  margin: 16px;
  .search-box > .search-bar {
    margin: 16px;
    height: 28px;
    width: 300px;
    padding: 14px;
    border: 1px solid lightgray;
    border-radius: 12px;
    transition: 0.3s all;
    font-size: 16px;
    &:hover {
      border: 1px solid #3b82f6;
    }
    &:focus {
      outline: 1px solid #3b82f6;
    }
  }

  .nav-box {
    margin: 16px;
  }

  .article-box {
    border: 1px solid lightgray;
    padding: 16px;
    margin: 16px;
    border-radius: 8px;
    box-shadow: 0 0 3px #3b82f6;
  }

  .article-box > .article-list {
    list-style: none;
    padding: 0;
  }
`;

const Line = styled.div`
  border-top: 1px solid lightgray;
  margin: 16px;
`;
