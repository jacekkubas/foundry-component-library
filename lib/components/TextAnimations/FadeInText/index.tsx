"use client";
import { FC } from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
  text: string;
  delay?: number;
  duration?: number;
}

const FadeInText: FC<Props> = ({
  text,
  delay = 0,
  duration = 0.3,
  ...props
}: Props) => {
  const container: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        delay: delay,
        duration: duration,
      }}
      {...props}
    >
      {text}
    </motion.div>
  );
};

export default FadeInText;
