"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const textSequence: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.14,
    },
  },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.16]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate mb-12 min-h-[300px] overflow-hidden rounded-xl bg-[#18372f] sm:aspect-3/1 sm:min-h-0"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-8%]"
        style={prefersReducedMotion ? undefined : { y: imageY, scale: imageScale }}
      >
        <Image
          src="/header.jpeg"
          alt=""
          fill
          priority
          sizes="(max-width: 1320px) 100vw, 1320px"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#102b25]/90 via-[#102b25]/55 to-transparent" />
      <motion.div
        className="relative flex min-h-[300px] max-w-xl flex-col items-start justify-center gap-4 px-6 py-10 text-white sm:min-h-0 sm:h-full sm:px-12"
        variants={textSequence}
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
      >
        <motion.p
          variants={textItem}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd6a9]"
        >
          Made fresh, made for you
        </motion.p>
        <motion.h1
          variants={textItem}
          className="max-w-lg text-3xl font-semibold leading-tight sm:text-5xl"
        >
          The good stuff is just a few clicks away.
        </motion.h1>
        <motion.p
          variants={textItem}
          className="max-w-md text-sm leading-6 text-white/85 sm:text-base"
        >
          Find your next favorite, choose your portion, and we’ll get cooking.
        </motion.p>
        <motion.div variants={textItem} className="mt-2">
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center rounded-md bg-[#ed9b52] px-5 text-sm font-semibold text-[#192a26] transition-colors hover:bg-[#f5b276]"
          >
            Explore the menu
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
