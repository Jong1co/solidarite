import { memo } from "react";
import styled from "styled-components";
import { ArticleType } from "../typings";

type NavbarType = {
  type: ArticleType;
  title: string;
};

type NavbarProps = {
  mode: ArticleType;
  setMode: (value: ArticleType) => void;
};

const Navbar = ({ mode, setMode }: NavbarProps) => {
  const navbarType: NavbarType[] = [
    { type: "a", title: "A Posts" },
    { type: "b", title: "B Posts" },
  ];

  return (
    <NavBox>
      <nav>
        {navbarType.map(({ type, title }) => {
          return (
            <NavButton
              key={title}
              className='nav-button'
              onClick={() => {
                setMode(type);
              }}>
              <b className={`${mode === type ? "selected" : ""}`}>{title}</b>
            </NavButton>
          );
        })}
        <Line />
      </nav>
    </NavBox>
  );
};

export default memo(Navbar);

const NavBox = styled.section`
  margin: 16px;
`;

const NavButton = styled.button`
  background-color: transparent;
  border: none;
  height: 40px;
  width: 80px;
  transition: 0.3s all;
  .selected {
    color: #3b82f6;
  }
  &:hover {
    background-color: #ebebeb;
    border-radius: 8px 8px 0 0;
    color: #3b82f6;
  }
`;

const Line = styled.div`
  border-top: 1px solid lightgray;
  margin: 0 0 16px 0;
`;
