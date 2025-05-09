"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import styles from "./styles.module.scss";
import Mute from "../../assets/svg/mute.svg";
import Muted from "../../assets/svg/muted.svg";
import PlayButton from "../../assets/svg/play-button.svg";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import Logo from "../../assets/svg/footer-logo.svg";

function VideoTeaser({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);
  const { scrollY } = useScroll();
  const [path, setPath] = useState(
    `polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)`
  );

  const progress = useTransform(scrollY, [100, 300], [0, 1]);

  const lerp = (a: number, b: number, t: number) => {
    return a + (b - a) * t;
  };

  useMotionValueEvent(scrollY, "change", () => {
    setPath(
      `polygon(
      ${lerp(50, 0, progress.get())}% 
      ${lerp(50, 0, progress.get())}%, 
      ${lerp(50, 100, progress.get())}% 
      ${lerp(50, 0, progress.get())}%, 
      ${lerp(50, 100, progress.get())}% 
      ${lerp(50, 100, progress.get())}%, 
      ${lerp(50, 0, progress.get())}% 
      ${lerp(50, 100, progress.get())}%)`
    );

    if (progress.get() >= 1) {
      setIsAnimated(true);
    } else {
      setIsAnimated(false);
    }
  });

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
    <>
      <div style={{ height: "1000px" }}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
        <motion.div
          // eslint-disable-next-line no-extra-boolean-cast
          className={`${styles.wrapper} ${!!url ? styles.playCursor : ""} ${
            playing ? styles.playing : ""
          }`}
          style={{
            clipPath: path,
          }}
        >
          {/* <Mask isAnimated={isAnimated} setIsAnimated={setIsAnimated} /> */}

          <button
            className={styles.btnMute}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <Muted /> : <Mute />}
          </button>
          <div className={styles.video} onClick={handleClick}>
            <div
              className={`${styles.playButton} ${
                playing ? styles.playing : ""
              } ${isAnimated ? styles.isAnimated : ""}`}
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
                config={{
                  file: { attributes: { poster: "/video-poster.jpg" } },
                }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default VideoTeaser;
