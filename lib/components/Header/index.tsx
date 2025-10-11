"use client";
import { useState } from "react";
import Menu from "./Menu";
import styles from "./styles.module.scss";
import Container from "../Container";
import { NextLink } from "../../types";

function Header({ Link }: { Link: NextLink }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isOpen = isMenuOpen ? styles.isMenuOpen : "";

  return (
    <>
      <header className={styles.header}>
        <Container>
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <Link href="/">
                <video
                  src="/logo.mp4"
                  autoPlay
                  muted
                  playsInline
                  {...{ "webkit-playsinline": "true" }}
                />
                Foundry
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
      <Menu isOpen={isOpen} setMenuOpen={setMenuOpen} Link={Link} />
    </>
  );
}

export default Header;
