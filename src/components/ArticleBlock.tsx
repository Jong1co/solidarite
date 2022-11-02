import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type ArticleBlockProps = {
  article: {
    id: string; // 게시물 ID
    title: string; // 게시물 제목
    content: string; // 게시물 내용
    type: "a" | "b"; // a or b
    createdAt: string; // 게시물 생성일 (의미없음)}
  };
};

const ArticleBlock = ({ article }: ArticleBlockProps) => {
  return (
    <StyledLink to={`/${article.type}?id=${article.id}`}>
      <Block>
        <b>
          <span className='article-id'>{article.id}. </span>
          {article.title}
        </b>
        <p className='article-content'>{article.content}</p>
      </Block>
    </StyledLink>
  );
};

export default ArticleBlock;

const Block = styled.section`
  .article-id {
    color: #3b82f6;
  }
  .article-content {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
