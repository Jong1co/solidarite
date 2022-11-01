import React from "react";

type ArticleType = "a" | "b";

type NavbarProps = {
  setMode: (value: ArticleType) => void;
};

const Navbar = ({ setMode }: NavbarProps) => {
  return (
    <nav>
      <button
        onClick={() => {
          setMode("a");
        }}>
        A Posts
      </button>
      <button
        onClick={() => {
          setMode("b");
        }}>
        B Posts
      </button>
    </nav>
  );
};

export default Navbar;
