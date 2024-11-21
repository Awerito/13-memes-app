import { useState, useEffect } from "react";
import { getMemes } from "../services/memes";

const useMemes = () => {
  const [memes, setMemes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMemes = (page) => {
    setLoading(true);
    getMemes(page, 10)
      .then(([data, error]) => {
        if (error) {
          console.error(error);
          return;
        }

        setHasMore(!!data);
        if (!!data) setMemes((prevMemes) => [...prevMemes, ...data]);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMemes(page);
  }, [page]);

  const loadMoreMemes = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { memes, isLoading, loadMoreMemes };
};

export default useMemes;
