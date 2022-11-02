import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Layout from "../layout/Layout";
import instance from "../app/instance";
import ArticleBlock from "../components/ArticleBlock";
import { useRecoilState } from "recoil";
import { recoilArticleState, ArticleType } from "../app/states/recoilArticleState";

const Home = () => {
  const [mode, setMode] = useState<ArticleType>("a");
  const [keyword, setKeyword] = useState("");
  const [recoilState, setRecoilState] = useRecoilState(recoilArticleState);
  const page = mode === "a" ? recoilState.a.page : recoilState.b.page;

  useEffect(() => {
    if (recoilState[mode].articleList.length === 0) getArticle(0);
  }, [mode]);

  useEffect(() => {
    getArticle(page);
  }, [recoilState.a.page, recoilState.b.page]);

  const getArticle = async (page: number) => {
    const { data } = await instance.get(`/${mode}-posts?page=${page}`);
    setRecoilState((prev) => ({ ...prev, [mode]: { ...recoilState[mode], articleList: [...recoilState[mode].articleList, ...data] } }));
  };

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
          setRecoilState((prev) => ({ ...prev, [mode]: { ...recoilState[mode], page: recoilState[mode].page + 1 } }));
        }}>
        page up!
      </button>
      <Navbar setMode={setMode} />
      <main>
        {recoilState[mode].articleList.map((article) => {
          return <ArticleBlock article={article} key={`${article.type}${article.id}`} />;
        })}
      </main>
    </Layout>
  );
};

export default Home;
