import { useState } from "react";

const useThrottle = (initialState: boolean, time: number): [boolean, () => void] => {
  const [state, setState] = useState(initialState);
  function setThrottle() {
    setState(initialState);
    setTimeout(() => {
      setState(!initialState);
    }, time);
  }
  return [state, setThrottle];
};

export default useThrottle;
