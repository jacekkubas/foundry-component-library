"use client";
import { useState, useRef, useEffect } from "react";
import { useOnScreen } from "../../../hooks/useOnScreen";
import ReactPlayer from "react-player/lazy";
import styles from "./styles.module.scss";
import { NextImage } from "../../../types";

const Video = ({
  url,
  alt,
  Image,
}: {
  url: string;
  alt?: string;
  Image: NextImage;
}) => {
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

  // useEffect(() => {
  //   setPlaying(true);
  // }, [videoLoaded]);

  const extension = url.split(".").pop();

  if (extension === "gif") {
    return (
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={url}
          alt={alt || ""}
          width={720}
          height={490}
        />
      </div>
    );
  }

  return (
    <div className={styles.imageWrapper} ref={sectionRef}>
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
