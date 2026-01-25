"use client";
import { motion, Variants } from "framer-motion";

const FADE_IN_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const AnimatedItem = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    variants={FADE_IN_VARIANTS}
    initial="hidden"
    animate="visible"
    transition={{ delay }}
    className="w-full"
  >
    {children}
  </motion.div>
);
