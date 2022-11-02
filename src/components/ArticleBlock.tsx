import { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Article } from "../typings";

type ArticleBlockProps = {
  article: Article;
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

export default memo(ArticleBlock);

const Block = styled.li`
  border-radius: 8px;
  padding: 24px 16px 16px 16px;
  transition: 0.2s all;
  &:hover {
    background-color: #f1f1f1;
  }
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
