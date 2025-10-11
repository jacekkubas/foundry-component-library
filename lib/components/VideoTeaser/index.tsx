"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import styles from "./styles.module.scss";
import Mute from "../../assets/svg/mute.svg";
import Muted from "../../assets/svg/muted.svg";
import PlayButton from "../../assets/svg/play-button.svg";
import Logo from "../../assets/svg/footer-logo.svg";

function VideoTeaser({ url }: { url: string }) {
  const [playing, setPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasWindow, setHasWindow] = useState(false);

  const handleClick = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  if (!url) return;

  return (
    <>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <div
        className={`${styles.wrapper} ${url ? styles.playCursor : ""} ${
          playing ? styles.playing : ""
        }`}>
        <button className={styles.btnMute} onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <Muted /> : <Mute />}
        </button>
        <div className={styles.video} onClick={handleClick}>
          <div
            className={`${styles.playButton} ${playing ? styles.playing : ""}`}>
            <PlayButton />
          </div>
          {hasWindow && (
            <ReactPlayer
              playing={playing}
              url={url}
              width="100%"
              height="100%"
              muted={isMuted}
              config={{
                file: { attributes: { poster: "/video-poster.jpg" } },
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default VideoTeaser;
