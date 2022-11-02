import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import instance from "../utils/instance";
import { Article } from "../typings";

const Detail = () => {
  const [searchParams] = useSearchParams();
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
