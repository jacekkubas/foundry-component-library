"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import styles from "./styles.module.scss";
import Mute from "../../assets/svg/mute.svg";
import Muted from "../../assets/svg/muted.svg";
import PlayButton from "../../assets/svg/play-button.svg";
import Mask from "./Mask";

function VideoTeaser({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  const handleClick = () => {
    setPlaying(!playing);
  };

  if (!url) return;

  return (
    <div
      // eslint-disable-next-line no-extra-boolean-cast
      className={`${styles.wrapper} ${!!url ? styles.playCursor : ""} ${
        playing ? styles.playing : ""
      }`}
    >
      <Mask isAnimated={isAnimated} setIsAnimated={setIsAnimated} />
      <button className={styles.btnMute} onClick={() => setIsMuted(!isMuted)}>
        {isMuted ? <Muted /> : <Mute />}
      </button>
      <div className={styles.video} onClick={handleClick}>
        <div
          className={`${styles.playButton} ${playing ? styles.playing : ""} ${
            isAnimated ? styles.isAnimated : ""
          }`}
        >
          <PlayButton />
        </div>
        {hasWindow && (
          <ReactPlayer
            playing={playing}
            url={url}
            width="100%"
            height="100%"
            muted={isMuted}
          />
        )}
      </div>
    </div>
  );
}

export default VideoTeaser;
