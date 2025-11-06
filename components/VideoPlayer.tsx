'use client';

import { PauseIcon, PlayIcon, VolumeIcon, VolumeOffIcon } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import cn from '@/utils/cn';

interface VideoPlayerProps {
  videoUrl: string;
  className?: string;
  posterUrl?: string;
  autoplayOnScroll?: boolean;
}

export default function VideoPlayer({
  className,
  videoUrl,
  posterUrl,
  autoplayOnScroll = false,
}: VideoPlayerProps) {
  // console.log('videoUrl', videoUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [captions, setCaptions] = useState(true);

  const fmt = (s: number) => {
    if (!Number.isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${sec}`;
  };

  // Update progress
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const update = () => setProgress(v.currentTime);
    v.addEventListener('timeupdate', update);
    return () => v.removeEventListener('timeupdate', update);
  }, []);

  // Autoplay on scroll functionality
  useEffect(() => {
    if (!autoplayOnScroll) return;

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is in viewport, play it
            video.play().catch((error) => {
              console.warn('Autoplay failed:', error);
            });
            setPlaying(true);
          } else {
            // Video is out of viewport, pause it
            video.pause();
            setPlaying(false);
          }
        });
      },
      {
        threshold: 0.5, // Play when 50% of the video is visible
        rootMargin: '0px 0px -10% 0px', // Start playing slightly before fully in view
      },
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, [autoplayOnScroll]);

  if (!videoUrl) return null;

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const time = parseFloat(e.target.value);
    v.currentTime = time;
    setProgress(time);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const vol = parseFloat(e.target.value);
    v.volume = vol;
    setVolume(vol);
    setMuted(vol === 0);
  };

  const toggleCaptions = () => {
    const v = videoRef.current;
    if (!v) return;
    for (const track of v.textTracks) {
      track.mode = captions ? 'disabled' : 'showing';
    }
    setCaptions(!captions);
  };

  const toggleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!document.fullscreenElement) {
      v.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      className={cn(
        'VideoPlayer',
        'rounded-[16px]',
        'overflow-hidden',
        'mx-auto',
        'bg-black',
        'shadow-xl',
        'flex flex-col',
        '[&_button]:cursor-pointer',
        'h-auto lg:h-full',
        'group',
        'relative',
        className,
      )}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        className={cn('h-auto w-full', 'grow object-cover md:object-contain')}
        preload="auto"
        poster={posterUrl || ''}
        muted
        loop
        playsInline
        onLoadedMetadata={(e) =>
          setDuration((e.target as HTMLVideoElement).duration)
        }
      >
        <source src={videoUrl} type="video/mp4" />
        <track
          kind="captions"
          // src={null}
          srcLang="en"
          label="English"
          default
        />
        Your browser does not support HTML5 video.
      </video>

      {/* CONTROLS */}
      <div
        className={cn(
          'Controls',
          '!absolute',
          'right-0 bottom-0 left-0',
          'flex',
          'items-center gap-[10px]',
          'bg-gradient-to-t from-black/70 to-black/30',
          'text-sm text-white',
          'px-[10px] py-[5px] md:px-[30px] md:py-[12px]',
          'sr-only',
          'group-hover:not-sr-only',
        )}
      >
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className="rounded bg-white/10 px-2 py-1 hover:bg-white/20"
          type="button"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* Progress */}
        <div className={cn('flex items-center', 'gap-2', 'grow', 'shrink')}>
          <span>{fmt(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={progress}
            onChange={handleSeek}
            className="grow accent-white"
          />
          <span>{fmt(duration)}</span>
        </div>

        {/* Volume */}
        <div className="hidden items-center gap-[10px] md:flex">
          <button
            onClick={toggleMute}
            className="rounded bg-white/10 px-2 py-1 hover:bg-white/20"
            type="button"
          >
            {muted || volume === 0 ? <VolumeOffIcon /> : <VolumeIcon />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={handleVolume}
            className="w-24 accent-white"
          />
        </div>

        {/* Captions */}
        <button
          onClick={toggleCaptions}
          className={cn(
            'rounded',
            'h-[30px] w-[30px]',
            'hidden items-center justify-center md:flex',
            captions ? 'bg-white/20' : 'bg-white/10',
            'hover:bg-white/30',
          )}
          type="button"
        >
          <span className="mt-[2px] leading-none">CC</span>
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className={cn(
            'rounded bg-white/10 px-2 py-1 hover:bg-white/20',
            'h-[30px] w-[30px]',
            'flex items-center justify-center',
          )}
          type="button"
        >
          <span className="mt-[2px] leading-none">⛶</span>
        </button>
      </div>
    </div>
  );
}
