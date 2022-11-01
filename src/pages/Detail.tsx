import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import instance from "../app/instance";
import { Article } from "../app/states/recoilArticleState";

const Detail = () => {
  const [searchParams, _] = useSearchParams();
  const { mode } = useParams();
  const id = searchParams.get("id");
  const [article, setArticle] = useState({} as Article);
  const navigator = useNavigate();

  useEffect(() => {
    getDetailArticle();
  }, []);

  const getDetailArticle = async () => {
    const { data } = await instance.get(`/${mode}-posts/${id}`);
    setArticle(data);
  };

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <button
        onClick={() => {
          navigator(-1);
        }}>
        뒤로가기
      </button>
    </div>
  );
};

export default Detail;
