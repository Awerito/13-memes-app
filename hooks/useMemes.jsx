import { useState, useEffect } from "react";
import { getMemes } from "../services/memes";

const useMemes = () => {
  const [memes, setMemes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMemes = (page) => {
    if (!hasMore) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getMemes(page, 10)
      .then(([data, error]) => {
        if (error) {
          console.error(error);
          setLoading(false);
          return;
        }

        if (data.length < 10) {
          setHasMore(false);
        }

        if (data.length) {
          setMemes((prevMemes) => [...prevMemes, ...data]);
        }
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
