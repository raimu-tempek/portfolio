'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

/**
 * @param {{
 *   text?: string;
 *   delay?: number;
 *   className?: string;
 *   animateBy?: string;
 *   direction?: string;
 *   threshold?: number;
 *   rootMargin?: string;
 *   animationFrom?: any;
 *   animationTo?: any;
 *   easing?: (t: number) => number;
 *   onAnimationComplete?: () => void;
 *   stepDuration?: number;
 *   start?: boolean;
 * }} props
 */
const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom = undefined,
  animationTo = undefined,
  easing = t => t,
  onAnimationComplete = () => {},
  stepDuration = 0.35,
  start = true
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  const shouldAnimate = inView && start;

  // Custom token handling for hero section to preserve inline photos and secondary text styles
  const isHeroTitle =
    text === "Hi, I'm Muhammad Faishal Syarif" ||
    text === "Hi, I'm Muhammad Faishal Syarif!";
  const isHeroLocation = text === "based in Surabaya, Indonesia";

  // Build items list
  const items = useMemo(() => {
    if (isHeroTitle && animateBy === 'words') {
      return [
        { type: 'word', content: 'Hi,', colorClass: 'text-textSecondary' },
        { type: 'word', content: "I'm", colorClass: 'text-textSecondary' },
        {
          type: 'element',
          key: 'photo-muka-asli',
          node: (
            <img
              src="/assets/muka-asli.png"
              alt="Muhammad Faishal Syarif"
              className="hero-photo-muka-asli"
            />
          )
        },
        { type: 'word', content: 'Muhammad', colorClass: 'text-textPrimary' },
        { type: 'word', content: 'Faishal', colorClass: 'text-textPrimary' },
        {
          type: 'word',
          content: text.endsWith('!') ? 'Syarif!' : 'Syarif',
          colorClass: 'text-textPrimary'
        }
      ];
    }

    if (isHeroLocation && animateBy === 'words') {
      return [
        { type: 'word', content: 'based', colorClass: 'text-textSecondary' },
        { type: 'word', content: 'in', colorClass: 'text-textSecondary' },
        { type: 'word', content: 'Surabaya,', colorClass: 'text-textPrimary' },
        {
          type: 'element',
          key: 'photo-surabaya',
          node: (
            <img
              src="/assets/surabaya.png"
              alt="Surabaya"
              className="hero-photo-surabaya"
            />
          )
        },
        { type: 'word', content: 'Indonesia', colorClass: 'text-textPrimary' }
      ];
    }

    const rawElements = animateBy === 'words' ? text.split(' ') : text.split('');
    return rawElements.map((seg, idx) => ({
      type: 'word',
      content: seg,
      colorClass: ''
    }));
  }, [text, animateBy, isHeroTitle, isHeroLocation]);

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {items.map((item, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        if (item.type === 'element') {
          return (
            <motion.span
              className="inline-block mx-1.5 align-middle will-change-[transform,filter,opacity]"
              key={item.key || index}
              initial={fromSnapshot}
              animate={shouldAnimate ? animateKeyframes : fromSnapshot}
              transition={shouldAnimate ? spanTransition : { duration: 0 }}
            >
              {item.node}
            </motion.span>
          );
        }

        return (
          <motion.span
            className={`inline-block will-change-[transform,filter,opacity] ${item.colorClass || ''}`}
            key={index}
            initial={fromSnapshot}
            animate={shouldAnimate ? animateKeyframes : fromSnapshot}
            transition={shouldAnimate ? spanTransition : { duration: 0 }}
            onAnimationComplete={
              index === items.length - 1 && shouldAnimate
                ? () => {
                    if (onAnimationComplete) {
                      onAnimationComplete();
                    }
                  }
                : undefined
            }
          >
            {item.content === ' ' ? '\u00A0' : item.content}
            {animateBy === 'words' && index < items.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
