"use client";
import { useState, useEffect, useRef } from "react";
import Menu from "./Menu";
import styles from "./styles.module.scss";
import Container from "../Container";
import { NextLink } from "../../types";
import lottie from "lottie-web";
import logo from "../../assets/logo.json";

function Header({
  translations,
  isCasePage,
  Link,
}: {
  translations?: {
    language: {
      code: string;
    };
    slug: string;
  }[];
  isCasePage?: boolean;
  Link: NextLink;
}) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isOpen = isMenuOpen ? styles.isMenuOpen : "";

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: logo,
    });

    return () => {
      animation.destroy();
    };
  }, [logo]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", onScroll, { once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen, setMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <Container>
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <Link href="/">
                <div ref={containerRef} className={styles.logo} />
              </Link>
            </div>
            <div className={styles.right}>
              <button
                className={`${styles.menuBtn} ${
                  isMenuOpen ? styles.isMenuOpen : ""
                }`}
                onClick={() => {
                  setMenuOpen(!isMenuOpen);
                }}
                aria-label="Toggle menu">
                Menu
                <div className={styles.hamburger}>
                  <span className={styles.line}></span>
                  <span className={styles.line}></span>
                  <span className={styles.line}></span>
                </div>
              </button>
            </div>
          </div>
        </Container>
      </header>
      <Menu
        isOpen={isOpen}
        setMenuOpen={setMenuOpen}
        Link={Link}
        translationsCode={
          translations?.length
            ? translations[0].language?.code?.toLowerCase()
            : ""
        }
        translationsSlug={translations?.length ? translations[0].slug : ""}
        isCasePage={isCasePage || false}
      />
    </>
  );
}

export default Header;
