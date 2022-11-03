import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import instance from "../utils/instance";
import { Article } from "../typings";
import styled from "styled-components";
import Layout from "../layout/Layout";

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
    <Layout>
      <DetailContent>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </DetailContent>
      <DetailButton
        onClick={() => {
          navigator(-1);
        }}>
        <b>뒤로가기</b>
      </DetailButton>
    </Layout>
  );
};

export default Detail;

const DetailContent = styled.section`
  border: 1px solid lightgray;
  border-radius: 8px;
  margin: 64px 16px 16px 16px;
  padding: 24px;
  box-shadow: 0 0 3px #3b82f6;

  h1 {
    font-size: 36px;
  }
`;

const DetailButton = styled.button`
  width: 200px;
  border: none;
  border-radius: 8px;
  background-color: #3b82f6;
  color: #f5f5f5;
  margin: 8px 16px;
  padding: 16px;
  cursor: pointer;
  letter-spacing: 2px;
  transition: 0.2s all;
  &:hover {
    box-shadow: 0 0 3px #3b82f6;
    background-color: #3b83f6af;
  }
`;
