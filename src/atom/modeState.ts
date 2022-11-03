import { atom } from "recoil";
import { ArticleType } from "../typings";

const modeState = atom<ArticleType>({
  key: "mode",
  default: "a",
});

export default modeState;
