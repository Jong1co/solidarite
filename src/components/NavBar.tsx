import { memo } from "react";
import { ArticleType } from "../typings";

type NavbarType = {
  mode: ArticleType;
  title: string;
};

type NavbarProps = {
  setMode: (value: ArticleType) => void;
};

const Navbar = ({ setMode }: NavbarProps) => {
  console.log("nav");

  const navbarType: NavbarType[] = [
    { mode: "a", title: "A Posts" },
    { mode: "b", title: "B Posts" },
  ];

  return (
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
    </nav>
  );
};

export default memo(Navbar);
