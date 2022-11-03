import { memo } from "react";
import styled from "styled-components";
import { ArticleType } from "../typings";

type NavbarType = {
  mode: ArticleType;
  title: string;
};

type NavbarProps = {
  setMode: (value: ArticleType) => void;
};

const Navbar = ({ setMode }: NavbarProps) => {
  const navbarType: NavbarType[] = [
    { mode: "a", title: "A Posts" },
    { mode: "b", title: "B Posts" },
  ];

  return (
    <NavBox>
      <nav>
        {navbarType.map(({ mode, title }) => {
          return (
            <button
              key={title}
              onClick={() => {
                setMode(mode);
              }}>
              {title}
            </button>
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

const Line = styled.div`
  border-top: 1px solid lightgray;
  margin: 16px;
`;
