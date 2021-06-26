

import { useLayoutEffect, useState } from "react";
import { debounce } from "resources/utils/snippets";

function useResizeEvent() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', debounce(updateSize, 25));
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size
}

export default useResizeEvent
