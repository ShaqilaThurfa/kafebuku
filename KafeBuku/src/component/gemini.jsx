import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNovels, generateStoryWithAI } from "./novelSlice";

function NovelList() {
  const dispatch = useDispatch();
  const novels = useSelector((state) => state.novel.items);
  const loading = useSelector((state) => state.novel.loading);
  const generatedStory = useSelector((state) => state.novel.generatedStory);

  useEffect(() => {
    dispatch(fetchNovels());
  }, [dispatch]);

  const handleGenerateStory = (novelId) => {
    dispatch(generateStoryWithAI(novelId));
  };

  return (
    <div>
      <h1>Popular Novels</h1>
      {loading ? (
        <p>Loading novels...</p>
      ) : (
        novels.map((novel) => (
          <div key={novel.rank}>
            <h2>{novel.title}</h2>
            <p>{novel.description}</p>
            <button onClick={() => handleGenerateStory(novel.rank)}>
              Generate Story
            </button>
          </div>
        ))
      )}
      {generatedStory && (
        <div>
          <h2>Generated Story</h2>
          <p>{generatedStory}</p>
        </div>
      )}
    </div>
  );
}

export default NovelList;

