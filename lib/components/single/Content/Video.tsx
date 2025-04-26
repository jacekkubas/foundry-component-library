"use client";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import styles from "./styles.module.scss";
import { useOnScreen } from "../../../hooks/useOnScreen";
import { type Video } from "../../../types";

function Video({ section }: { section: Video }) {
  const sectionRef = useRef(null);
  const onScreen = useOnScreen(sectionRef, "1000px");
  const [playing, setPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);

  const handleClick = () => {
    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

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

  useEffect(() => {
    if (section?.autoplay) {
      setPlaying(true);
    }
  }, [videoLoaded]);

  if (!section || !section.video) return null;

  return (
    <div className={styles.wrapper} ref={sectionRef}>
      <div
        className={`${styles.video} ${playing ? styles.playing : ""}`}
        onClick={handleClick}
        data-ratio={section.ratio}
        style={{
          backgroundImage: section.poster
            ? `url(${section.poster.sourceUrl})`
            : "none",
          paddingTop: section.ratio ? section.ratio : "56.25%",
        }}
      >
        <div>
          {hasWindow && (
            <ReactPlayer
              className={styles.player}
              playing={playing}
              url={videoLoaded ? `${section.video}?dnt=1` : ""}
              playsinline
              width="100%"
              height="100%"
              onEnded={() => {
                setPlaying(false);
              }}
              loop={section.autoplay}
              muted={!!section.autoplay}
              controls={!section.autoplay}
            />
          )}
          {section.autoplay && (
            <div
              className={`${styles.overlay} ${playing ? styles.playing : ""}`}
              onClick={handleClick}
            />
          )}
        </div>
      </div>
      {section.caption && (
        <div className={styles.caption}>{section.caption}</div>
      )}
    </div>
  );
}

export default Video;
