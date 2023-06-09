import React, { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const VideoList = (props) => {
  const [videos, setVideos] = useState(null);
  const { category } = useParams();
  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideos(category, props.id);
      setVideos(
        res.data?.results.length > 5
          ? res.data?.results?.slice(0, 5)
          : res.data?.results
      );
    };
    getVideos();
  }, [category, props.id]);

  return (
    <>
      {videos?.map((video, i) => (
        <Video key={i} item={video} />
      ))}
    </>
  );
};

const Video = (props) => {
  const { item } = props;
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default VideoList;
