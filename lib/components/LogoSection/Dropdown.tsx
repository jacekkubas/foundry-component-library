"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.scss";
import CaretDown from "../../assets/svg/caret-down.svg";
import useClickOutside from "../../hooks/useClickOutside";

const Dropdown = ({
  heading,
  items,
  selected,
  setSelected,
}: {
  heading: string;
  items?: string[];
  selected: {
    category: string;
    tag: string;
  };
  setSelected: Dispatch<
    SetStateAction<{
      category: string;
      tag: string;
    }>
  >;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (!items) return;

  return (
    <div
      className={`${styles.dropdown} ${isOpen ? styles.active : ""}`}
      ref={ref}
    >
      <button
        onClick={toggleOpen}
        className={`${styles.dropdownHeading} ${isOpen ? styles.active : ""}`}
      >
        <span>{items.includes(selected.tag) ? selected.tag : heading}</span>
        <CaretDown />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={styles.dropdownInner}
          >
            {items.map((option) => (
              <motion.li
                key={option}
                onClick={() => {
                  setSelected({
                    category: heading.toLocaleLowerCase(),
                    tag: option,
                  });
                  setIsOpen(false);
                }}
                className={`${styles.option} ${
                  selected.tag === option ? styles.active : ""
                }`}
              >
                {option}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
