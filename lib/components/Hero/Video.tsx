"use client";
import { useState, useRef, useEffect } from "react";
import { useOnScreen } from "../../hooks/useOnScreen";
import ReactPlayer from "react-player/lazy";
import styles from "./styles.module.scss";

const Video = ({ url }: { url: string }) => {
  const sectionRef = useRef(null);
  const onScreen = useOnScreen(sectionRef, "1000px");
  // const [playing, setPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  useEffect(() => {
    if (!videoLoaded && onScreen) {
      setVideoLoaded(true);
    }
  }, [videoLoaded, onScreen]);

  return (
    <div className={styles.videoWrapper} ref={sectionRef}>
      {hasWindow && (
        <ReactPlayer
          playing
          url={url}
          width="100%"
          height="100%"
          loop
          muted
          playsinline
        />
      )}
    </div>
  );
};

export default Video;
