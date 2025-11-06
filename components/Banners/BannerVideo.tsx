'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type TComponentProps = {
  className?: string;
  autoplayOnScroll?: boolean;
  autoPlay?: boolean;
  animationDuration?: number;
  animationDelay?: number; // Delay in milliseconds before animation starts
  title?: string;
  videoUrl?: string;
};

const BannerVideo = ({
  className,
  autoPlay = true,
  autoplayOnScroll = false,
  animationDuration = 2000,
  animationDelay = 200,
  title = '',
  videoUrl,
}: TComponentProps) => {
  const demoVideoUrl =
    videoUrl ||
    'https://dream-explorer-storage.s3.eu-north-1.amazonaws.com/image-gen-api/bulk-2c9fe8f3-9630-472d-b8d8-9f9dbfb01df1/combination_1/generated_video.mp4';
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const hasStartedPlayingRef = useRef(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const TRIGGER_DISTANCE_PERCENTAGE = 0.8; // % of container height

  // Viewport-triggered animation and video play (default behavior)
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || autoplayOnScroll) return;

    const checkBottomInViewport = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const triggerDistance = rect.height * TRIGGER_DISTANCE_PERCENTAGE;
      const isNearBottom =
        rect.bottom <= viewportHeight + triggerDistance &&
        rect.bottom > -triggerDistance;

      // Start animation and video when we're within trigger distance of bottom
      if (isNearBottom && !hasStartedPlayingRef.current) {
        hasStartedPlayingRef.current = true;

        // Start animation after delay
        setTimeout(() => {
          setIsAnimating(false);
          video.play().catch((error) => {
            console.warn('Video autoplay failed:', error);
          });
        }, animationDelay);
      }
    };

    const handleScroll = () => {
      checkBottomInViewport();
    };

    // Check immediately in case container is already in view
    checkBottomInViewport();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animationDelay, autoplayOnScroll]);

  // Advanced scroll-triggered animation (when autoplayOnScroll is true)
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || !autoplayOnScroll) return;

    const checkBottomLine = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if we're XXX% of container height away from the bottom of container
      const triggerDistance = rect.height * TRIGGER_DISTANCE_PERCENTAGE;
      const isNearBottom =
        rect.bottom <= viewportHeight + triggerDistance &&
        rect.bottom > -triggerDistance;

      // We're near bottom and we haven't animated yet - open peephole with delay
      if (isNearBottom && !hasAnimatedRef.current) {
        // console.log('Opening peephole animation - bottom line in view');
        hasAnimatedRef.current = true;
        if (animationDelay > 0) {
          setTimeout(() => {
            setIsAnimating(false);
            video.play().catch((error) => {
              console.warn('Autoplay failed:', error);
            });
          }, animationDelay);
        } else {
          setIsAnimating(false);
          video.play().catch((error) => {
            console.warn('Autoplay failed:', error);
          });
        }
      } else if (!isNearBottom) {
        // We're not near bottom anymore - reset animation
        // console.log('Closing peephole animation - scrolled out of view');
        hasAnimatedRef.current = false;
        setIsAnimating(true);
        // video.pause();
      }
    };

    const handleScroll = () => {
      checkBottomLine();
    };

    checkBottomLine();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animationDelay, autoplayOnScroll]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'BannerVideo',
        'relative',
        'h-[100vh]',
        'overflow-hidden',
        'bg-white',
        // 'min-h-[50vh]',
        className,
      )}
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.8 }}
          className={cn(
            '-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2',
            'absolute z-[10]',
            'font-extrabold',
            'tracking-[10px]',
            'uppercase',
            'text-[25px] lg:text-[150px]',
            // 'text-[#7d7d7f]'
            'text-white',
          )}
        >
          {title}
        </motion.h2>
      )}
      <video
        ref={videoRef}
        src={demoVideoUrl}
        className="h-full w-full object-cover"
        muted
        loop
        autoPlay={autoPlay}
        playsInline
        width="100%"
        height="100%"
        style={{
          clipPath: isAnimating
            ? 'ellipse(10% 15% at 50% 90%)'
            : 'ellipse(150% 150% at 50% 50%)',
          transition: `clip-path ${animationDuration}ms ease-out`,
        }}
      />
    </div>
  );
};

export default BannerVideo;
