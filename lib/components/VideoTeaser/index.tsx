"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import Mute from "../../assets/svg/mute.svg";
import Muted from "../../assets/svg/muted.svg";
import PlayButton from "../../assets/svg/play-button.svg";
import Logo from "../../assets/svg/footer-logo.svg";

function VideoTeaser({ url }: { url: string }) {
  const [playing, setPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.setAttribute("fetchpriority", "high");
  }, []);

  const handleClick = () => {
    if (playing) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setPlaying(!playing);
  };

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
        <button
          className={styles.btnMute}
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? "Unmute video" : "Mute video"}>
          {isMuted ? <Muted /> : <Mute />}
        </button>
        <div className={styles.video} onClick={handleClick}>
          <div
            className={`${styles.playButton} ${playing ? styles.playing : ""}`}>
            <PlayButton />
          </div>
          <video
            ref={videoRef}
            src={url}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </>
  );
}

export default VideoTeaser;
