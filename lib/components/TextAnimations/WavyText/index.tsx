"use client";
import { FC } from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
  text: string;
  delay?: number;
  duration?: number;
  alternate?: boolean;
}

const WavyText: FC<Props> = ({
  text,
  delay = 0,
  duration = 0.05,
  alternate = false,
  ...props
}: Props) => {
  const container: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: i * delay },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: alternate ? -15 : 15,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const words = text.split(/([ \n])/);

  return (
    <motion.div
      // style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      {...props}
    >
      {words.map((word, i) => {
        let sign = word;

        if (word === " ") {
          sign = "\u00A0";
        }

        if (word === "\n") {
          return <br key={Math.random()} />;
        }

        if (word.includes("<em>")) {
          return <em key={word + i}>{word.replace(/<[^>]*>/g, "")}</em>;
        }

        return (
          <motion.span
            key={word + i}
            variants={child}
            style={{ display: "inline-block" }}
          >
            {sign}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default WavyText;
