import React from "react";
import { Article } from "../typings";
import ArticleBlock from "./ArticleBlock";
import styled from "styled-components";

type ArticleBoxProps = {
  view: any;
  page: Article[] | undefined;
  inViewTarget: boolean | undefined;
};

const ArticleBox = ({ view, page, inViewTarget }: ArticleBoxProps) => {
  return (
    <ArticleBlockBox>
      <ul className='article-list'>
        {page?.map((article: Article) => {
          return <ArticleBlock article={article} key={`${article.type}${article.id}`} />;
        })}
      </ul>
      {inViewTarget && <div ref={view} />}
    </ArticleBlockBox>
  );
};

export default ArticleBox;

const ArticleBlockBox = styled.section`
  border: 1px solid lightgray;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 0 3px #3b82f6;
  .article-list {
    list-style: none;
    padding: 0;
  }
`;
