import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

type SearchBlockProps = {
  keyword: string;
  setKeyword: (value: string) => void;
};

const SearchBlock = ({ keyword, setKeyword }: SearchBlockProps) => {
  const searchBar = useRef<HTMLInputElement>(null);

  return (
    <SearchBlockBox>
      <FontAwesomeIcon
        icon={faSearch}
        className='search-icon'
        onClick={() => {
          searchBar.current?.focus();
        }}
      />
      <FontAwesomeIcon
        icon={faX}
        className='search-cancel'
        onClick={() => {
          setKeyword("");
        }}
      />
      <input
        placeholder='검색어를 입력하세요'
        type='text'
        value={keyword}
        ref={searchBar}
        className='search-bar'
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
    </SearchBlockBox>
  );
};

export default SearchBlock;

const SearchBlockBox = styled.section`
  width: 300px;
  position: relative;
  &:hover {
    .search-bar {
      border: 1px solid #3b82f6;
    }
  }
  .search-icon {
    position: absolute;
    top: 36px;
    left: 32px;
    color: gray;
  }
  .search-cancel {
    position: absolute;
    top: 36px;
    right: -50px;
    color: gray;
    display: none;
  }
  .search-bar {
    margin: 16px;
    height: 28px;
    width: 300px;
    padding: 14px 14px 14px 40px;
    border: 1px solid lightgray;
    border-radius: 12px;
    transition: 0.3s all;
    font-size: 16px;
    &:focus {
      outline: 1px solid #3b82f6;
    }
  }
`;
