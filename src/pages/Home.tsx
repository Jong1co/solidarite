import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Layout from "../layout/Layout";
import instance from "../app/instance";
import ArticleBlock from "../components/ArticleBlock";

type ArticleType = "a" | "b";

type Article = {
  id: string; // 게시물 ID
  title: string; // 게시물 제목
  content: string; // 게시물 내용
  type: ArticleType; // a or b
  createdAt: string; // 게시물 생성일 (의미없음)
};

const Home = () => {
  const [mode, setMode] = useState<ArticleType>("a");
  const [keyword, setKeyword] = useState("");
  const [articleList, setArticleList] = useState<Article[]>([]);

  useEffect(() => {
    getArticle(0);
  }, []);

  const getArticle = async (page: number) => {
    const { data } = await instance.get(`/${mode}-posts?page=${page}`);
    setArticleList(data);
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
      <Navbar setMode={setMode} />
      <main>
        {articleList.map((article) => {
          return <ArticleBlock article={article} key={`${article.type}${article.id}`} />;
        })}
      </main>
    </Layout>
  );
};

export default Home;
