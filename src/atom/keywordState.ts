import { atom } from "recoil";

const keywordState = atom<string>({
  key: "keyword",
  default: "",
});

export default keywordState;
