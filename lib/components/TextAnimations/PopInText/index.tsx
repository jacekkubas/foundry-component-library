import { FC } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
  text: string;
  delay?: number;
  duration?: number;
}

const PopInText: FC<Props> = ({
  text,
  delay = 0,
  duration = 0.3,
  ...props
}: Props) => {
  return (
    <div>
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: duration, delay: delay }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        {...props}
        style={{ display: "inline-block" }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default PopInText;
