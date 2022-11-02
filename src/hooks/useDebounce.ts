import { useState, useEffect } from "react";

const useDebounce = (keyword: string, time: number) => {
  const [state, setState] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(keyword);
    }, time);

    return () => {
      clearInterval(timer);
    };
  }, [keyword]);
  return state;
};

export default useDebounce;
